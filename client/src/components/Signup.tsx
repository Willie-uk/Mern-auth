import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Loader, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import PasswordStrengthMeter from '../utility/PasswordStrength';
import xvg from "../assets/logo.jpg"
import { isStrongPassword } from '../utility/Validate';
import "../App.css"

const Signup: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [localError, setLocalError] = useState<string | null>(null); // for frontend-only errors like weak password

  const navigate = useNavigate();
  const { signup, error, isLoading, message, success } = useAuthStore();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!isStrongPassword(password)) {
      setLocalError('Password must be strong.');
      setShowAlert(true);
      return;
    }

    setLocalError(null); // Clear previous local error

    try {
      await signup(name, email, password);
      setShowAlert(true);
      navigate("/verify-email");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (localError || error || message || success) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
        setLocalError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [localError, error, message, success]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
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
      {showAlert && (
        <div
          className={`alert ${error ? "bg-danger text-white" : "bg-dark text-white"} fixed-top w-75 mx-auto mt-3 d-flex justify-content-between py-1`}
          role="alert"
          style={{ zIndex: 1051, borderRadius: "8px" }}
        >
          <span className="text-center w-100">
            {localError || error || message || success}
          </span>
        </div>
      )}
      <motion.div
        initial="hidden"
        animate="show"
        className="d-flex flex-column justify-content-center align-items-center card p-2 border-0 w-100"
        style={{ maxWidth: "800px" }}
      >
        <motion.div custom={0} variants={staggeredItems} className="d-flex flex-column justify-content-center align-items-center pb-4">
					<img style={{ width: "80px", height: "80px", borderRadius: "50%" }} src={xvg} alt="Logo" />
				</motion.div>
        <motion.h1 custom={1} variants={staggeredItems} className="text-center fs-2">
          Create your free account
        </motion.h1>

        <motion.p custom={2} variants={staggeredItems} className="mb-4 text-secondary text-center">
          Have your own account to get full access to this online service
        </motion.p>

        <form onSubmit={handleSignUp} className="w-100">
          <motion.input
            custom={3}
            variants={staggeredItems}
            type="text"
            className="form-control mt-2 w-100"
            style={{ borderRadius: "14px" }}
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <motion.input
            custom={4}
            variants={staggeredItems}
            type="email"
            className="form-control mt-2"
            style={{ borderRadius: "14px" }}
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="position-relative">
            <motion.input
              custom={5}
              variants={staggeredItems}
              type={isPasswordVisible ? "text" : "password"}
              className="form-control mt-2"
              style={{ borderRadius: "14px" }}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2, duration: 0.5, type: "spring" }}
              className="position-absolute top-50 end-0 translate-middle-y me-3"
              style={{ cursor: "pointer" }}
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </motion.span>
          </div>
          <motion.div custom={7} variants={staggeredItems}>
            <PasswordStrengthMeter password={password} />
          </motion.div>

          <motion.button
            custom={8}
            variants={staggeredItems}
            className="btn btn-dark btn-lg w-100 mt-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            style={{ borderRadius: "14px" }}
          >
            {isLoading ? (
              <Loader className="animate-spin-loader mx-auto" />
            ) : (
              "Continue"
            )}
          </motion.button>
        </form>

        <motion.p custom={11} variants={staggeredItems} className="text-center mt-3" style={{ fontSize: "12px" }}>
          By continuing, you agree to Shoe.Store{" "}
          <Link to="/login" className="text-primary text-decoration-none">Terms and conditions</Link> and{" "}
          <Link to="/login" className="text-primary text-decoration-none">Privacy Policy</Link>.
        </motion.p>

        <motion.p custom={12} variants={staggeredItems} className="text-center">
          Already have an account? <Link to="/login" className="text-primary text-decoration-none">Log in</Link>
        </motion.p>

        <motion.div custom={13} variants={staggeredItems} className="text-center mt-4">
          <small className="text-secondary">Shoe.Store</small>
          <div className="d-flex justify-content-center mt-2">
            <p className="mx-2" style={{ color: "#d5d5d5" }}>Secure</p>
            <p className="mx-2" style={{ color: "#d5d5d5" }}>Guaranteed</p>
            <p className="mx-2" style={{ color: "#d5d5d5" }}>Trusted</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signup;
