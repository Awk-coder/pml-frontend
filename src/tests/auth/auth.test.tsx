import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

// Create session mock
const createMockSession = (role = "student") => ({
  access_token: "test-token",
  refresh_token: "test-refresh",
  expires_at: new Date().getTime() + 3600,
  user: {
    id: "user-id",
    email: `test@example.com`,
    app_metadata: { provider: "email" },
    user_metadata: { role },
  },
});

// Mock Supabase with flexible roles
jest.mock("../../lib/supabase", () => {
  // Start with no session
  let currentSession = null;
  let currentRole = "student";
  let authListeners = [];

  const mockSignInWithPassword = jest.fn().mockImplementation(() => ({
    data: {
      session: createMockSession(currentRole),
      user: createMockSession(currentRole).user,
    },
    error: null,
  }));

  const mockSignUp = jest.fn().mockImplementation(() => ({
    data: {
      user: createMockSession(currentRole).user,
      session: createMockSession(currentRole),
    },
    error: null,
  }));

  const mockGetSession = jest.fn().mockImplementation(() => ({
    data: { session: currentSession },
    error: null,
  }));

  const mockOnAuthStateChange = jest.fn().mockImplementation((callback) => {
    authListeners.push(callback);
    return { data: { subscription: { unsubscribe: () => {} } } };
  });

  const mockSupabase = {
    auth: {
      signInWithPassword: mockSignInWithPassword,
      signUp: mockSignUp,
      getSession: mockGetSession,
      onAuthStateChange: mockOnAuthStateChange,
      signOut: jest.fn().mockResolvedValue({ error: null }),
    },
    from: jest.fn().mockImplementation((table) => {
      if (table === "profiles") {
        return {
          insert: jest.fn().mockReturnValue({
            select: jest.fn().mockResolvedValue({
              data: { id: "profile-1", role: currentRole },
              error: null,
            }),
          }),
          select: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({
                data: {
                  id: "profile-1",
                  user_id: "user-id",
                  role: currentRole,
                  first_name: "Test",
                  last_name: "User",
                  email: "test@example.com",
                },
                error: null,
              }),
            }),
          }),
        };
      }
      return {};
    }),
    // Helper methods for testing
    _setRole: (role) => {
      currentRole = role;
    },
    _setSession: (session) => {
      currentSession = session;
    },
    _triggerAuthChange: (event, session) => {
      authListeners.forEach((callback) => callback(event, { session }));
    },
  };

  return { supabase: mockSupabase };
});

// Import after mocking
import { AuthProvider, useAuth } from "../../contexts/AuthContext";
import LoginPage from "../../pages/auth/LoginPage";
import StudentRegistrationPage from "../../pages/auth/StudentRegistrationPage";
import UniversityRegistrationPage from "../../pages/auth/UniversityRegistrationPage";
import AgentRegistrationPage from "../../pages/auth/AgentRegistrationPage";

// Get mock supabase instance
const { supabase: mockSupabase } = require("../../lib/supabase");

// Mock navigation
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  useNavigate: () => mockNavigate,
  useLocation: () => ({ search: "" }),
  Link: ({ children, to }) => <a href={to}>{children}</a>,
}));

describe("Authentication Flows", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSupabase._setSession(null);
  });

  describe("Login Flows", () => {
    it("should login as student and redirect to student dashboard", async () => {
      mockSupabase._setRole("student");

      render(
        <BrowserRouter>
          <AuthProvider>
            <LoginPage />
          </AuthProvider>
        </BrowserRouter>
      );

      // Use more specific selectors for login form
      fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
        target: { value: "student@example.com" },
      });

      fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
        target: { value: "password123" },
      });

      // Submit login form
      fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

      // Verify signInWithPassword was called
      await waitFor(() => {
        expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalled();
      });

      // Important: Simulate the auth state change
      const studentSession = createMockSession("student");
      mockSupabase._setSession(studentSession);
      mockSupabase._triggerAuthChange("SIGNED_IN", studentSession);

      // Verify navigation
      await waitFor(
        () => {
          expect(mockNavigate).toHaveBeenCalledWith("/dashboard/student");
        },
        { timeout: 3000 }
      );
    });

    it("should login as university and redirect to university dashboard", async () => {
      mockSupabase._setRole("university");

      render(
        <BrowserRouter>
          <AuthProvider>
            <LoginPage />
          </AuthProvider>
        </BrowserRouter>
      );

      // Submit login form
      fireEvent.change(screen.getByLabelText(/Email Address/i), {
        target: { value: "university@example.com" },
      });

      fireEvent.change(screen.getByLabelText(/Password/i), {
        target: { value: "password123" },
      });

      fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

      // Trigger auth change
      mockSupabase._triggerAuthChange(
        "SIGNED_IN",
        createMockSession("university")
      );
      mockSupabase._setSession(createMockSession("university"));

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith("/dashboard/university");
      });
    });

    it("should login as agent and redirect to agent dashboard", async () => {
      mockSupabase._setRole("agent");

      render(
        <BrowserRouter>
          <AuthProvider>
            <LoginPage />
          </AuthProvider>
        </BrowserRouter>
      );

      // Submit login form
      fireEvent.change(screen.getByLabelText(/Email Address/i), {
        target: { value: "agent@example.com" },
      });

      fireEvent.change(screen.getByLabelText(/Password/i), {
        target: { value: "password123" },
      });

      fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

      // Trigger auth change
      mockSupabase._triggerAuthChange("SIGNED_IN", createMockSession("agent"));
      mockSupabase._setSession(createMockSession("agent"));

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith("/dashboard/agent");
      });
    });
  });

  describe("Registration Flows", () => {
    it("should register a student account", async () => {
      mockSupabase._setRole("student");

      render(
        <BrowserRouter>
          <AuthProvider>
            <StudentRegistrationPage />
          </AuthProvider>
        </BrowserRouter>
      );

      // Fill and submit registration form
      fireEvent.change(screen.getByLabelText(/First Name/i), {
        target: { value: "Test" },
      });

      fireEvent.change(screen.getByLabelText(/Last Name/i), {
        target: { value: "Student" },
      });

      fireEvent.change(screen.getByLabelText(/Email/i), {
        target: { value: "student@example.com" },
      });

      fireEvent.change(screen.getByLabelText(/Password/i), {
        target: { value: "password123" },
      });

      fireEvent.click(screen.getByRole("button", { name: /Create Account/i }));

      // Verify correct role is set
      await waitFor(() => {
        expect(mockSupabase.auth.signUp).toHaveBeenCalledWith(
          expect.objectContaining({
            options: expect.objectContaining({
              data: expect.objectContaining({
                role: "student",
              }),
            }),
          })
        );
      });
    });

    // Similar tests for university and agent registration
  });

  describe("Sign Out", () => {
    it("should sign out the user", async () => {
      // Setup a simple component to test sign out
      const SignOutTest = () => {
        // Use the hook instead of accessing context directly
        const { signOut } = useAuth();
        return <button onClick={signOut}>Sign Out</button>;
      };

      mockSupabase._setSession(createMockSession("student"));

      render(
        <BrowserRouter>
          <AuthProvider>
            <SignOutTest />
          </AuthProvider>
        </BrowserRouter>
      );

      fireEvent.click(screen.getByText("Sign Out"));

      await waitFor(() => {
        expect(mockSupabase.auth.signOut).toHaveBeenCalled();
      });

      mockSupabase._setSession(null);
      mockSupabase._triggerAuthChange("SIGNED_OUT", null);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith("/");
      });
    });
  });
});
