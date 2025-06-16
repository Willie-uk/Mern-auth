import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:8000";
axios.defaults.withCredentials = true;

interface User {
  name: string;
  email: string;
  isVerified?: boolean;
  isAdmin?: boolean;
  lastLogin?: string;
    createdAt?: string;
}

// Safely parse stored user
function getStoredUser(): User | null {
  const raw = localStorage.getItem("user");
  if (!raw || raw === "undefined") return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// Safely get stored email
function getStoredEmail(): string | undefined {
  const email = localStorage.getItem("email");
  return email && email !== "undefined" ? email : undefined;
}

const storedUser = getStoredUser();
const storedEmail = getStoredEmail();

interface AuthState {
  email?: string;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isCheckingAuth: boolean;
  error: string | null;
  success: string | null;
  message: string | null;

  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  verifyEmail: (code: string) => Promise<void>;
  resendEmailVerification: (email: string) => Promise<void>;
  checkAuth: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;

  clearError: () => void;
  clearSuccess: () => void;
  resetMessages: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  email: storedEmail,
  user: storedUser,
  isAuthenticated: !!storedUser,
  isLoading: false,
  isCheckingAuth: true,
  error: null,
  success: null,
  message: null,

  clearSuccess: () => set({ success: null }),
  clearError: () => set({ error: null }),
  resetMessages: () => set({ success: null, error: null, message: null }),

  signup: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/register`, { name, email, password });
      const user = response.data.user;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("email", email);

      set({
        user,
        email,
        isAuthenticated: true,
        isLoading: false,
        success: response.data.message || "Signed up successfully",
      });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Signup failed", isLoading: false });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password }, {
        withCredentials: true,
      });
  
      const user = response.data.user;
      const token = response.data.token;
  
      // Save token and user
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("email", email);
      localStorage.setItem("token", token); // ✅ Save access token
  
      // Set token for all future Axios requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  
      set({
        user,
        email,
        isAuthenticated: true,
        isLoading: false,
        success: response.data.message || "Logged in successfully",
      });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Login failed", isLoading: false });
      throw error;
    }
  },
  

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);

      localStorage.removeItem("user");
      localStorage.removeItem("email");

      set({
        user: null,
        email: undefined,
        isAuthenticated: false,
        isLoading: false,
        success: "Logged out successfully",
      });
    } catch (error: any) {
      set({ error: "Logout failed", isLoading: false });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      const user = response.data.user;

      localStorage.setItem("user", JSON.stringify(user));

      set({
        user,
        isAuthenticated: true,
        isLoading: false,
        success: response.data.message || "Email verified",
      });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Verification failed", isLoading: false });
      throw error;
    }
  },

  resendEmailVerification: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/resend-verification`, { email });
      set({
        isLoading: false,
        success: response.data.message || "Verification email sent",
      });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Resend failed", isLoading: false });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const token = localStorage.getItem("token");
  
      const response = await axios.get(`${API_URL}/check-auth`, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Send access token
        },
      });
  
      const user = response.data.user;
  
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("email", user.email);
  
      set({
        user,
        email: user.email,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch {
      localStorage.removeItem("user");
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      set({ user: null, email: undefined, isAuthenticated: false, isCheckingAuth: false });
    }
  },
  

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, { email });
      set({
        message: response.data.message,
        isLoading: false,
        success: response.data.message || "Reset email sent",
      });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Error sending email", isLoading: false });
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
      set({
        message: response.data.message,
        isLoading: false,
        success: response.data.message || "Password reset successful",
      });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Reset failed", isLoading: false });
      throw error;
    }
  },
}));
