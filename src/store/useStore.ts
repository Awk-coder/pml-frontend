import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  // Add other user properties as needed
}

interface Program {
  id: string;
  name: string;
  description: string;
  // Add other program properties as needed
}

interface ApplicationStatus {
  status: 'not_started' | 'in_progress' | 'submitted' | 'under_review' | 'accepted' | 'rejected';
  message?: string;
}

interface StoreState {
  // User authentication state
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Login function
  login: (userData: User) => void;
  
  // Logout function
  logout: () => void;
  
  // Application preferences
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  
  // University data
  programs: Program[];
  setPrograms: (programs: Program[]) => void;
  
  // Application status
  applicationStatus: ApplicationStatus | null;
  setApplicationStatus: (status: ApplicationStatus) => void;
}

const useStore = create<StoreState>((set) => ({
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