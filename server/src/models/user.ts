import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  token: { type: String }, // refresh token
  isAdmin: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  verificationToken: String,
  resetPasswordToken: String,
  expired_at: { type: Date }, // token expiry
  lastLogin: { type: Date },
		resetPasswordExpiresAt: Date,
		verificationTokenExpiresAt: Date,
}, { timestamps: true });

export const User = mongoose.model('User', UserSchema);
