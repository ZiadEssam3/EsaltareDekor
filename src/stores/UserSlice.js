import { create } from 'zustand';
import {
    signupUser,
    loginUser,
    logoutUser,
    verifyEmailCode,
    checkAuthStatus,
    sendResetEmail,
    resetPasswordWithToken,
} from '../services/userService';

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,

    signup: async (email, password, username) => {
        set({ isLoading: true, error: null });
        try {
            const res = await signupUser(email, password, username);

            if (res.data?.user) {
                set({ user: res.data.user, isAuthenticated: true });
            } else {
                throw new Error("User data missing in response");
            }
        } catch (err) {
            set({ error: err.response?.data?.message || err.message || "Signup failed" });
            throw err;
        } finally {
            set({ isLoading: false });
        }
    },
    
    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const res = await loginUser(email, password);
            set({ user: res.data.user, isAuthenticated: true, isLoading: false });
        } catch (err) {
            set({ error: err.response?.data?.message || "Login failed", isLoading: false });
            throw err;
        }
    },

    logout: async () => {
        set({ isLoading: true });
        try {
            await logoutUser();
            set({ user: null, isAuthenticated: false, isLoading: false });
        } catch (err) {
            set({ error: "Logout failed", isLoading: false });
            throw err;
        }
    },

    verifyEmail: async (code) => {
        set({ isLoading: true, error: null });
        try {
            const res = await verifyEmailCode(code);
            set({ user: res.data.user, isAuthenticated: true, isLoading: false });
        } catch (err) {
            set({ error: err.response?.data?.message || "Verification failed", isLoading: false });
            throw err;
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const res = await checkAuthStatus();
            set({ user: res.data.user, isAuthenticated: true, isCheckingAuth: false });
        } catch {
            set({ isAuthenticated: false, isCheckingAuth: false });
        }
    },

    forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
            const res = await sendResetEmail(email);
            set({ message: res.data.message, isLoading: false });
        } catch (err) {
            set({ error: err.response?.data?.message || "Failed to send email", isLoading: false });
            throw err;
        }
    },

    resetPassword: async (token, password) => {
        set({ isLoading: true, error: null });
        try {
            const res = await resetPasswordWithToken(token, password);
            set({ message: res.data.message, isLoading: false });
        } catch (err) {
            set({ error: err.response?.data?.message || "Reset failed", isLoading: false });
            throw err;
        }
    },
}));
