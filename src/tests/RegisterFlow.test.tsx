import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RegisterPage from '../pages/auth/RegisterPage';
import '@testing-library/jest-dom';

// Create a simple wrapper component that provides the router context
const TestWrapper = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

// Mock navigate function
const mockNavigate = vi.fn();

// Simple mock for AuthContext with a spy on register
const mockRegister = vi.fn().mockResolvedValue(undefined);
vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    register: mockRegister
  })
}));

// Simple mock for useLocation and useNavigate
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useLocation: () => ({ state: { role: 'student' } }),
    useNavigate: () => mockNavigate
  };
});

describe('Registration Flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the registration form with all fields', () => {
    render(<RegisterPage />, { wrapper: BrowserRouter });

    // Check that the form elements are rendered
    expect(screen.getByLabelText(/Account Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create account/i })).toBeInTheDocument();
  });

  it('allows users to fill out the form', () => {
    render(<RegisterPage />, { wrapper: BrowserRouter });

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'password123' } });

    // Check that the values were updated
    expect(screen.getByLabelText(/First Name/i)).toHaveValue('John');
    expect(screen.getByLabelText(/Last Name/i)).toHaveValue('Doe');
    expect(screen.getByLabelText(/Email/i)).toHaveValue('john.doe@example.com');
    expect(screen.getByLabelText(/^Password$/i)).toHaveValue('password123');
    expect(screen.getByLabelText(/Confirm Password/i)).toHaveValue('password123');
  });

  it('submits the form and redirects to success page on successful registration', async () => {
    render(<RegisterPage />, { wrapper: BrowserRouter });

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Account Type/i), { target: { value: 'university' } });
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Create account/i }));

    // Wait for the async operations to complete
    await waitFor(() => {
      // Check that register was called with the correct arguments
      expect(mockRegister).toHaveBeenCalledWith(
        'john.doe@example.com',
        'password123',
        'John',
        'Doe',
        'university'
      );
      
      // Check that navigate was called with the correct path
      expect(mockNavigate).toHaveBeenCalledWith('/auth/registration-success');
    });
  });

  it('shows error message when passwords do not match', async () => {
    render(<RegisterPage />, { wrapper: BrowserRouter });

    // Fill out the form with mismatched passwords
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'differentpassword' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Create account/i }));

    // Check that error message is displayed
    expect(await screen.findByText(/Passwords do not match/i)).toBeInTheDocument();
    
    // Check that register was not called
    expect(mockRegister).not.toHaveBeenCalled();
    
    // Check that navigate was not called
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('shows error message when registration fails', async () => {
    // Mock register to reject with an error
    mockRegister.mockRejectedValueOnce(new Error('Registration failed'));

    render(<RegisterPage />, { wrapper: BrowserRouter });

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Create account/i }));

    // Check that error message is displayed
    expect(await screen.findByText(/Registration failed/i)).toBeInTheDocument();
    
    // Check that navigate was not called
    expect(mockNavigate).not.toHaveBeenCalled();
  });
}); 