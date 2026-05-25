import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectDB } from '../lib/mongodb.js';
import { getUser } from '../lib/auth.js';
import { setCors } from '../lib/cors.js';
import User from '../models/User.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (setCors(req, res)) return;
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const auth = getUser(req);
  if (!auth) return res.status(401).json({ error: 'Unauthorized' });

  try {
    await connectDB();

    const user = await User.findById(auth.userId).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });

    return res.json({ id: user._id.toString(), email: user.email, full_name: user.full_name });
  } catch (err: any) {
    return res.status(500).json({ error: err.message ?? 'Internal server error' });
  }
}
