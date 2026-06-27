import { create } from 'zustand';
import { portfolioAPI } from '../services/api';

export const usePortfolioStore = create((set, get) => ({
    portfolio: null,
    portfolios: [],
    activePortfolioId: null,
    isLoading: false,
    isSaving: false,

    // Fetch user's active/specific portfolio
    fetchPortfolio: async (id) => {
        set({ isLoading: true });
        try {
            const response = await portfolioAPI.getMyPortfolio(id);
            set({
                portfolio: response.data.data.portfolio,
                isLoading: false
            });
            return { success: true, portfolio: response.data.data.portfolio };
        } catch (error) {
            set({ isLoading: false });
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to load portfolio'
            };
        }
    },

    // Fetch all user portfolios
    fetchAllPortfolios: async () => {
        set({ isLoading: true });
        try {
            const response = await portfolioAPI.getAllPortfolios();
            set({
                portfolios: response.data.data.portfolios,
                activePortfolioId: response.data.data.activePortfolioId,
                isLoading: false
            });
            return { success: true };
        } catch (error) {
            set({ isLoading: false });
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to load portfolios'
            };
        }
    },

    // Update active or specific portfolio
    updatePortfolio: async (data, id) => {
        set({ isSaving: true });
        const targetId = id || get().portfolio?._id || get().activePortfolioId;
        try {
            const response = await portfolioAPI.updatePortfolio(data, targetId);
            
            const updatedPortfolio = response.data.data.portfolio;
            
            set((state) => {
                const nextPortfolios = state.portfolios.map(p => 
                    String(p._id) === String(targetId) ? updatedPortfolio : p
                );
                const isUpdatingCurrent = !targetId || String(targetId) === String(state.portfolio?._id) || String(targetId) === String(state.activePortfolioId);
                return {
                    portfolio: isUpdatingCurrent ? updatedPortfolio : state.portfolio,
                    portfolios: nextPortfolios,
                    isSaving: false
                };
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

    // Create a new empty portfolio
    createNewPortfolio: async () => {
        set({ isSaving: true });
        try {
            const response = await portfolioAPI.createPortfolio();
            const newPortfolio = response.data.data.portfolio;
            
            set((state) => ({
                portfolios: [...state.portfolios, newPortfolio],
                isSaving: false
            }));
            return { success: true, portfolio: newPortfolio };
        } catch (error) {
            set({ isSaving: false });
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to create new portfolio'
            };
        }
    },

    // Delete a specific portfolio
    deleteUserPortfolio: async (id) => {
        set({ isSaving: true });
        try {
            const response = await portfolioAPI.deletePortfolio(id);
            const activeId = response.data.data.activePortfolioId;
            
            set((state) => {
                const nextPortfolios = state.portfolios.filter(p => String(p._id) !== String(id));
                const activePortfolio = nextPortfolios.find(p => String(p._id) === String(activeId)) || null;
                return {
                    portfolios: nextPortfolios,
                    activePortfolioId: activeId,
                    portfolio: activePortfolio,
                    isSaving: false
                };
            });
            return { success: true };
        } catch (error) {
            set({ isSaving: false });
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to delete portfolio'
            };
        }
    },

    // Make a specific portfolio active
    makePortfolioActive: async (id) => {
        set({ isSaving: true });
        try {
            const response = await portfolioAPI.setActivePortfolio(id);
            const activeId = response.data.data.activePortfolioId;
            
            set((state) => {
                const activePortfolio = state.portfolios.find(p => String(p._id) === String(activeId)) || state.portfolio;
                return {
                    activePortfolioId: activeId,
                    portfolio: activePortfolio,
                    isSaving: false
                };
            });
            return { success: true };
        } catch (error) {
            set({ isSaving: false });
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to activate portfolio'
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
    reset: () => set({ portfolio: null, portfolios: [], activePortfolioId: null, isLoading: false, isSaving: false }),
}));