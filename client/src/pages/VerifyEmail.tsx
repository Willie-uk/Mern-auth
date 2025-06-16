import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { Loader } from "lucide-react";
import "../App.css"

const EmailVerificationPage = () => {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const navigate = useNavigate();

  const { isLoading, verifyEmail, resendEmailVerification, error, message, success, resetMessages} = useAuthStore();

  const [resendLoading, setResendLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<string | null>(null);
  const [timer, setTimer] = useState<number>(30);

  // Retrieve email from both localStorage and Zustand
  const emailFromStore = useAuthStore.getState().email;
  const email = emailFromStore || localStorage.getItem("email") || "";

  const handleChange = (index: number, value: string) => {
    const newCode = [...code];

    // Handle paste
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      const lastFilledIndex = newCode.findLastIndex((digit: string) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex]?.focus();
    } else {
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: FormEvent | Event) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode);
      setShowAlert("Email verified successfully.");
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      setShowAlert("Invalid verification code. Please try again.");
        setTimeout(() => {
        navigate("/login", { replace: true });
        }, 30000); // Wait 3 seconds before redirect
    }
  };

  const handleResendOTP = async () => {
    if (!email) {
      setShowAlert("Email not found. Please log in again.");
        return;
    }

    try {
      setResendLoading(true);
      await resendEmailVerification(email);
      setShowAlert("Verification code resent successfully.");
      setTimer(30);
    } catch (err) {
      setShowAlert("Failed to resend verification code.");
    } finally {
      setResendLoading(false);
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  useEffect(() => {
    if (error || message || success) {
      setShowAlert(error || message || success);
      const timer = setTimeout(() => {
        setShowAlert(null);
        resetMessages();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, message, success]);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

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
    <div
      className="container max-w-md mx-auto p-4 bg-light rounded-3 d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
     {showAlert && (
  <div
    className={`alert ${
      error || showAlert?.toLowerCase().includes("fail") || showAlert?.toLowerCase().includes("not") 
        ? "bg-danger text-white"
        : "bg-dark text-white"
    } fixed-top w-75 mx-auto mt-3 d-flex justify-content-between py-1`}
    role="alert"
    style={{ zIndex: 1051, borderRadius: "8px" }}
  >
    <span className="text-center w-100">{showAlert}</span>
  </div>
)}
      <motion.div 
            initial="hidden"
        animate="show" 
        className="p-5 bg-light shadow"
        style={{ borderRadius: "30px" }}
      >
        <motion.h2 custom={1} variants={staggeredItems} className="text-center mb-4 display-4">Verify Your Email</motion.h2>
        <motion.p custom={2} variants={staggeredItems} className="text-center text-muted mb-4">
          Enter the 6-digit code sent to your email address.
        </motion.p>
        
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
        <div  className="d-flex justify-content-between">
            {code.map((digit, index) => (
              <motion.input
              custom={3} 
              variants={staggeredItems}
                key={index}
                ref={(el) => {
                  if (el) inputRefs.current[index] = el;
                }}
                type="text"
                maxLength={6}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="form-control text-center fs-3 fw-bold shadow"
                style={{
                  width: "3rem",
                  height: "4rem",
                  backgroundColor: "#f8f9fa",
                  borderColor: "#0d6efd",
                  color: "#0d6efd",
                  marginLeft: "5px"
                }}
              />
            ))}
          </div>

          <motion.button
            custom={4} 
            variants={staggeredItems} 
            type="submit"
            disabled={isLoading || code.some((digit) => !digit)}
            className="btn btn-dark btn-lg w-100"
            style={{borderRadius:"10px", padding:"2px"}}
          >
            {isLoading ? <Loader className="animate-spin-loader mx-auto my-auto" /> : "Verify Email"}
          </motion.button>

          <motion.button
            custom={5} 
            variants={staggeredItems} 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleResendOTP}
            disabled={resendLoading || timer > 0}
            className="btn btn-outline-dark btn-lg w-50 mx-auto"
            style={{borderRadius:"10px", padding:"0px", fontSize:"16px"}}
            type="button"
          >
            {resendLoading
              ? <Loader className="animate-spin-loader mx-auto" />
              : timer > 0
              ? <>
              <Loader className="animate-spin-loader me-2" />
               ({timer}s)
            </>
              : "Resend OTP"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default EmailVerificationPage;
