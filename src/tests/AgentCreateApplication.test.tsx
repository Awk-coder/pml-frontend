import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AgentDashboardPage from '../pages/agent/AgentDashboardPage';
import '@testing-library/jest-dom';
import { createApplication, getApplications, getUsers, getPrograms } from '../services/localStorageService';

// Mock the localStorageService
vi.mock('../services/localStorageService', () => ({
  getApplications: vi.fn(),
  getUsers: vi.fn(),
  getPrograms: vi.fn(),
  createApplication: vi.fn()
}));

// Mock the AuthContext
vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: {
      id: 'agent-123',
      firstName: 'Agent',
      lastName: 'Smith',
      email: 'agent@example.com',
      role: 'agent'
    }
  })
}));

describe('Agent Creating Applications', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock data
    const mockStudents = [
      { id: 'student-1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'student' },
      { id: 'student-2', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', role: 'student' }
    ];
    
    const mockPrograms = [
      { 
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
      }
    ];
    
    const mockApplications = [];
    
    // Set up the mock return values
    (getUsers as any).mockReturnValue(mockStudents);
    (getPrograms as any).mockReturnValue(mockPrograms);
    (getApplications as any).mockReturnValue(mockApplications);
    (createApplication as any).mockImplementation((application) => {
      return {
        ...application,
        id: 'app-123',
        submittedAt: new Date().toISOString()
      };
    });
  });

  it('allows an agent to create a new application', async () => {
    render(<AgentDashboardPage />, { wrapper: BrowserRouter });
    
    // Click the "New Application" button
    fireEvent.click(screen.getByText(/New Application/i));
    
    // Wait for the modal to appear
    await waitFor(() => {
      expect(screen.getByText(/Create New Application/i)).toBeInTheDocument();
    });
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Student/i), { target: { value: 'student-1' } });
    fireEvent.change(screen.getByLabelText(/Program/i), { target: { value: 'program-1' } });
    fireEvent.change(screen.getByLabelText(/Notes/i), { target: { value: 'This student is highly qualified.' } });
    
    // Submit the form
    fireEvent.click(screen.getByText(/Submit Application/i));
    
    // Verify that createApplication was called with the correct arguments
    await waitFor(() => {
      expect(createApplication).toHaveBeenCalledWith({
        studentId: 'student-1',
        programId: 'program-1',
        notes: 'This student is highly qualified.',
        status: 'pending',
        documents: []
      });
    });
  });
  
  it('validates required fields when creating an application', async () => {
    render(<AgentDashboardPage />, { wrapper: BrowserRouter });
    
    // Click the "New Application" button
    fireEvent.click(screen.getByText(/New Application/i));
    
    // Wait for the modal to appear
    await waitFor(() => {
      expect(screen.getByText(/Create New Application/i)).toBeInTheDocument();
    });
    
    // Try to submit without filling out required fields
    fireEvent.click(screen.getByText(/Submit Application/i));
    
    // Verify that createApplication was not called
    expect(createApplication).not.toHaveBeenCalled();
  });
}); 