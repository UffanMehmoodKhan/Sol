import jwt from 'jsonwebtoken';

export const authMiddleware = (
  req: { cookies: { token: any }; user: string | jwt.JwtPayload },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      send: { (arg0: { message: string }): any; new (): any };
    };
  },
  next: () => void
) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send({ message: 'Invalid token' });
  }
};
