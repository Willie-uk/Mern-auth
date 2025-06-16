import { useState, useEffect, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import xvg from "../assets/logo.jpg"
import "../App.css"

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const navigate = useNavigate();

  const { login, isLoading, error, message, success, clearSuccess, resetMessages } = useAuthStore();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(email, password);
    setShowAlert(true);
  };

  useEffect(() => {
    if (success || message) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
        clearSuccess();
        resetMessages();
        navigate("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  
    if (error) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
        resetMessages(); // or just clearError() if needed
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, message, success]);
  

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
            {error || message || success}
          </span>
        </div>
      )}

      <motion.div
        initial="hidden"
        animate="show"
        className="d-flex flex-column justify-content-center align-items-center card p-2 border-0 w-100"
        style={{ maxWidth: "800px" }}
      >
        <motion.div
          custom={0}
          variants={staggeredItems}
          className="d-flex flex-column justify-content-center align-items-center pb-4"
        >
          <img
            style={{ width: "80px", height: "80px", borderRadius: "50%" }}
            src={xvg}
            alt="Logo"
          />
        </motion.div>

        <motion.h1 custom={1} variants={staggeredItems} className="text-center fs-2">
          Welcome Back
        </motion.h1>
        <motion.p custom={2} variants={staggeredItems} className="mb-4 text-secondary text-center">
          Login to your own account to get full access to this online service
        </motion.p>

        <form onSubmit={handleLogin} className="d-flex flex-column gap-3 w-100">
          <motion.input
            custom={6}
            variants={staggeredItems}
            type="email"
            className="form-control mt-2 w-100"
            style={{ borderRadius: "14px" }}
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <motion.div className="position-relative">
            <motion.input
              custom={7}
              variants={staggeredItems}
              type={showPassword ? "text" : "password"}
              className="form-control mt-2 w-100"
              style={{ borderRadius: "14px" }}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2, duration: 0.5, type: "spring" }}
              className="position-absolute end-0 top-50 translate-middle-y me-3 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={20} />  : <Eye size={20} />}
            </motion.span>
          </motion.div>

          <motion.div custom={8} variants={staggeredItems} className="d-flex justify-content-between mb-3">
            <Link to="/forgot-password" className="text-decoration-none text-primary">
              Forgot password?
            </Link>
          </motion.div>

          <motion.button
            custom={10}
            variants={staggeredItems}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn btn-dark w-100 py-2"
            type="submit"
            style={{ borderRadius: "14px" }}
            disabled={isLoading}
          >
            {isLoading ? <Loader className="animate-spin-loader mx-auto" size={24} /> : "Continue"}
          </motion.button>
        </form>

        <motion.p custom={11} variants={staggeredItems} className="text-center mt-3" style={{ fontSize: "12px" }}>
          By continuing, you agree to Shoe.Store{" "}
          <Link to="/login" className="text-primary text-decoration-none">
            Terms and conditions
          </Link>{" "}
          and{" "}
          <Link to="/login" className="text-primary text-decoration-none">
            Privacy Policy
          </Link>
          .
        </motion.p>

        <motion.p custom={12} variants={staggeredItems} className="text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary text-decoration-none">
            Sign up
          </Link>
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

export default Login;
