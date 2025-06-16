import { motion } from "framer-motion"
import { ArrowLeft, Loader, Mail } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";
import "../App.css"

function ForgotPass() {
    const [email, setEmail] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const navigate = useNavigate();

	const { isLoading, forgotPassword, error, message, success, resetMessages  } = useAuthStore();

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		try {
		  await forgotPassword(email);
		  setIsSubmitted(true);
		  setShowAlert(true);
		  
		  // Delay navigation to allow alert to be shown
		  setTimeout(() => {
			navigate("/login", { replace: true });
		  }, 3000); // Wait 3 seconds before redirect
		} catch (err) {
		  console.error("Forgot password error:", err);
		  setShowAlert(true); // still show alert for error
		  setTimeout(() => {
			navigate("/login", { replace: true });
		  }, 3000); 
		}
	  };

	useEffect(() => {
		if (error || message || success) {
		  setShowAlert(true);
		  const timer = setTimeout(() => {
			setShowAlert(false);
			resetMessages();
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
  <div  className={`alert ${error ? "bg-danger text-white" : "bg-dark text-white"} fixed-top w-75 mx-auto mt-3 d-flex justify-content-between py-1`} role="alert" style={{ zIndex: 1051, borderRadius: "8px" }}>
    
	<span className="text-center w-100">
	{message || error}
          </span>
  </div>
)}
		<div
            className='d-flex flex-column justify-content-center align-items-center card p-2 border-0 w-100' style={{maxWidth:"800px"}}
		>
			<motion.div 
            initial="hidden"
        animate="show" 
        className='p-4'>
				<motion.h2 custom={1} variants={staggeredItems}  className='display-4 text-center text-dark mb-6'>
					Forgot Password
				</motion.h2>

				{!isSubmitted ? (
					<form onSubmit={handleSubmit}>
						<motion.p custom={2} variants={staggeredItems} className='text-muted mb-4 text-center'>
							Enter your email address and we'll send you a link to reset your password.
						</motion.p>
						<motion.input
                        custom={3} variants={staggeredItems} 
							type='email' className="form-control mt-2 w-100" style={{borderRadius:"14px"}}
							placeholder='Email Address'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<motion.button
                        custom={4} variants={staggeredItems} 
						whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
							className='btn btn-dark w-100 py-2 my-2 shadow'
							type='submit' style={{borderRadius:"14px"}}
						>
							{isLoading ? <Loader className="animate-spin-loader mx-auto" /> : "Send Reset Link"}
						</motion.button>
					</form>
				) : (
					<div className='text-center'>
						<div
							className='d-flex align-items-center justify-content-center mx-auto mb-4'
							style={{ width: '4rem', height: '4rem', backgroundColor: '#000', borderRadius: '50%' }}
						>
							<Mail className='h-8 w-8 text-white' style={{backgroundColor:"#000"}} />
						</div>
						<p className='text-muted mb-4'>
							If an account exists for {email}, you will receive a password reset link shortly.
						</p>
					</div>
				)}
                <motion.div custom={5} variants={staggeredItems} className='pt-4 pt-3 bg-light bg-opacity-50 d-flex justify-content-center'>
				<Link to={"/login"} className='text-sm text-primary d-flex align-items-center'>
					<ArrowLeft className='me-2' /> Back to Login
				</Link>
			</motion.div>
			</motion.div>

			
		</div>
		</div>
  )
}

export default ForgotPass