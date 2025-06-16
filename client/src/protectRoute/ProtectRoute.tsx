import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router-dom";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
