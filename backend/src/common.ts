import jwt from 'jsonwebtoken';

export const saltrounds = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export const generateCookie = (username: string) => {
  return jwt.sign({ id: username }, JWT_SECRET, {
    expiresIn: '1h',
    algorithm: 'HS256',
  });
};
