import jwt from 'jsonwebtoken';
import type { VercelRequest } from '@vercel/node';

const SECRET = process.env.JWT_SECRET ?? 'dev-secret-change-in-production';

export interface TokenPayload {
  userId: string;
  email: string;
}

export function signToken(userId: string, email: string): string {
  return jwt.sign({ userId, email } as TokenPayload, SECRET, { expiresIn: '30d' });
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, SECRET) as TokenPayload;
}

export function getUser(req: VercelRequest): TokenPayload | null {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) return null;
    return verifyToken(header.slice(7));
  } catch {
    return null;
  }
}
