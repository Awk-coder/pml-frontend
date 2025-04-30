import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import LoginPage from '../../pages/auth/LoginPage';

// Mock Supabase - simpler version with role support
jest.mock('../../lib/supabase', () => {
  const listeners = [];
  let currentRole = 'student';
  
  return {
    supabase: {
      auth: {
        signInWithPassword: jest.fn().mockImplementation(() => ({
          data: {
            session: {
              access_token: `${currentRole}-token`,
              user: { 
                id: `${currentRole}-id`, 
                email: `${currentRole}@example.com` 
              }
            },
            user: { 
              id: `${currentRole}-id`, 
              email: `${currentRole}@example.com` 
            }
          },
          error: null
        })),
        getSession: jest.fn().mockResolvedValue({
          data: { session: null },
          error: null
        }),
        onAuthStateChange: jest.fn().mockImplementation(callback => {
          listeners.push(callback);
          return { data: { subscription: { unsubscribe: jest.fn() } } };
        }),
        signOut: jest.fn().mockResolvedValue({ error: null })
      },
      from: jest.fn().mockImplementation(() => ({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockImplementation(() => ({
              data: {
                id: 'profile-1',
                role: currentRole,
                user_id: `${currentRole}-id`,
                first_name: 'Test',
                last_name: currentRole.charAt(0).toUpperCase() + currentRole.slice(1),
                email: `${currentRole}@example.com`
              },
              error: null
            }))
          })
        })
      })),
      // Helper methods for testing
      _setRole: (role) => { currentRole = role; },
      _triggerAuthChange: (event, session) => {
        listeners.forEach(callback => callback(event, { session }));
      }
    }
  };
});

// Mock navigation
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('User Types Authentication', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('redirects student users to student dashboard', async () => {
    const { supabase } = require('../../lib/supabase');
    supabase._setRole('student');
    
    render(
      <BrowserRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </BrowserRouter>
    );
    
    // Login
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: 'student@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
      target: { value: 'password' }
    });
    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
    
    // Simulate auth state change
    const session = {
      access_token: 'student-token',
      user: { id: 'student-id', email: 'student@example.com' }
    };
    supabase._triggerAuthChange('SIGNED_IN', session);
    
    // Verify redirect
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard/student');
    });
  });

  // You can add similar tests for university and agent roles
}); 