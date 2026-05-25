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
    experience_years: { type: Number, default: 5 },
    consultation_fee: { type: Number, default: 500 },
    available_today: { type: Boolean, default: false },
    phone: { type: String, default: '' },
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
    status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
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

// ── Models ───────────────────────────────────────────────────────────────────
const User = (mongoose.models['User'] as mongoose.Model<any>) || mongoose.model('User', UserSchema);
const Child = (mongoose.models['Child'] as mongoose.Model<any>) || mongoose.model('Child', ChildSchema);
const Dentist = (mongoose.models['Dentist'] as mongoose.Model<any>) || mongoose.model('Dentist', DentistSchema);
const Appointment = (mongoose.models['Appointment'] as mongoose.Model<any>) || mongoose.model('Appointment', AppointmentSchema);
const Tip = (mongoose.models['Tip'] as mongoose.Model<any>) || mongoose.model('Tip', TipSchema);

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
function signToken(userId: string, email: string) {
  return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '30d' });
}

function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) { res.status(401).json({ error: 'Unauthorized' }); return; }
    const payload = jwt.verify(header.slice(7), JWT_SECRET) as { userId: string; email: string };
    (req as any).userId = payload.userId;
    (req as any).userEmail = payload.email;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// ── App setup ────────────────────────────────────────────────────────────────
const app = express();
app.use(cors());
app.use(express.json());

// ── AUTH ─────────────────────────────────────────────────────────────────────
app.post('/api/auth/register', async (req, res) => {
  const { email, password, full_name } = req.body ?? {};
  if (!email || !password) { res.status(400).json({ error: 'Email and password are required' }); return; }
  if (password.length < 6) { res.status(400).json({ error: 'Password must be at least 6 characters' }); return; }
  try {
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) { res.status(400).json({ error: 'Email already in use' }); return; }
    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({ email: email.toLowerCase(), password: hashed, full_name: full_name ?? '' });
    const token = signToken(user._id.toString(), user.email);
    res.status(201).json({ token, user: { id: user._id.toString(), email: user.email, full_name: user.full_name } });
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
    const token = signToken(user._id.toString(), user.email);
    res.json({ token, user: { id: user._id.toString(), email: user.email, full_name: user.full_name } });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/auth/me', requireAuth, async (req, res) => {
  try {
    const user = await User.findById((req as any).userId).select('-password');
    if (!user) { res.status(404).json({ error: 'User not found' }); return; }
    res.json({ id: user._id.toString(), email: user.email, full_name: user.full_name });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
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
    bio: d.bio, rating: d.rating, experience_years: d.experience_years,
    consultation_fee: d.consultation_fee, available_today: d.available_today, phone: d.phone,
  };
}

app.get('/api/dentists', async (_req, res) => {
  try {
    const dentists = await Dentist.find().sort({ rating: -1 });
    res.json(dentists.map(fmtDentist));
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
    created_at: a.createdAt,
    children: child?._id ? { name: child.name, avatar_emoji: child.avatar_emoji } : null,
    dentists: dentist?._id ? { name: dentist.name, clinic_name: dentist.clinic_name, city: dentist.city } : null,
  };
}

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
  const { child_id, dentist_id, appointment_date, appointment_time, reason } = req.body ?? {};
  if (!child_id || !dentist_id || !appointment_date || !appointment_time) {
    res.status(400).json({ error: 'child_id, dentist_id, appointment_date and appointment_time are required' }); return;
  }
  try {
    const appt = await (await Appointment.create({
      parent_id: (req as any).userId, child_id, dentist_id,
      appointment_date, appointment_time, reason: reason ?? '', status: 'confirmed',
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

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey.startsWith('sk-ant-...')) {
    res.json({ reply: 'Buddy AI is not configured yet. Please set ANTHROPIC_API_KEY in your .env file.' });
    return;
  }

  try {
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    });
    const reply = response.content[0].type === 'text' ? response.content[0].text : '';
    res.json({ reply });
  } catch (err: any) {
    res.status(500).json({ error: err.message ?? 'AI service unavailable' });
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

app.post('/api/seed', async (_req, res) => {
  try {
    const [dentistCount, tipCount] = await Promise.all([Dentist.countDocuments(), Tip.countDocuments()]);
    let dentistsAdded = 0, tipsAdded = 0;
    if (dentistCount === 0) { await Dentist.insertMany(DENTISTS); dentistsAdded = DENTISTS.length; }
    if (tipCount === 0) { await Tip.insertMany(TIPS); tipsAdded = TIPS.length; }
    res.json({ message: 'Seed complete', dentistsAdded, tipsAdded, alreadySeeded: dentistCount > 0 && tipCount > 0 });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// ── Start ─────────────────────────────────────────────────────────────────────
// Start listening immediately so Vite proxy doesn't get ECONNREFUSED.
// MongoDB connects in the background; routes return 503 until it's ready.
app.listen(PORT, () => {
  console.log(`\n🚀  API server → http://localhost:${PORT}`);
  console.log(`    Seed sample data: POST http://localhost:${PORT}/api/seed\n`);
});

connectDB().catch((err) => {
  console.error('\n❌  MongoDB connection failed:', err.message);
  console.error('    Fix: update MONGODB_URI password in .env and whitelist your IP in Atlas\n');
});
