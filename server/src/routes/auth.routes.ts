import { Router } from "express";
import { adminPass, AuthenticatedUser, checkAdminPass, checkAuth, forgotPassword, Login, Logout, Refresh, Register, ResendEmailVerification, resetPassword, VerifyEmail } from "../controller/auth.controller";
import { authenticate } from "../middleware/auth.middleware";
import { loginLimiter, resetLimiter } from "../middleware/Limit";
import { verifyToken } from "../middleware/verify";

const router = Router();

router.post('/register', Register);
router.post('/login', loginLimiter, Login);
router.post('/refresh', Refresh);
router.post('/logout', Logout);
router.post("/resend-verification", ResendEmailVerification);
router.post("/verify-email", VerifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetLimiter, resetPassword);
router.post("/bypass", adminPass);
router.post("/admin",authenticate('header'), checkAdminPass);
router.get('/user',authenticate('header'), AuthenticatedUser);
router.get("/check-auth", authenticate('header'), checkAuth);

export default router;
