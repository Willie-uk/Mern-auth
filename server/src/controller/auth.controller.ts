import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { User } from "../models/user";
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  NODE_ENV,
  ADMIN_PASS,
  APP_ORIGIN,
} from "../constants/env";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../email/email";
import passwordSchema from "../utils/Validator";
import { comparePassword, hashPassword } from "../utils/HashPass";

export const Register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    if (!name) throw new Error("Name is required");
    if (!email) throw new Error("Email is required");
    if (!password) throw new Error("Strong password is required");

    if (!passwordSchema.validate(password)) {
      return res.status(400).json({ message: 'Weak password. Must include upper/lowercase, number, symbol.' });
    }

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await hashPassword(password);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const expiredAt = new Date();
    expiredAt.setDate(expiredAt.getDate() + 7);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      token: "",
      expired_at: expiredAt,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    const refreshToken = jwt.sign({ userId: user._id }, REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });
    
    // Optional: update the user with refreshToken
    user.token = refreshToken;
    await user.save();

    await sendVerificationEmail(user.email, verificationToken);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    const accessToken = jwt.sign({ id: user._id }, ACCESS_TOKEN_SECRET, {
      expiresIn: "5m",
    });

    const { password: _, ...userWithoutPassword } = user.toObject();

    res
      .status(201)
      .send({
        success: true,
        message: "User created successfully",
        token: accessToken,
        user: userWithoutPassword,
      });
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(400).send({ message: "Email already in use" });
    }
    res.status(500).send({ success: false, message: "Server error" });
  }
};

export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    const existingToken = user.token;
    
    const isTokenValid =
      existingToken &&
      user.expired_at &&
      new Date(user.expired_at) > new Date() &&
      jwt.verify(existingToken, REFRESH_TOKEN_SECRET);

    const refreshToken = isTokenValid
      ? existingToken
      : jwt.sign({ email: user.email }, REFRESH_TOKEN_SECRET, {
          expiresIn: "7d",
        });

    if (!isTokenValid) {
      const expiredAt = new Date();
      expiredAt.setDate(expiredAt.getDate() + 7);
      user.token = refreshToken;
      user.expired_at = expiredAt;
    }

    user.lastLogin = new Date();
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    const accessToken = jwt.sign({ userId: user._id }, ACCESS_TOKEN_SECRET, {
      expiresIn: "60s", // 1 minute expiry
    });

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token: accessToken, // Send access token
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        isAdmin: user.isAdmin,
    lastLogin: user.lastLogin,
    createdAt: user.createdAt,
      }, // Send user details
    });
  } catch {
    res.status(500).send({ success: false, message: "Login error" });
  }
};

export const Logout = async (req: Request, res: Response) => {
  const refreshToken = req.cookies["refreshToken"];

  try {
    const user = await User.findOne({ token: refreshToken });
    if (user) {
      user.token = undefined;
      user.expired_at = undefined;
      await user.save();
    }

    res.cookie("refreshToken", "", { maxAge: 0 });
    res.status(200).json({ sucess: true, message: "Logout successfully" });
  } catch {
    res.status(500).send({ success: false, message: "Logout failed" });
  }
};

export const AuthenticatedUser = async (req: Request, res: Response) => {
  try {
    const accessToken = req.header("Authorization")?.split(" ")[1] || "";
    const payload: any = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    const user = await User.findById(payload.id).select(
      "-password -token -expired_at"
    );

    if (!user) return res.status(401).send({ message: "Unauthenticated" });

    res.status(200).json({ user });
  } catch {
    res.status(401).send({ message: "Unauthenticated" });
  }
};

export const Refresh = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies["refreshToken"];
    if (!refreshToken)
      return res.status(401).send({ message: "Unauthenticated" });

    const payload: any = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

    const user = await User.findOne({
      email: payload.email,
      token: refreshToken,
      expired_at: { $gte: new Date() },
    });

    if (!user) return res.status(401).send({ message: "Unauthenticated" });

    const newAccessToken = jwt.sign({ id: user._id }, ACCESS_TOKEN_SECRET, {
      expiresIn: "60s",
    });

    res.status(200).json({ sucess: true, token: newAccessToken });
  } catch {
    res.status(401).send({ sucess: false, message: "Unauthenticated" });
  }
};

export const VerifyEmail = async (req: Request, res: Response) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Expired verification code" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);
    

    const token = jwt.sign(
      { userId: user._id },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Send cookie + clean user data
    res
      .cookie("refreshToken", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200)
      .json({
        success: true,
        message: "Email verified successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isVerified: user.isVerified,
        },
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Email not verified" });
  }
};

export const ResendEmailVerification = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    user.isVerified = false;
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    user.verificationToken = verificationToken;
    user.verificationTokenExpiresAt = new Date(
      Date.now() + 24 * 60 * 60 * 1000
    );
    await user.save();

    await sendVerificationEmail(user.email, verificationToken);

    res
      .status(200)
      .json({
        success: true,
        message: "Verification code resent successfully",
      });
  } catch {
    res
      .status(500)
      .json({ success: false, message: "Error resending verification code" });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    await sendPasswordResetEmail(
      user.email,
      `${APP_ORIGIN}/reset-password/${resetToken}`
    );

    res
      .status(200)
      .json({
        success: true,
        message: "Password reset link sent to your email",
      });
  } catch (error) {
    console.log("Error in forgotPassword", error);
    res.status(400).json({ success: false, message: "Retry" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: new Date() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();

    await sendResetSuccessEmail(user.email);

    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.log("Error in resetPassword", error);
    res.status(400).json({ success: false, message: "Retry" });
  }
};

export const adminPass = (req: Request, res: Response) => {
  const { pass } = req.body;

  if (!pass) {
    return res
      .status(400)
      .json({ success: false, message: "Password is required" });
  }

  if (pass === ADMIN_PASS) {
    return res.status(200).json({ success: true, message: "Access allowed" });
  } else {
    return res.status(403).json({ success: false, message: "Access denied" });
  }
};

export const checkAdminPass = async (req: Request, res: Response) => {
  const { pass } = req.body;

  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!user.isVerified) {
      return res
        .status(403)
        .json({ success: false, message: "Access denied - user not verified" });
    }

    if (pass === ADMIN_PASS) {
      user.isAdmin = true;
      await user.save();
      return res
        .status(200)
        .json({ success: true, message: "Access allowed - user is now admin" });
    } else {
      return res
        .status(403)
        .json({
          success: false,
          message: "Access denied - invalid admin pass",
        });
    }
  } catch (error) {
    console.error("Error in checkAdminPass", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const checkAuth = async (req: Request, res: Response) => {
  try {

    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found", user: req.userId });
    }

    res.status(200).json({ success: true, user });
  } catch (error: any) {
    console.error("Error in checkAuth:", error);
    res.status(500).json({ success: false, message: error.message || "Server error" });
  }
};
