import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { ACCESS_TOKEN_SECRET } from "../constants/env"; // Make sure this is correct

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
  }

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET as string) as { userId: string };

    if (!decoded?.userId || !mongoose.Types.ObjectId.isValid(decoded.userId)) {
      return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
    }

    req.userId = new mongoose.Types.ObjectId(decoded.userId); // Correct assignment
    next();
  } catch (error) {
    console.error("Error in verifyToken:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
