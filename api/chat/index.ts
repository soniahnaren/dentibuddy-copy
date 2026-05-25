import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';
import { connectDB } from '../lib/mongodb.js';
import { getUser } from '../lib/auth.js';
import { setCors } from '../lib/cors.js';
import ChatMessage from '../models/ChatMessage.js';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are Buddy, a friendly and knowledgeable pediatric dental assistant.
You help parents with questions about their children's oral health.
Keep answers concise, warm, and easy to understand.
Always recommend consulting a qualified dentist for medical decisions.
Focus on pediatric dental topics: brushing, flossing, diet, tooth development, common issues, and dental visits.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (setCors(req, res)) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const auth = getUser(req);

  const { messages } = req.body ?? {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  try {
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

    if (auth) {
      try {
        await connectDB();
        const lastUser = messages[messages.length - 1];
        await ChatMessage.insertMany([
          { user_id: auth.userId, role: 'user', content: lastUser.content },
          { user_id: auth.userId, role: 'assistant', content: reply },
        ]);
      } catch {
        // Non-fatal — persist failure shouldn't break the chat
      }
    }

    return res.json({ reply });
  } catch (err: any) {
    return res.status(500).json({ error: err.message ?? 'AI service unavailable' });
  }
}
