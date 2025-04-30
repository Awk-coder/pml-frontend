import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MockAuthProvider, mockAuthContext } from '../__mocks__/authContextMock';
import LoginPage from '../../pages/auth/LoginPage';

// Mock the navigation and context hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  useNavigate: () => mockNavigate,
  useLocation: () => ({ search: '' }),
  Link: ({ children, to }) => <a href={to}>{children}</a>
}));

// Mock the useAuth hook to return our mock context
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: () => mockAuthContext,
  AuthProvider: ({ children }) => <>{children}</>
}));

describe('LoginPage', () => {
  it('submits login credentials when form is submitted', async () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'test@example.com' }
    });
    
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' }
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
    
    // Check if the auth function was called
    expect(mockAuthContext.signIn).toHaveBeenCalledWith('test@example.com', 'password123');
  });
}); 