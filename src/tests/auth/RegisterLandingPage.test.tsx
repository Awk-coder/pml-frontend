import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegisterLandingPage from '../../pages/auth/RegisterLandingPage';

// Mock the navigation
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  Link: ({ children, to }) => <a href={to}>{children}</a>
}));

describe('RegisterLandingPage', () => {
  it('navigates to student registration when student option is clicked', () => {
    render(<RegisterLandingPage />);
    
    // Find and click the student option
    const studentCard = screen.getByText('Student').closest('div');
    fireEvent.click(studentCard);
    
    // Check that navigation was called correctly
    expect(mockNavigate).toHaveBeenCalledWith('/register/student');
  });
}); 