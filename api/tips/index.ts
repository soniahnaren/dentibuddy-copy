import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectDB } from '../lib/mongodb.js';
import { setCors } from '../lib/cors.js';
import Tip from '../models/Tip.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (setCors(req, res)) return;
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    await connectDB();
    const tips = await Tip.find().sort({ createdAt: 1 });
    return res.json(
      tips.map((t) => ({
        id: t._id.toString(),
        title: t.title,
        content: t.content,
        emoji: t.emoji,
        category: t.category,
        created_at: t.createdAt,
      }))
    );
  } catch (err: any) {
    return res.status(500).json({ error: err.message ?? 'Internal server error' });
  }
}
