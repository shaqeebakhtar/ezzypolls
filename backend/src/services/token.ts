import jwt from 'jsonwebtoken';
import { tokenSecret } from '../utils/config';

export function generateToken(payload: { id: string; createdAt: string }) {
  const adminToken = jwt.sign(payload, tokenSecret, {
    expiresIn: '7 days',
  });

  return adminToken;
}

export function verifyToken(token: string) {
  return jwt.verify(token, tokenSecret);
}
