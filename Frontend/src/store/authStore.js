import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI } from '../services/api';

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,

            // Signup
            signup: async (userData) => {
                set({ isLoading: true });
                try {
                    const response = await authAPI.signup(userData);
                    const { token, user } = response.data.data;
                    localStorage.setItem('token', token);
                    set({
                        user,
                        token,
                        isAuthenticated: true,
                        isLoading: false
                    });
                    return { success: true, data: response.data };
                } catch (error) {
                    set({ isLoading: false });
                    return {
                        success: false,
                        error: error.response?.data?.message || 'Signup failed'
                    };
                }
            },

            // Login
            login: async (email, password) => {
                set({ isLoading: true });
                try {
                    const response = await authAPI.login({ email, password });
                    const { token, user } = response.data.data;
                    localStorage.setItem('token', token);
                    set({
                        user,
                        token,
                        isAuthenticated: true,
                        isLoading: false
                    });
                    return { success: true, data: response.data };
                } catch (error) {
                    set({ isLoading: false });
                    return {
                        success: false,
                        error: error.response?.data?.message || 'Login failed'
                    };
                }
            },

            // Logout
            logout: () => {
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false
                });
                localStorage.removeItem('token');
            },

            // Get current user
            fetchUser: async () => {
                try {
                    const response = await authAPI.getMe();
                    set({ user: response.data.data.user });
                } catch (error) {
                    get().logout();
                }
            },

            // Set user (for updates)
            setUser: (user) => set({ user }),
        }),
        {
            name: 'auth-storage', // persists to localStorage
        }
    )
);