import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import ForgotPass from "./pages/ForgotPass";
import ResetPasswordPage from "./pages/ResetPass";
import VerifyEmail from "./pages/VerifyEmail";
import Contact from "./info/Contact";
import About from "./info/About";
import Notification from "./info/Notification";

import { useAuthStore } from "./store/authStore";
import LoadingSpinner from "./utility/Loading";

// 🔐 Protected Route Wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user?.isVerified) return <Navigate to="/verify-email" replace />;
  return <>{children}</>;
};

// 🔐 Admin Protected Route Wrapper
const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user?.isVerified) return <Navigate to="/verify-email" replace />;
  if (!user?.isAdmin) return <Navigate to="/" replace />;
  return <>{children}</>;
};

// 🚫 Redirect Authenticated Users from Login/Signup
const RedirectAuthenticatedUser: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user?.isVerified) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const App: React.FC = () => {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />; // optional spinner here

  return (
    <Router>
      <Routes>
        {/* ✅ Public Routes with redirect if already logged in */}
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <Signup />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <Login />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* 🔐 Protected User Route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* 📢 Public Info Routes */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/notification" element={<Notification />} />

        {/* 🔒 Example Admin Route (add real admin page) */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <div>Admin Page</div>
            </ProtectedAdminRoute>
          }
        />

        {/* ❓ Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
