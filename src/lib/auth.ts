import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { prisma } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'pakgrowth_fallback_secret_key_2026';

export interface UserPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
}

export function signToken(payload: UserPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): UserPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as UserPayload;
  } catch (error) {
    return null;
  }
}

export async function getCurrentUser(): Promise<UserPayload | null> {
  const cookieStore = cookies();
  const token = cookieStore.get('pakgrowth_token')?.value;

  if (!token) return null;
  return verifyToken(token);
}

// Simple hash utility for MVP passwords
export function hashPassword(password: string): string {
  // Simple deterministic hash function for lightweight zero-dependency deployment
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return 'pk_hash_' + Math.abs(hash).toString(36);
}

export function comparePassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}
