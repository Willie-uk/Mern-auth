import { Request } from 'express';
import mongoose from 'mongoose';

declare module 'express-serve-static-core' {
  interface Request {
    user_id?: mongoose.Types.ObjectId;
    userEmail?: string;
  }
}


export const extendRequestType = {};
