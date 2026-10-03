import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Anthropic from '@anthropic-ai/sdk';

// ── Schemas (inline to avoid ESM/CJS boundary issues) ────────────────────────
const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    full_name: { type: String, default: '' },
    role: { type: String, enum: ['admin', 'doctor', 'patient'], default: 'patient' },
    city: { type: String, default: '' },
  },
  { timestamps: true }
);

const ChildSchema = new mongoose.Schema(
  {
    parent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    date_of_birth: { type: String, default: null },
    avatar_emoji: { type: String, default: '🧒' },
  },
  { timestamps: true }
);

const DentistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialty: { type: String, default: 'Pediatric Dentist' },
    clinic_name: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, default: '' },
    bio: { type: String, default: '' },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    num_reviews: { type: Number, default: 0 },
    self_registered: { type: Boolean, default: false }, // true only for dentists created via the website doctor signup

    experience_years: { type: Number, default: 5 },
    consultation_fee: { type: Number, default: 500 },
    available_today: { type: Boolean, default: false },
    phone: { type: String, default: '' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true }
);

const AppointmentSchema = new mongoose.Schema(
  {
    parent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    child_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Child', required: true },
    dentist_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Dentist', required: true },
    appointment_date: { type: String, required: true },
    appointment_time: { type: String, required: true },
    reason: { type: String, default: '' },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' },
    is_emergency: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const TipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    emoji: { type: String, default: '🦷' },
    category: { type: String, default: 'General' },
  },
  { timestamps: true }
);

const ReviewSchema = new mongoose.Schema(
  {
    dentist_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Dentist', required: true },
    parent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, default: '', trim: true },
  },
  { timestamps: true }
);
// One review per patient per dentist (re-submitting updates it).
ReviewSchema.index({ dentist_id: 1, parent_id: 1 }, { unique: true });

// ── Models ───────────────────────────────────────────────────────────────────
const User = (mongoose.models['User'] as mongoose.Model<any>) || mongoose.model('User', UserSchema);
const Child = (mongoose.models['Child'] as mongoose.Model<any>) || mongoose.model('Child', ChildSchema);
const Dentist = (mongoose.models['Dentist'] as mongoose.Model<any>) || mongoose.model('Dentist', DentistSchema);
const Appointment = (mongoose.models['Appointment'] as mongoose.Model<any>) || mongoose.model('Appointment', AppointmentSchema);
const Tip = (mongoose.models['Tip'] as mongoose.Model<any>) || mongoose.model('Tip', TipSchema);
const Review = (mongoose.models['Review'] as mongoose.Model<any>) || mongoose.model('Review', ReviewSchema);

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret-change-me';
const PORT = process.env.API_PORT ?? 3001;

// ── DB connection ────────────────────────────────────────────────────────────
async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌  MONGODB_URI is not set in .env');
    process.exit(1);
  }
  await mongoose.connect(uri);
  console.log('✅  MongoDB connected');
}

// ── Auth helpers ─────────────────────────────────────────────────────────────
function signToken(userId: string, email: string, role: string) {
  return jwt.sign({ userId, email, role }, JWT_SECRET, { expiresIn: '30d' });
}

function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) { res.status(401).json({ error: 'Unauthorized' }); return; }
    const payload = jwt.verify(header.slice(7), JWT_SECRET) as { userId: string; email: string; role: string };
    (req as any).userId = payload.userId;
    (req as any).userEmail = payload.email;
    (req as any).userRole = payload.role ?? 'patient';
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

function requireRole(...roles: string[]) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!roles.includes((req as any).userRole)) {
      res.status(403).json({ error: 'Forbidden' }); return;
    }
    next();
  };
}

// ── App setup ────────────────────────────────────────────────────────────────
const app = express();
app.use(cors());
app.use(express.json());

// ── AUTH ─────────────────────────────────────────────────────────────────────
app.post('/api/auth/register', async (req, res) => {
  const { email, password, full_name, role: rawRole, clinic_name, city, specialty } = req.body ?? {};
  if (!email || !password) { res.status(400).json({ error: 'Email and password are required' }); return; }
  if (password.length < 6) { res.status(400).json({ error: 'Password must be at least 6 characters' }); return; }

  // Only patient or doctor may self-register; anything else (e.g. admin) falls back to patient.
  const role = rawRole === 'doctor' ? 'doctor' : 'patient';

  // Doctors need a clinic + city so a Dentist profile can be created and the dashboard works.
  if (role === 'doctor') {
    if (!clinic_name?.trim()) { res.status(400).json({ error: 'Clinic name is required for doctor accounts' }); return; }
    if (!city?.trim()) { res.status(400).json({ error: 'City is required for doctor accounts' }); return; }
  }

  try {
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) { res.status(400).json({ error: 'Email already in use' }); return; }
    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({
      email: email.toLowerCase(),
      password: hashed,
      full_name: full_name ?? '',
      role,
      city: role === 'doctor' ? city.trim() : '',
    });

    // Create the linked Dentist profile so the doctor dashboard has data to load.
    if (role === 'doctor') {
      await Dentist.create({
        name: (full_name ?? '').trim() || 'Doctor',
        clinic_name: clinic_name.trim(),
        city: city.trim(),
        specialty: specialty?.trim() || 'Pediatric Dentist',
        rating: null, // new dentists have no rating yet — shown as "New" rather than a fabricated score
        self_registered: true,
        user_id: user._id,
      });
    }

    const token = signToken(user._id.toString(), user.email, user.role);
    res.status(201).json({ token, user: { id: user._id.toString(), email: user.email, full_name: user.full_name, role: user.role, city: user.city ?? '' } });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) { res.status(400).json({ error: 'Email and password are required' }); return; }
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) { res.status(401).json({ error: 'Invalid email or password' }); return; }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) { res.status(401).json({ error: 'Invalid email or password' }); return; }
    const token = signToken(user._id.toString(), user.email, user.role);
    res.json({ token, user: { id: user._id.toString(), email: user.email, full_name: user.full_name, role: user.role, city: user.city ?? '' } });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/auth/me', requireAuth, async (req, res) => {
  try {
    const user = await User.findById((req as any).userId).select('-password');
    if (!user) { res.status(404).json({ error: 'User not found' }); return; }
    res.json({ id: user._id.toString(), email: user.email, full_name: user.full_name, role: user.role, city: user.city ?? '' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/auth/me', requireAuth, async (req, res) => {
  try {
    const { city } = req.body ?? {};
    const user = await User.findByIdAndUpdate(
      (req as any).userId,
      { city: (city ?? '').trim() },
      { new: true }
    ).select('-password');
    if (!user) { res.status(404).json({ error: 'User not found' }); return; }
    res.json({ id: user._id.toString(), email: user.email, full_name: user.full_name, role: user.role, city: user.city ?? '' });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// ── CHILDREN ──────────────────────────────────────────────────────────────────
app.get('/api/children', requireAuth, async (req, res) => {
  try {
    const children = await Child.find({ parent_id: (req as any).userId }).sort({ createdAt: 1 });
    res.json(children.map((c: any) => ({
      id: c._id.toString(), parent_id: c.parent_id.toString(),
      name: c.name, date_of_birth: c.date_of_birth,
      avatar_emoji: c.avatar_emoji, created_at: c.createdAt,
    })));
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.post('/api/children', requireAuth, async (req, res) => {
  const { name, date_of_birth, avatar_emoji } = req.body ?? {};
  if (!name?.trim()) { res.status(400).json({ error: 'Name is required' }); return; }
  try {
    const child = await Child.create({
      parent_id: (req as any).userId,
      name: name.trim(),
      date_of_birth: date_of_birth || null,
      avatar_emoji: avatar_emoji || '🧒',
    });
    res.status(201).json({
      id: child._id.toString(), parent_id: child.parent_id.toString(),
      name: child.name, date_of_birth: child.date_of_birth,
      avatar_emoji: child.avatar_emoji, created_at: child.createdAt,
    });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/children/:id', requireAuth, async (req, res) => {
  try {
    await Child.findOneAndDelete({ _id: req.params.id, parent_id: (req as any).userId });
    res.json({ success: true });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// ── DENTISTS ──────────────────────────────────────────────────────────────────
function fmtDentist(d: any) {
  return {
    id: d._id.toString(), name: d.name, specialty: d.specialty,
    clinic_name: d.clinic_name, city: d.city, address: d.address,
    bio: d.bio, rating: d.rating, num_reviews: d.num_reviews ?? 0, experience_years: d.experience_years,
    consultation_fee: d.consultation_fee, available_today: d.available_today,
    phone: d.phone, user_id: d.user_id?.toString() ?? null,
  };
}

app.get('/api/dentists', async (req, res) => {
  try {
    const { city } = req.query;
    // Only surface dentists who signed up through the website — bookings must reach a real doctor.
    const filter: any = { self_registered: true };
    if (city && typeof city === 'string' && city.trim()) {
      filter.city = { $regex: new RegExp(city.trim(), 'i') };
    }
    const dentists = await Dentist.find(filter).sort({ rating: -1 });
    res.json(dentists.map(fmtDentist));
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.get('/api/dentists/cities', async (_req, res) => {
  try {
    const raw: string[] = await Dentist.distinct('city', { self_registered: true });
    // Normalise to title-case and deduplicate
    const seen = new Set<string>();
    const cities = raw
      .map(c => c.trim().replace(/\b\w/g, l => l.toUpperCase()))
      .filter(c => { if (seen.has(c.toLowerCase())) return false; seen.add(c.toLowerCase()); return true; })
      .sort();
    res.json(cities);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.get('/api/dentists/:id', async (req, res) => {
  try {
    const d = await Dentist.findById(req.params.id);
    if (!d) { res.status(404).json({ error: 'Dentist not found' }); return; }
    res.json(fmtDentist(d));
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// ── APPOINTMENTS ──────────────────────────────────────────────────────────────
function fmtAppt(a: any) {
  const child = a.child_id as any;
  const dentist = a.dentist_id as any;
  return {
    id: a._id.toString(),
    parent_id: a.parent_id?.toString(),
    child_id: child?._id?.toString() ?? a.child_id?.toString(),
    dentist_id: dentist?._id?.toString() ?? a.dentist_id?.toString(),
    appointment_date: a.appointment_date,
    appointment_time: a.appointment_time,
    reason: a.reason,
    status: a.status,
    is_emergency: a.is_emergency ?? false,
    created_at: a.createdAt,
    children: child?._id ? { name: child.name, avatar_emoji: child.avatar_emoji } : null,
    dentists: dentist?._id ? { name: dentist.name, clinic_name: dentist.clinic_name, city: dentist.city } : null,
  };
}

app.get('/api/dentists/:id/booked-slots', async (req, res) => {
  try {
    const { date } = req.query;
    if (!date || typeof date !== 'string') {
      res.status(400).json({ error: 'date query parameter is required' }); return;
    }
    const appts = await Appointment.find({
      dentist_id: req.params.id,
      appointment_date: date,
      status: { $ne: 'cancelled' },
    });
    res.json(appts.map((a: any) => a.appointment_time));
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// ── REVIEWS / RATINGS ─────────────────────────────────────────────────────────
// Recompute a dentist's average rating + review count from its reviews.
async function recomputeDentistRating(dentistId: string) {
  const agg = await Review.aggregate([
    { $match: { dentist_id: new mongoose.Types.ObjectId(dentistId) } },
    { $group: { _id: '$dentist_id', avg: { $avg: '$rating' }, count: { $sum: 1 } } },
  ]);
  const avg = agg[0]?.avg ?? null;
  const count = agg[0]?.count ?? 0;
  await Dentist.findByIdAndUpdate(dentistId, {
    rating: avg != null ? Math.round(avg * 10) / 10 : null,
    num_reviews: count,
  });
}

// Public list of a dentist's reviews (newest first).
app.get('/api/dentists/:id/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({ dentist_id: req.params.id })
      .populate('parent_id', 'full_name email')
      .sort({ createdAt: -1 });
    res.json(reviews.map((r: any) => ({
      id: r._id.toString(),
      parent_id: (r.parent_id?._id ?? r.parent_id)?.toString() ?? null,
      reviewer_name: r.parent_id?.full_name || r.parent_id?.email || 'Parent',
      rating: r.rating,
      comment: r.comment,
      created_at: r.createdAt,
    })));
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// A patient submits (or updates) their rating for a dentist they've visited.
app.post('/api/dentists/:id/reviews', requireAuth, requireRole('patient'), async (req, res) => {
  const dentistId = req.params.id;
  const { rating, comment } = req.body ?? {};
  const num = Number(rating);
  if (!Number.isInteger(num) || num < 1 || num > 5) {
    res.status(400).json({ error: 'Rating must be a whole number from 1 to 5' }); return;
  }
  try {
    const dentist = await Dentist.findById(dentistId);
    if (!dentist) { res.status(404).json({ error: 'Dentist not found' }); return; }

    // You can only rate a dentist you've actually had a completed visit with.
    const visited = await Appointment.findOne({
      parent_id: (req as any).userId,
      dentist_id: dentistId,
      status: 'completed',
    });
    if (!visited) {
      res.status(403).json({ error: 'You can review a dentist only after a completed visit.' }); return;
    }

    const review = await Review.findOneAndUpdate(
      { dentist_id: dentistId, parent_id: (req as any).userId },
      { rating: num, comment: (comment ?? '').toString().trim() },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    await recomputeDentistRating(dentistId);
    const updated = await Dentist.findById(dentistId);

    res.status(201).json({
      review: { id: review._id.toString(), rating: review.rating, comment: review.comment },
      rating: updated?.rating ?? null,
      num_reviews: updated?.num_reviews ?? 0,
    });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// Whether the current patient is allowed to review this dentist (has a completed visit).
app.get('/api/dentists/:id/can-review', requireAuth, async (req, res) => {
  try {
    if ((req as any).userRole !== 'patient') { res.json({ can_review: false }); return; }
    const visited = await Appointment.findOne({
      parent_id: (req as any).userId,
      dentist_id: req.params.id,
      status: 'completed',
    });
    res.json({ can_review: !!visited });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.get('/api/appointments', requireAuth, async (req, res) => {
  try {
    const appts = await Appointment.find({ parent_id: (req as any).userId })
      .populate('child_id', 'name avatar_emoji')
      .populate('dentist_id', 'name clinic_name city')
      .sort({ appointment_date: -1 });
    res.json(appts.map(fmtAppt));
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.post('/api/appointments', requireAuth, async (req, res) => {
  const { child_id, dentist_id, appointment_date, appointment_time, reason, is_emergency } = req.body ?? {};
  if (!child_id || !dentist_id || !appointment_date || !appointment_time) {
    res.status(400).json({ error: 'child_id, dentist_id, appointment_date and appointment_time are required' }); return;
  }
  try {
    const existing = await Appointment.findOne({
      dentist_id,
      appointment_date,
      appointment_time,
      status: { $ne: 'cancelled' },
    });
    if (existing) {
      res.status(400).json({ error: 'This time slot is already booked for this dentist. Please choose a different slot.' });
      return;
    }
    const appt = await (await Appointment.create({
      parent_id: (req as any).userId, child_id, dentist_id,
      appointment_date, appointment_time, reason: reason ?? '',
      status: 'pending', is_emergency: !!is_emergency,
    })).populate(['child_id', 'dentist_id']);
    res.status(201).json(fmtAppt(appt));
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.patch('/api/appointments/:id', requireAuth, async (req, res) => {
  try {
    const appt = await Appointment.findOneAndUpdate(
      { _id: req.params.id, parent_id: (req as any).userId },
      { status: req.body.status },
      { new: true }
    );
    if (!appt) { res.status(404).json({ error: 'Appointment not found' }); return; }
    res.json({ id: appt._id.toString(), status: appt.status });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// ── ADMIN ─────────────────────────────────────────────────────────────────────
app.get('/api/admin/doctors', requireAuth, requireRole('admin'), async (_req, res) => {
  try {
    const dentists = await Dentist.find().sort({ createdAt: -1 });
    res.json(dentists.map(fmtDentist));
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.post('/api/admin/doctors', requireAuth, requireRole('admin'), async (req, res) => {
  const { name, specialty, clinic_name, city, address, bio, rating, experience_years, consultation_fee, available_today, phone, login_email, login_password } = req.body ?? {};
  if (!name?.trim() || !clinic_name?.trim() || !city?.trim()) {
    res.status(400).json({ error: 'name, clinic_name, and city are required' }); return;
  }
  if (!login_email?.trim() || !login_password?.trim()) {
    res.status(400).json({ error: 'Doctor login email and password are required' }); return;
  }
  if (login_password.length < 6) {
    res.status(400).json({ error: 'Password must be at least 6 characters' }); return;
  }
  try {
    const existing = await User.findOne({ email: login_email.trim().toLowerCase() });
    if (existing) { res.status(400).json({ error: 'A user with this email already exists' }); return; }
    const hashed = await bcrypt.hash(login_password, 12);
    const doctorUser = await User.create({ email: login_email.trim().toLowerCase(), password: hashed, full_name: name.trim(), role: 'doctor' });
    const dentist = await Dentist.create({
      name: name.trim(), specialty: specialty || 'Pediatric Dentist',
      clinic_name: clinic_name.trim(), city: city.trim(),
      address: address || '', bio: bio || '',
      rating: rating ?? 4.5, experience_years: experience_years ?? 5,
      consultation_fee: consultation_fee ?? 500,
      available_today: available_today ?? false,
      phone: phone || '', user_id: doctorUser._id,
    });
    res.status(201).json(fmtDentist(dentist));
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.put('/api/admin/doctors/:id', requireAuth, requireRole('admin'), async (req, res) => {
  const { name, specialty, clinic_name, city, address, bio, rating, experience_years, consultation_fee, available_today, phone, login_password } = req.body ?? {};
  try {
    const update: any = {};
    if (name !== undefined) update.name = name;
    if (specialty !== undefined) update.specialty = specialty;
    if (clinic_name !== undefined) update.clinic_name = clinic_name;
    if (city !== undefined) update.city = city;
    if (address !== undefined) update.address = address;
    if (bio !== undefined) update.bio = bio;
    if (rating !== undefined) update.rating = rating;
    if (experience_years !== undefined) update.experience_years = experience_years;
    if (consultation_fee !== undefined) update.consultation_fee = consultation_fee;
    if (available_today !== undefined) update.available_today = available_today;
    if (phone !== undefined) update.phone = phone;

    const dentist = await Dentist.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!dentist) { res.status(404).json({ error: 'Doctor not found' }); return; }

    // Reset password if provided
    if (login_password?.trim()) {
      if (login_password.length < 6) { res.status(400).json({ error: 'Password must be at least 6 characters' }); return; }
      if (dentist.user_id) {
        const hashed = await bcrypt.hash(login_password, 12);
        await User.findByIdAndUpdate(dentist.user_id, { password: hashed });
      }
    }

    res.json(fmtDentist(dentist));
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/admin/doctors/:id', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const deleted = await Dentist.findByIdAndDelete(req.params.id);
    if (!deleted) { res.status(404).json({ error: 'Doctor not found' }); return; }
    res.json({ success: true });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// ── DOCTOR ────────────────────────────────────────────────────────────────────
app.get('/api/doctor/profile', requireAuth, requireRole('doctor'), async (req, res) => {
  try {
    const dentist = await Dentist.findOne({ user_id: (req as any).userId });
    if (!dentist) { res.status(404).json({ error: 'No dentist profile linked to this account' }); return; }
    res.json(fmtDentist(dentist));
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// Doctor edits their own public clinic listing.
app.patch('/api/doctor/profile', requireAuth, requireRole('doctor'), async (req, res) => {
  try {
    const dentist = await Dentist.findOne({ user_id: (req as any).userId });
    if (!dentist) { res.status(404).json({ error: 'No dentist profile linked to this account' }); return; }

    const b = req.body ?? {};
    const str = (v: any) => (typeof v === 'string' ? v.trim() : undefined);

    // Required fields must stay non-empty if provided.
    const name = str(b.name);
    const clinic_name = str(b.clinic_name);
    const city = str(b.city);
    if (name === '') { res.status(400).json({ error: 'Name cannot be empty' }); return; }
    if (clinic_name === '') { res.status(400).json({ error: 'Clinic name cannot be empty' }); return; }
    if (city === '') { res.status(400).json({ error: 'City cannot be empty' }); return; }

    if (name !== undefined) dentist.name = name;
    if (clinic_name !== undefined) dentist.clinic_name = clinic_name;
    if (city !== undefined) dentist.city = city;
    if (str(b.specialty) !== undefined) dentist.specialty = str(b.specialty) || 'Pediatric Dentist';
    if (b.address !== undefined) dentist.address = str(b.address) ?? '';
    if (b.bio !== undefined) dentist.bio = str(b.bio) ?? '';
    if (b.phone !== undefined) dentist.phone = str(b.phone) ?? '';
    if (b.consultation_fee !== undefined) {
      const fee = Number(b.consultation_fee);
      if (!Number.isFinite(fee) || fee < 0) { res.status(400).json({ error: 'Consultation fee must be a positive number' }); return; }
      dentist.consultation_fee = fee;
    }
    if (b.experience_years !== undefined) {
      const yrs = Number(b.experience_years);
      if (!Number.isFinite(yrs) || yrs < 0) { res.status(400).json({ error: 'Experience must be a positive number' }); return; }
      dentist.experience_years = yrs;
    }
    if (b.available_today !== undefined) dentist.available_today = !!b.available_today;

    await dentist.save();
    res.json(fmtDentist(dentist));
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.get('/api/doctor/appointments', requireAuth, requireRole('doctor'), async (req, res) => {
  try {
    const dentist = await Dentist.findOne({ user_id: (req as any).userId });
    if (!dentist) { res.status(404).json({ error: 'No dentist profile linked to this account' }); return; }
    const appts = await Appointment.find({ dentist_id: dentist._id })
      .populate('child_id', 'name avatar_emoji date_of_birth')
      .populate('parent_id', 'full_name email')
      .sort({ appointment_date: -1 });
    res.json(appts.map((a: any) => {
      const child = a.child_id as any;
      const parent = a.parent_id as any;
      return {
        id: a._id.toString(),
        parent: parent?._id ? { id: parent._id.toString(), full_name: parent.full_name, email: parent.email } : null,
        child: child?._id ? { id: child._id.toString(), name: child.name, avatar_emoji: child.avatar_emoji, date_of_birth: child.date_of_birth } : null,
        appointment_date: a.appointment_date,
        appointment_time: a.appointment_time,
        reason: a.reason,
        status: a.status,
        is_emergency: a.is_emergency ?? false,
        created_at: a.createdAt,
      };
    }));
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.patch('/api/doctor/appointments/:id', requireAuth, requireRole('doctor'), async (req, res) => {
  try {
    const dentist = await Dentist.findOne({ user_id: (req as any).userId });
    if (!dentist) { res.status(404).json({ error: 'No dentist profile linked' }); return; }
    const appt = await Appointment.findOneAndUpdate(
      { _id: req.params.id, dentist_id: dentist._id },
      { status: req.body.status },
      { new: true }
    );
    if (!appt) { res.status(404).json({ error: 'Appointment not found' }); return; }
    res.json({ id: appt._id.toString(), status: appt.status });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// ── PATIENT HISTORY ───────────────────────────────────────────────────────────
app.get('/api/patient/history', requireAuth, async (req, res) => {
  try {
    const appts = await Appointment.find({ parent_id: (req as any).userId })
      .populate('child_id', 'name avatar_emoji')
      .populate('dentist_id', 'name clinic_name city specialty')
      .sort({ appointment_date: -1 });
    res.json(appts.map(fmtAppt));
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// ── TIPS ──────────────────────────────────────────────────────────────────────
app.get('/api/tips', async (_req, res) => {
  try {
    const tips = await Tip.find().sort({ createdAt: 1 });
    res.json(tips.map((t: any) => ({
      id: t._id.toString(), title: t.title, content: t.content,
      emoji: t.emoji, category: t.category, created_at: t.createdAt,
    })));
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// ── CHAT ──────────────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Buddy, a friendly and knowledgeable pediatric dental assistant.
You help parents with questions about their children's oral health.
Keep answers concise, warm, and easy to understand.
Always recommend consulting a qualified dentist for medical decisions.
Focus on pediatric dental topics: brushing, flossing, diet, tooth development, common issues, and dental visits.`;

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body ?? {};
  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: 'messages array is required' }); return;
  }

  const ollamaHost = process.env.OLLAMA_HOST ?? 'http://127.0.0.1:11434';
  const model = process.env.OLLAMA_MODEL ?? 'qwen2.5:0.5b';

  try {
    const response = await fetch(`${ollamaHost}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.map((m: { role: string; content: string }) => ({
            role: m.role === 'user' ? 'user' : 'assistant',
            content: m.content,
          })),
        ],
        stream: false,
      }),
    });

    if (!response.ok) { 
      const errText = await response.text().catch(() => '');
      throw new Error(`Ollama service error (${response.status}): ${errText}`);
    }

    const data = await response.json();
    const reply = data.message?.content ?? 'I am having trouble formulating a response.';
    res.json({ reply });
  } catch (err: any) {
    console.error('Ollama chat error:', err.message);
    res.status(500).json({
      error: `Could not reach Ollama model (${model}). Ensure Ollama is running on ${ollamaHost}. Error: ${err.message}`,
    });
  }
});

// ── SEED ──────────────────────────────────────────────────────────────────────
const DENTISTS = [
  { name: 'Dr. Priya Sharma', specialty: 'Pediatric Dentist', clinic_name: 'SmileCare Kids', city: 'Mumbai', address: '12 Marine Drive, Mumbai', bio: 'Dr. Sharma has 12 years of experience specializing in pediatric dentistry. She creates a fun, comfortable environment for children.', rating: 4.9, experience_years: 12, consultation_fee: 800, available_today: true, phone: '+91-9876543210' },
  { name: 'Dr. Arjun Mehta', specialty: 'Pediatric & Preventive Dentist', clinic_name: 'Happy Teeth Clinic', city: 'Delhi', address: '45 Connaught Place, New Delhi', bio: 'Dr. Mehta focuses on preventive care and early intervention to ensure children maintain healthy smiles for life.', rating: 4.8, experience_years: 10, consultation_fee: 700, available_today: true, phone: '+91-9876543211' },
  { name: 'Dr. Sunita Rao', specialty: 'Pediatric Orthodontist', clinic_name: 'BrightSmile Center', city: 'Bangalore', address: '78 MG Road, Bangalore', bio: 'Dr. Rao specializes in early orthodontic treatment for children, helping guide proper jaw and teeth development.', rating: 4.7, experience_years: 15, consultation_fee: 1000, available_today: false, phone: '+91-9876543212' },
  { name: 'Dr. Kavya Nair', specialty: 'Pediatric Dentist', clinic_name: 'Kids Dental Hub', city: 'Chennai', address: '23 Anna Nagar, Chennai', bio: 'Dr. Nair is passionate about making dental visits enjoyable for children. She uses the latest pain-free techniques.', rating: 4.9, experience_years: 8, consultation_fee: 600, available_today: true, phone: '+91-9876543213' },
  { name: 'Dr. Rahul Gupta', specialty: 'Pediatric & Family Dentist', clinic_name: 'Family Smile Clinic', city: 'Pune', address: '56 FC Road, Pune', bio: 'Dr. Gupta provides comprehensive dental care for the whole family with a special focus on children under 12.', rating: 4.6, experience_years: 9, consultation_fee: 650, available_today: false, phone: '+91-9876543214' },
  { name: 'Dr. Meena Iyer', specialty: 'Pediatric Dentist', clinic_name: 'Little Smiles Dental', city: 'Hyderabad', address: '89 Banjara Hills, Hyderabad', bio: 'Dr. Iyer creates a welcoming, child-friendly atmosphere. She specializes in treating dental anxiety in young patients.', rating: 4.8, experience_years: 11, consultation_fee: 750, available_today: true, phone: '+91-9876543215' },
];

const TIPS = [
  { title: 'Start brushing early', content: "Begin brushing your baby's gums with a soft cloth even before teeth appear. Once teeth erupt, use a tiny smear of fluoride toothpaste.", emoji: '🦷', category: 'Habits' },
  { title: 'Two minutes, twice a day', content: 'Children should brush for at least 2 minutes, twice daily — once in the morning and once before bed. Use a timer or fun song to make it engaging.', emoji: '⏱️', category: 'Habits' },
  { title: 'Limit sugary snacks', content: 'Bacteria in the mouth feed on sugar and produce acids that cause cavities. Limit juice, candy, and sticky snacks — opt for water, cheese, and fresh fruit instead.', emoji: '🍎', category: 'Diet' },
  { title: 'First dental visit by age 1', content: 'The American Academy of Pediatric Dentistry recommends the first dental visit by age 1 or within 6 months of the first tooth appearing.', emoji: '📅', category: 'Visits' },
  { title: 'Floss daily from age 2', content: 'As soon as your child has two teeth that touch, start flossing. Use child-sized flossers to make it easier and fun.', emoji: '🧵', category: 'Habits' },
  { title: 'Fluoride protects teeth', content: 'Fluoride strengthens tooth enamel and prevents cavities. Use a rice-grain amount for children under 3, and a pea-size amount from ages 3–6.', emoji: '💧', category: 'Protection' },
  { title: 'Avoid bottle at bedtime', content: 'Putting a baby to bed with a bottle of milk or juice can cause severe tooth decay. Use water in bedtime bottles instead.', emoji: '🍼', category: 'Habits' },
  { title: 'Wear a mouthguard for sports', content: 'Custom-fitted mouthguards protect teeth during contact sports. They can prevent knocked-out or broken teeth.', emoji: '⚽', category: 'Protection' },
  { title: 'Watch for thumb-sucking', content: 'Thumb-sucking is normal up to age 2–3, but persistent habits after age 4 can affect tooth alignment.', emoji: '👍', category: 'Development' },
  { title: 'Drink plenty of water', content: 'Water is the best drink for teeth. It rinses away food particles and fluoridated tap water strengthens enamel.', emoji: '💧', category: 'Diet' },
  { title: 'Check for early signs', content: "Look for white or brown spots on your child's teeth — early signs of cavities. Catching them early makes treatment much simpler.", emoji: '🔍', category: 'Visits' },
  { title: 'Make brushing fun', content: "Let your child pick their own toothbrush with their favourite character. Play music or brush together to make it an enjoyable routine.", emoji: '🎵', category: 'Habits' },
];

const DEMO_USERS = [
  { email: 'admin@dentibuddy.com',   password: 'admin123',   full_name: 'Admin User',   role: 'admin'   },
  { email: 'doctor@dentibuddy.com',  password: 'doctor123',  full_name: 'Dr. Demo Doctor', role: 'doctor' },
  { email: 'patient@dentibuddy.com', password: 'patient123', full_name: 'Demo Patient', role: 'patient' },
];

app.post('/api/seed', async (_req, res) => {
  try {
    // Note: we no longer seed fake dentists — the directory only shows real website signups.
    const tipCount = await Tip.countDocuments();
    let dentistsAdded = 0, tipsAdded = 0;
    if (tipCount === 0) { await Tip.insertMany(TIPS); tipsAdded = TIPS.length; }

    const usersCreated: { email: string; password: string; role: string; full_name: string }[] = [];
    for (const demo of DEMO_USERS) {
      const exists = await User.findOne({ email: demo.email });
      if (!exists) {
        const hashed = await bcrypt.hash(demo.password, 12);
        await User.create({ email: demo.email, password: hashed, full_name: demo.full_name, role: demo.role });
        usersCreated.push({ email: demo.email, password: demo.password, role: demo.role, full_name: demo.full_name });
      }
    }

    // Give the demo doctor a real linked clinic profile so its dashboard (and a bookable listing) works.
    const doctorUser = await User.findOne({ email: 'doctor@dentibuddy.com' });
    if (doctorUser) {
      const existing = await Dentist.findOne({ user_id: doctorUser._id });
      if (!existing) {
        await Dentist.create({
          name: doctorUser.full_name || 'Dr. Demo Doctor',
          clinic_name: 'DentiBuddy Demo Clinic',
          city: 'Chennai',
          specialty: 'Pediatric Dentist',
          rating: null,
          self_registered: true,
          user_id: doctorUser._id,
        });
        dentistsAdded = 1;
      }
    }

    res.json({
      message: 'Seed complete',
      dentistsAdded,
      tipsAdded,
      demoUsers: DEMO_USERS.map(u => ({ email: u.email, password: u.password, role: u.role, name: u.full_name })),
      newUsersCreated: usersCreated.length,
    });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀  API server → http://localhost:${PORT}`);
  console.log(`    Seed sample data: POST http://localhost:${PORT}/api/seed\n`);
});

connectDB().catch((err) => {
  console.error('\n❌  MongoDB connection failed:', err.message);
  console.error('    Fix: update MONGODB_URI password in .env and whitelist your IP in Atlas\n');
});
