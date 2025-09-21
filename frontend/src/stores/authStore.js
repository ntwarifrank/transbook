
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export const useAuthStore = create(
  subscribeWithSelector((set, get) => ({
    // State
    user: null,
    token: null,
    isAuthenticated: false,

    // Actions
    setAuth: (user, token) => {
      set({ user, token, isAuthenticated: true });
      
      // Update localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
      }
    },

    clearAuth: () => {
      set({ user: null, token: null, isAuthenticated: false });
      
      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    },

    // Initialize from localStorage (call this on app start)
    initAuth: () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('authToken');
        const userString = localStorage.getItem('user');
        
        if (token && userString) {
          try {
            const user = JSON.parse(userString);
            set({ user, token, isAuthenticated: true });
          } catch (error) {
            console.error('Failed to parse user data:', error);
            // Clear invalid data
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
          }
        }
      }
    },

    // Get current state (useful for API calls)
    getAuth: () => {
      const { user, token, isAuthenticated } = get();
      return { user, token, isAuthenticated };
    },
  }))
);

// Selectors for better performance
export const useUser = () => useAuthStore(state => state.user);
export const useToken = () => useAuthStore(state => state.token);
export const useIsAuthenticated = () => useAuthStore(state => state.isAuthenticated);