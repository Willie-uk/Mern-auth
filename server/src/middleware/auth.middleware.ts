// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { ACCESS_TOKEN_SECRET } from '../constants/env';

// Extend Express Request
declare module 'express-serve-static-core' {
  interface Request {
    userId?: mongoose.Types.ObjectId;
  }
}

export const authenticate = (source: 'cookie' | 'header' = 'cookie') =>
  (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (source === 'cookie') {
      token = req.cookies.refreshToken;
    } else if (source === 'header') {
      const authHeader = req.headers['authorization'];
      token = authHeader && authHeader.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized - No token provided' });
    }

    try {
      const payload = jwt.verify(token, ACCESS_TOKEN_SECRET) as jwt.JwtPayload;

      if (!payload || typeof payload !== 'object' || !payload.userId || !mongoose.Types.ObjectId.isValid(payload.userId)) {
        return res.status(401).json({ success: false, message: 'Invalid token payload' });
      }

      req.userId = new mongoose.Types.ObjectId(payload.userId);
      next();
    } catch (err) {
      console.error('JWT verification failed:', err);
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
  };
