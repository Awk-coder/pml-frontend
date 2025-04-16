import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import ProgramDetailPage from '../pages/programs/ProgramDetailPage';
import '@testing-library/jest-dom';
import { getPrograms, createApplication, getApplicationsByStudent } from '../services/localStorageService';

// Mock the localStorageService
vi.mock('../services/localStorageService', () => ({
  getPrograms: vi.fn(),
  createApplication: vi.fn(),
  getApplicationsByStudent: vi.fn()
}));

// Mock the AuthContext
vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: {
      id: 'student-123',
      firstName: 'Student',
      lastName: 'User',
      email: 'student@example.com',
      role: 'student'
    }
  })
}));

describe('Student Creating Applications', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock data
    const mockProgram = { 
      id: 'program-1', 
      name: 'Computer Science', 
      university: 'MIT University',
      universityId: 'univ-1',
      description: 'A comprehensive program in CS',
      tuition: 30000,
      duration: 4,
      degreeLevel: 'Bachelor',
      fieldOfStudy: 'Computer Science',
      applicationDeadline: '2023-12-31',
      startDate: '2024-01-15',
      requirements: ['High School Diploma'],
      createdAt: '2023-01-01'
    };
    
    const mockApplications = [];
    
    // Set up the mock return values
    (getPrograms as any).mockReturnValue([mockProgram]);
    (getApplicationsByStudent as any).mockReturnValue(mockApplications);
    (createApplication as any).mockImplementation((application) => {
      return {
        ...application,
        id: 'app-123',
        submittedAt: new Date().toISOString()
      };
    });
  });

  it('allows a student to apply for a program', async () => {
    // Render the program detail page with a specific program ID
    render(
      <MemoryRouter initialEntries={['/programs/program-1']}>
        <Routes>
          <Route path="/programs/:id" element={<ProgramDetailPage />} />
        </Routes>
      </MemoryRouter>
    );
    
    // Wait for the program details to load
    await waitFor(() => {
      expect(screen.getByText(/Computer Science/i)).toBeInTheDocument();
    });
    
    // Click the "Apply Now" button
    fireEvent.click(screen.getByText(/Apply Now/i));
    
    // Wait for the application modal/form to appear
    await waitFor(() => {
      expect(screen.getByText(/Apply to Computer Science/i)).toBeInTheDocument();
    });
    
    // Fill out any additional application details if needed
    // For example, if there's a notes field:
    if (screen.getByLabelText(/Additional Notes/i)) {
      fireEvent.change(screen.getByLabelText(/Additional Notes/i), { 
        target: { value: 'I am very interested in this program.' } 
      });
    }
    
    // Submit the application
    fireEvent.click(screen.getByText(/Submit Application/i));
    
    // Verify that createApplication was called with the correct arguments
    await waitFor(() => {
      expect(createApplication).toHaveBeenCalledWith({
        studentId: 'student-123',
        programId: 'program-1',
        status: 'pending',
        documents: [],
        notes: expect.any(String) // The notes might be optional
      });
    });
    
    // Check for success message
    expect(screen.getByText(/Application submitted successfully/i)).toBeInTheDocument();
  });
  
  it('prevents a student from applying to a program they already applied to', async () => {
    // Mock that the student has already applied to this program
    (getApplicationsByStudent as any).mockReturnValue([
      {
        id: 'existing-app',
        studentId: 'student-123',
        programId: 'program-1',
        status: 'pending',
        submittedAt: '2023-10-01T00:00:00.000Z',
        documents: [],
        notes: ''
      }
    ]);
    
    // Render the program detail page with a specific program ID
    render(
      <MemoryRouter initialEntries={['/programs/program-1']}>
        <Routes>
          <Route path="/programs/:id" element={<ProgramDetailPage />} />
        </Routes>
      </MemoryRouter>
    );
    
    // Wait for the program details to load
    await waitFor(() => {
      expect(screen.getByText(/Computer Science/i)).toBeInTheDocument();
    });
    
    // Check that the "Already Applied" message is shown instead of the "Apply Now" button
    expect(screen.getByText(/You have already applied to this program/i)).toBeInTheDocument();
    expect(screen.queryByText(/Apply Now/i)).not.toBeInTheDocument();
  });
}); 