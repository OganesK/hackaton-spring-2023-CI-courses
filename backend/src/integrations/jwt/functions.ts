import jwt from 'jsonwebtoken';
import { User } from '@prisma/client'; // TODO: Add reference to your user model in Prisma

export const createToken = (user: User): string => {
  return jwt.sign({
    userId: user.id,
    iss: 'Issuer', // TODO: Add issuer
  }, process.env.JWT_SECRET!, {
    algorithm: 'HS256',
    expiresIn: process.env.ENV_NAME === 'dev' ? '24h' : '15m',
  });
};

export const createRefreshToken = (user: User) => {
  return jwt.sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.JWT_REFRESH_SECRET!,
  );
};
