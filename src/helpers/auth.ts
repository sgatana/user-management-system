import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const generateAccessToken = (user: { name: string; email: string }) => {
  const secret = process.env.JWT_TOKEN_SECRET;
  if (!secret) throw { message: 'Unable to authenticate user', status: 401 };
  return jwt.sign(user, secret, { expiresIn: '1800s' });
};

export const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const secret = process.env.JWT_TOKEN_SECRET;
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token || !secret)
    return res.status(401).json({ error: 'Unable to authenticate user' });

  jwt.verify(token, secret as string, (err: any) => {
    if (err) return res.status(403).json({ error: 'Not Authorized' });
    next();
  });
};
