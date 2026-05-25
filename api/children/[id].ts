import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectDB } from '../lib/mongodb.js';
import { getUser } from '../lib/auth.js';
import { setCors } from '../lib/cors.js';
import Child from '../models/Child.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (setCors(req, res)) return;
  if (req.method !== 'DELETE') return res.status(405).json({ error: 'Method not allowed' });

  const auth = getUser(req);
  if (!auth) return res.status(401).json({ error: 'Unauthorized' });

  try {
    await connectDB();
    const { id } = req.query;
    await Child.findOneAndDelete({ _id: id, parent_id: auth.userId });
    return res.json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: err.message ?? 'Internal server error' });
  }
}
