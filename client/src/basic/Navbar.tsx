import { useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { useAuthStore } from '../store/authStore';
import { Link, useNavigate } from 'react-router-dom';
// import { formatDate } from '../utility/DateFormat';
import xvg from "../assets/logo.jpg"
import { formatDate } from '../utility/DateFormat';
import { BadgeCheck, BadgeX } from 'lucide-react';

function Navbar() {
    const logout = useAuthStore((state) => state.logout);
    const user = useAuthStore((state) => state.user);
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();


    const toggleCard = () => {
        setIsVisible(!isVisible);
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
      };

    return (
        <div
        className={`d-flex w-100 justify-content-between align-items-center px-4 mt-2 position-fixed`}
        style={{
            height: "70px",
            backgroundColor: "rgba(255, 255, 255, 0.2)", // Semi-transparent background
            backdropFilter: "blur(10px)", // Blur effect on the navbar background
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100, // Ensures the navbar stays on top
        }}
        >
            <div className='d-flex gap-2 align-items-center'>
            <img style={{ width: "60px", height: "60px", borderRadius: "50%" }} src={xvg} alt="Logo" />
            </div>
            <ul
            id='nav-ul'
             className="mx-auto px-2 d-md-flex align-items-center py-2 my-auto list-unstyled d-none" style={{backgroundColor:"#e1e1e1",borderRadius:"15px"}}>
              <li className="nav-item ms-4"><Link className="nav-link paa-link-hover active text-decoration-none" to="/paa">Home</Link></li>
              <li className="nav-item ms-4"><Link className="nav-link paa-link-hover text-decoration-none" to="/paa/a">About</Link></li>
              <li className="nav-item ms-4"><Link className="nav-link paa-link-hover text-decoration-none" to="/paa/n">Notification</Link></li>
              <li className="nav-item ms-4"><Link className="nav-link paa-link-hover text-decoration-none" to="/paa/c">Contact</Link></li>
              <li className="nav-item ms-4"><Link className="nav-link paa-link-hover text-decoration-none" to="/paa/f">Feedback</Link></li>
            </ul>
            <button onClick={toggleCard} className='btn btn-dark' style={{borderRadius:"15px"}}>
                {isVisible ? "Close" : "Profile"}
            </button>

            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: 0.1 }}
                        className="card shadow"
                        style={{
                            position: "absolute",
                            top: "100%", 
                            borderRadius: "20px",
                            right: "0",
                            width: "18rem",
                            marginTop: "10px",
                            padding: "1px",
                            border: "1px solid #e1e1e1",
                            backgroundColor: "#fff",
                            zIndex: 10,
                        }}
                    >
                        <div className="card-body">
                            <motion.h5
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="card-title fw-bold my-4"
                            >
                                Hi {user?.name}.
                            </motion.h5>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className='text-dark d-flex flex-column'
                            >
                                <span className='fw-bold'>Joined: </span>
                                <span>{formatDate(user?.createdAt)}</span>
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className='text-dark d-flex flex-column'
                            >
                                <span className='fw-bold'>Last login: </span>
                                <span>{formatDate(user?.lastLogin)}</span>
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className='my-4 text-muted'
                                >
                                Verified? :{" "}
                                {user?.isVerified ? (
                                    <span className="text-primary"><BadgeCheck /></span>
                                ) : (
                                    <span className="text-danger"><BadgeX /></span>
                                )}
                                </motion.p>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 }}
                                className='my-4 text-muted'
                            >
                                 Email: {user?.email}
                            </motion.p>
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                                onClick={handleLogout}
                                className='btn btn-dark w-100'
                                style={{borderRadius:"15px"}}
                            >
                                Logout
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Navbar;
