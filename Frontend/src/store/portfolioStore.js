import { create } from 'zustand';
import { portfolioAPI } from '../services/api';
import { useAuthStore } from './authStore';

export const usePortfolioStore = create((set, get) => ({
    portfolio: null,
    isLoading: false,
    isSaving: false,

    // Fetch my portfolio
    fetchPortfolio: async () => {
        set({ isLoading: true });
        try {
            const response = await portfolioAPI.getMyPortfolio();
            set({
                portfolio: response.data.data.portfolio,
                isLoading: false
            });
            return { success: true };
        } catch (error) {
            set({ isLoading: false });
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to load portfolio'
            };
        }
    },

    // Update portfolio
    updatePortfolio: async (data) => {
        set({ isSaving: true });
        try {
            const response = await portfolioAPI.updatePortfolio(data);
            set({
                portfolio: response.data.data.portfolio,
                isSaving: false
            });
            return { success: true, data: response.data };
        } catch (error) {
            set({ isSaving: false });
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to save portfolio'
            };
        }
    },

    // Update specific section (optimistic update)
    updateSection: (section, data) => {
        set((state) => ({
            portfolio: {
                ...state.portfolio,
                [section]: data
            }
        }));
    },

    // Reset
    reset: () => set({ portfolio: null, isLoading: false, isSaving: false }),
}));