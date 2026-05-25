import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectDB } from '../lib/mongodb.js';
import { getUser } from '../lib/auth.js';
import { setCors } from '../lib/cors.js';
import Appointment from '../models/Appointment.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (setCors(req, res)) return;
  if (req.method !== 'PATCH') return res.status(405).json({ error: 'Method not allowed' });

  const auth = getUser(req);
  if (!auth) return res.status(401).json({ error: 'Unauthorized' });

  try {
    await connectDB();
    const { id } = req.query;
    const { status } = req.body ?? {};

    const appt = await Appointment.findOneAndUpdate(
      { _id: id, parent_id: auth.userId },
      { status },
      { new: true }
    );

    if (!appt) return res.status(404).json({ error: 'Appointment not found' });
    return res.json({ id: appt._id.toString(), status: appt.status });
  } catch (err: any) {
    return res.status(500).json({ error: err.message ?? 'Internal server error' });
  }
}
