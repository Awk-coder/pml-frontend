import { create } from 'zustand';

const useStore = create((set) => ({
  // User authentication state
  user: null,
  isAuthenticated: false,
  isLoading: false,
  
  // Login function
  login: (userData) => set({ user: userData, isAuthenticated: true }),
  
  // Logout function
  logout: () => set({ user: null, isAuthenticated: false }),
  
  // Application preferences
  theme: 'light',
  setTheme: (theme) => set({ theme }),
  
  // University data
  programs: [],
  setPrograms: (programs) => set({ programs }),
  
  // Application status
  applicationStatus: null,
  setApplicationStatus: (status) => set({ applicationStatus: status }),
}));

export default useStore; 