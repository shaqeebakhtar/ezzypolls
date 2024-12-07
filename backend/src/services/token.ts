import jwt from 'jsonwebtoken';
import { tokenSecret } from '../utils/config';

class TokenService {
  public generateToken(payload: { id: string; createdAt: string }) {
    const adminToken = jwt.sign(payload, tokenSecret, {
      expiresIn: '7 days',
    });

    return adminToken;
  }

  public verifyToken(token: string) {
    return jwt.verify(token, tokenSecret);
  }
}

export const tokenService = new TokenService();
