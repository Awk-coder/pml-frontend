import React, { createContext } from 'react';
import type { UserProfile } from '../../contexts/AuthContext';

// Create mock implementation of auth functions
export const mockAuthContext = {
  session: null,
  user: null,
  profile: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  signUp: jest.fn().mockResolvedValue({ error: null }),
  signIn: jest.fn().mockResolvedValue({ error: null }),
  signInWithGoogle: jest.fn().mockResolvedValue({ error: null }),
  signOut: jest.fn().mockResolvedValue(),
  updateProfile: jest.fn().mockResolvedValue({ error: null })
};

// Create a mock context instead of importing the real one
export const MockAuthContext = createContext(mockAuthContext);

// Wrapper component to provide mock auth context
export const MockAuthProvider: React.FC<{
  children: React.ReactNode;
  value?: Partial<typeof mockAuthContext>;
}> = ({ children, value }) => {
  return (
    <MockAuthContext.Provider value={{ ...mockAuthContext, ...value }}>
      {children}
    </MockAuthContext.Provider>
  );
}; 