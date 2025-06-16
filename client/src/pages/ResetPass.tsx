import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import PasswordStrengthMeter from "../utility/PasswordStrength";


const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [localToken, setLocalToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const { resetPassword, isLoading, resetMessages } = useAuthStore();

   // ✅ Validate and sanitize token from URL
   useEffect(() => {
    if (token && token.length > 20) {
      setLocalToken(token);
      navigate("/reset-password", { replace: true });
    } else {
      setError("Invalid or expired reset link");
      setTimeout(() => navigate("/forgot-password"), 2000);
    }
  }, [token, navigate]);

  // 🧼 Auto-hide alerts
  useEffect(() => {
    if (success || error) {
      const timeout = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [success, error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (success) return; 

    if (!localToken) {
      setError("Invalid or missing reset token.");
      return;
    }

    if (!password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
     await resetPassword(localToken, password);

     setSuccess("Password reset successful");
      setTimeout(() => {
        setSuccess("");
        resetMessages();
        navigate("/login", { replace: true });
      }, 2000);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to reset password. Try again."
      );
    }
  };

   const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const staggeredItems = {
    hidden: { opacity: 0, y: 20 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    
    <div className="container d-flex justify-content-center align-items-center min-vh-100 w-100">
      <motion.div 
            initial="hidden"
        animate="show" 
        className="d-flex flex-column justify-content-center align-items-center card p-2 border-0 w-100"
        style={{ maxWidth: "800px" }}
      >
      <motion.h2 custom={1} variants={staggeredItems} className="display-4 text-center text-dark mb-6">Reset Password</motion.h2>
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3 w-100">
        {error && (
          <div className="alert alert-danger text-center text-sm mb-4" style={{paddingTop:"4px",paddingBottom:"4px",borderRadius:"10px"}} role="alert">
            {error}
          </div>
        )}
        {success && (
          <div className="alert alert-success text-center text-sm mb-4" style={{paddingTop:"4px",paddingBottom:"4px",borderRadius:"10px"}} role="alert">
            {success}
          </div>
        )}
        <motion.div custom={2} variants={staggeredItems} className="position-relative">
            <input
              type={isPasswordVisible ? "text" : "password"}
              className="form-control mt-2 w-100"
              style={{ borderRadius: "14px" }}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <motion.span
			initial={{ opacity: 0, x: -10 }} // Initial state for the span
								animate={{ opacity: 1, x: 0 }} // Animation target state
								transition={{ delay: 2, duration: 0.5, type: "spring" }}
              className="position-absolute top-50 end-0 translate-middle-y me-3"
              style={{ cursor: "pointer" }}
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </motion.span>
          </motion.div>
          <motion.div custom={3} variants={staggeredItems} className="position-relative">
            <input
              type={isConfirmPasswordVisible ? "text" : "password"}
              className="form-control mt-2 w-100"
              style={{ borderRadius: "14px" }}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <motion.span
			initial={{ opacity: 0, x: -10 }} // Initial state for the span
								animate={{ opacity: 1, x: 0 }} // Animation target state
								transition={{ delay: 2, duration: 0.5, type: "spring" }}
              className="position-absolute top-50 end-0 translate-middle-y me-3"
              style={{ cursor: "pointer" }}
              onClick={toggleConfirmPasswordVisibility}
            >
              {isConfirmPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </motion.span>
          </motion.div>
          <motion.div custom={4} variants={staggeredItems}>
            <PasswordStrengthMeter password={password} />
          </motion.div>
          <motion.button custom={5} variants={staggeredItems} 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn btn-dark w-100 py-2"
            style={{ borderRadius: "14px" }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Resetting..." : "Set New Password"}
          </motion.button>
      </form>
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;
