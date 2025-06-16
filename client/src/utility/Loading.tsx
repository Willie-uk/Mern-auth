import { motion } from "framer-motion";
import React from "react";

const LoadingSpinner: React.FC = () => {
	return (
		<div
			className="d-flex align-items-center justify-content-center relative overflow-hidden"
			style={{ height: "100vh" }}
		>
			{/* Simple Loading Spinner */}
			<motion.div
				className="border-4 border-t-4 border-t-gray-500 border-gray-200 rounded-full"
				animate={{ rotate: 360 }}
				transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
				style={{
					height: "4rem",
					width: "4rem",
					borderWidth: "4px",
					borderTopWidth: "4px",
					borderTopColor: "gray",
					borderColor: "#e5e5e5",
					borderRadius: "50%",
				}}
			/>
		</div>
	);
};

export default LoadingSpinner;
