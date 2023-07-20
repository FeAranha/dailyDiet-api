import jwt from 'jsonwebtoken';
import { User } from '../models/User';

const secret = 'sua_chave_secreta_aqui';

export function generateAccessToken(user: User): string {
  const accessToken = jwt.sign({ userId: user.id }, secret, { expiresIn: '15m' });
  return accessToken;
}

export function generateRefreshToken(user: User): string {
  const refreshToken = jwt.sign({ userId: user.id }, secret, { expiresIn: '7d' });
  return refreshToken;
}
