import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectDB } from '../lib/mongodb.js';
import { getUser } from '../lib/auth.js';
import { setCors } from '../lib/cors.js';
import Child from '../models/Child.js';

function fmt(c: any) {
  return {
    id: c._id.toString(),
    parent_id: c.parent_id.toString(),
    name: c.name,
    date_of_birth: c.date_of_birth,
    avatar_emoji: c.avatar_emoji,
    created_at: c.createdAt,
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (setCors(req, res)) return;

  const auth = getUser(req);
  if (!auth) return res.status(401).json({ error: 'Unauthorized' });

  try {
    await connectDB();

    if (req.method === 'GET') {
      const children = await Child.find({ parent_id: auth.userId }).sort({ createdAt: 1 });
      return res.json(children.map(fmt));
    }

    if (req.method === 'POST') {
      const { name, date_of_birth, avatar_emoji } = req.body ?? {};
      if (!name?.trim()) return res.status(400).json({ error: 'Name is required' });

      const child = await Child.create({
        parent_id: auth.userId,
        name: name.trim(),
        date_of_birth: date_of_birth || null,
        avatar_emoji: avatar_emoji || '🧒',
      });

      return res.status(201).json(fmt(child));
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message ?? 'Internal server error' });
  }
}
