import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import '@testing-library/jest-dom';

// Mock navigate function
const mockNavigate = vi.fn();

// Mock login function
const mockLogin = vi.fn();

// Mock the AuthContext
vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    login: mockLogin
  })
}));

// Mock react-router-dom
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

describe('Login Flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('redirects student users to the student dashboard', async () => {
    // Mock login to return a student user
    mockLogin.mockResolvedValueOnce({ role: 'student' });

    render(<LoginPage />, { wrapper: BrowserRouter });

    // Fill out the login form
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'student@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Account Type/i), { target: { value: 'student' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    // Wait for the async operations to complete
    await waitFor(() => {
      // Check that login was called with the correct arguments
      expect(mockLogin).toHaveBeenCalledWith('student@example.com', 'password123', 'student');
      
      // Check that navigate was called with the student dashboard path
      expect(mockNavigate).toHaveBeenCalledWith('/student/dashboard');
    });
  });

  it('redirects university users to the university dashboard', async () => {
    // Mock login to return a university user
    mockLogin.mockResolvedValueOnce({ role: 'university' });

    render(<LoginPage />, { wrapper: BrowserRouter });

    // Fill out the login form
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'university@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Account Type/i), { target: { value: 'university' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    // Wait for the async operations to complete
    await waitFor(() => {
      // Check that login was called with the correct arguments
      expect(mockLogin).toHaveBeenCalledWith('university@example.com', 'password123', 'university');
      
      // Check that navigate was called with the university dashboard path
      expect(mockNavigate).toHaveBeenCalledWith('/university/dashboard');
    });
  });

  it('redirects agent users to the agent dashboard', async () => {
    // Mock login to return an agent user
    mockLogin.mockResolvedValueOnce({ role: 'agent' });

    render(<LoginPage />, { wrapper: BrowserRouter });

    // Fill out the login form
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'agent@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Account Type/i), { target: { value: 'agent' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    // Wait for the async operations to complete
    await waitFor(() => {
      // Check that login was called with the correct arguments
      expect(mockLogin).toHaveBeenCalledWith('agent@example.com', 'password123', 'agent');
      
      // Check that navigate was called with the agent dashboard path
      expect(mockNavigate).toHaveBeenCalledWith('/agent/dashboard');
    });
  });

  it('shows error message when login fails', async () => {
    // Mock login to reject with an error
    mockLogin.mockRejectedValueOnce(new Error('Invalid credentials'));

    render(<LoginPage />, { wrapper: BrowserRouter });

    // Fill out the login form
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'wrongpassword' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    // Check that error message is displayed
    expect(await screen.findByText(/Invalid credentials/i)).toBeInTheDocument();
    
    // Check that navigate was not called
    expect(mockNavigate).not.toHaveBeenCalled();
  });
}); 