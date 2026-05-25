import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectDB } from '../lib/mongodb.js';
import { setCors } from '../lib/cors.js';
import Dentist from '../models/Dentist.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (setCors(req, res)) return;
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    await connectDB();
    const { id } = req.query;
    const d = await Dentist.findById(id);
    if (!d) return res.status(404).json({ error: 'Dentist not found' });

    return res.json({
      id: d._id.toString(),
      name: d.name,
      specialty: d.specialty,
      clinic_name: d.clinic_name,
      city: d.city,
      address: d.address,
      bio: d.bio,
      rating: d.rating,
      experience_years: d.experience_years,
      consultation_fee: d.consultation_fee,
      available_today: d.available_today,
      phone: d.phone,
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message ?? 'Internal server error' });
  }
}
