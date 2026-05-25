import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectDB } from '../lib/mongodb.js';
import { getUser } from '../lib/auth.js';
import { setCors } from '../lib/cors.js';
import Appointment from '../models/Appointment.js';

function fmt(a: any) {
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
    children: child?._id
      ? { name: child.name, avatar_emoji: child.avatar_emoji }
      : null,
    dentists: dentist?._id
      ? { name: dentist.name, clinic_name: dentist.clinic_name, city: dentist.city }
      : null,
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (setCors(req, res)) return;

  const auth = getUser(req);
  if (!auth) return res.status(401).json({ error: 'Unauthorized' });

  try {
    await connectDB();

    if (req.method === 'GET') {
      const appts = await Appointment.find({ parent_id: auth.userId })
        .populate('child_id', 'name avatar_emoji')
        .populate('dentist_id', 'name clinic_name city')
        .sort({ appointment_date: -1, appointment_time: -1 });

      return res.json(appts.map(fmt));
    }

    if (req.method === 'POST') {
      const { child_id, dentist_id, appointment_date, appointment_time, reason } = req.body ?? {};

      if (!child_id || !dentist_id || !appointment_date || !appointment_time) {
        return res.status(400).json({ error: 'child_id, dentist_id, appointment_date and appointment_time are required' });
      }

      const appt = await (await Appointment.create({
        parent_id: auth.userId,
        child_id,
        dentist_id,
        appointment_date,
        appointment_time,
        reason: reason ?? '',
        status: 'confirmed',
      })).populate(['child_id', 'dentist_id']);

      return res.status(201).json(fmt(appt));
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message ?? 'Internal server error' });
  }
}
