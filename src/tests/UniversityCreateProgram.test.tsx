import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UniversityDashboardPage from '../pages/university/UniversityDashboardPage';
import '@testing-library/jest-dom';
import { createProgram, getProgramsByUniversity, getApplicationsByProgram } from '../services/localStorageService';

// Mock the localStorageService
vi.mock('../services/localStorageService', () => ({
  getProgramsByUniversity: vi.fn(),
  getApplicationsByProgram: vi.fn(),
  createProgram: vi.fn()
}));

// Mock the AuthContext
vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: {
      id: 'univ-123',
      firstName: 'Harvard',
      lastName: 'University',
      email: 'admin@harvard.edu',
      role: 'university'
    }
  })
}));

describe('University Creating Programs', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock data
    const mockPrograms = [];
    const mockApplications = [];
    
    // Set up the mock return values
    (getProgramsByUniversity as any).mockReturnValue(mockPrograms);
    (getApplicationsByProgram as any).mockReturnValue(mockApplications);
    (createProgram as any).mockImplementation((program) => {
      return {
        ...program,
        id: 'program-123',
        createdAt: new Date().toISOString()
      };
    });
  });

  it('allows a university to create a new program', async () => {
    render(<UniversityDashboardPage />, { wrapper: BrowserRouter });
    
    // Click the "Add Program" button
    fireEvent.click(screen.getByText(/Add Program/i));
    
    // Wait for the modal to appear
    await waitFor(() => {
      expect(screen.getByText(/Add New Program/i)).toBeInTheDocument();
    });
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Program Name/i), { target: { value: 'Master of Data Science' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'An advanced program in data science and analytics.' } });
    fireEvent.change(screen.getByLabelText(/Tuition/i), { target: { value: '45000' } });
    fireEvent.change(screen.getByLabelText(/Duration/i), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText(/Degree Level/i), { target: { value: 'Master' } });
    fireEvent.change(screen.getByLabelText(/Field of Study/i), { target: { value: 'Data Science' } });
    fireEvent.change(screen.getByLabelText(/Application Deadline/i), { target: { value: '2023-11-30' } });
    fireEvent.change(screen.getByLabelText(/Start Date/i), { target: { value: '2024-01-15' } });
    
    // Add a requirement
    const requirementInputs = screen.getAllByLabelText(/Requirements/i);
    fireEvent.change(requirementInputs[0], { target: { value: 'Bachelor degree in related field' } });
    
    // Submit the form
    fireEvent.click(screen.getByText(/Add Program/i));
    
    // Verify that createProgram was called with the correct arguments
    await waitFor(() => {
      expect(createProgram).toHaveBeenCalledWith({
        name: 'Master of Data Science',
        description: 'An advanced program in data science and analytics.',
        tuition: 45000,
        duration: 2,
        degreeLevel: 'Master',
        fieldOfStudy: 'Data Science',
        applicationDeadline: '2023-11-30',
        startDate: '2024-01-15',
        requirements: ['Bachelor degree in related field'],
        university: 'Harvard University\'s University',
        universityId: 'univ-123'
      });
    });
  });
  
  it('validates required fields when creating a program', async () => {
    render(<UniversityDashboardPage />, { wrapper: BrowserRouter });
    
    // Click the "Add Program" button
    fireEvent.click(screen.getByText(/Add Program/i));
    
    // Wait for the modal to appear
    await waitFor(() => {
      expect(screen.getByText(/Add New Program/i)).toBeInTheDocument();
    });
    
    // Try to submit without filling out required fields
    fireEvent.click(screen.getByText(/Add Program/i));
    
    // Verify that createProgram was not called
    expect(createProgram).not.toHaveBeenCalled();
  });
}); 