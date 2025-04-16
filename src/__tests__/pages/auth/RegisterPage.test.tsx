import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../../contexts/AuthContext';
import RegisterPage from '../../../pages/auth/RegisterPage';
import * as router from 'react-router';

// Mock the useNavigate hook
const navigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => navigate,
  useLocation: () => ({
    state: { role: 'student' }
  })
}));

// Mock the AuthContext
jest.mock('../../../contexts/AuthContext', () => ({
  useAuth: () => ({
    register: jest.fn().mockImplementation((email, password, firstName, lastName, role) => {
      return Promise.resolve();
    })
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('RegisterPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the registration form with role selector', () => {
    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );

    // Check that the form elements are rendered
    expect(screen.getByLabelText(/Account Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create account/i })).toBeInTheDocument();
  });

  test('pre-selects role from location state', () => {
    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );

    // Check that the role selector has the correct value
    expect(screen.getByLabelText(/Account Type/i)).toHaveValue('student');
  });

  test('shows error when passwords do not match', async () => {
    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );

    // Fill out the form with non-matching passwords
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'password456' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Create account/i }));

    // Check that the error message is displayed
    expect(await screen.findByText(/Passwords do not match/i)).toBeInTheDocument();
    
    // Verify that navigate was not called
    expect(navigate).not.toHaveBeenCalled();
  });

  test('submits the form with correct data and navigates on success', async () => {
    const { useAuth } = require('../../../contexts/AuthContext');
    const mockRegister = jest.fn().mockResolvedValue(undefined);
    useAuth.mockReturnValue({ register: mockRegister });

    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Account Type/i), { target: { value: 'university' } });
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Create account/i }));

    // Wait for the form submission to complete
    await waitFor(() => {
      // Verify that register was called with the correct arguments
      expect(mockRegister).toHaveBeenCalledWith(
        'john.doe@example.com',
        'password123',
        'John',
        'Doe',
        'university'
      );
      
      // Verify that navigate was called with the correct path
      expect(navigate).toHaveBeenCalledWith('/auth/registration-success');
    });
  });

  test('shows error message when registration fails', async () => {
    const { useAuth } = require('../../../contexts/AuthContext');
    const mockRegister = jest.fn().mockRejectedValue(new Error('Registration failed'));
    useAuth.mockReturnValue({ register: mockRegister });

    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Create account/i }));

    // Check that the error message is displayed
    expect(await screen.findByText(/Registration failed/i)).toBeInTheDocument();
    
    // Verify that navigate was not called
    expect(navigate).not.toHaveBeenCalled();
  });
}); 