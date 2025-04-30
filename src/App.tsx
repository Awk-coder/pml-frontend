import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { QueryProvider } from "./providers/QueryProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ErrorBoundary from "./components/error/ErrorBoundary";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Layout from "./components/layout/Layout";
import AuthStateHandler from "./components/auth/AuthStateHandler";
import ProfileBypass from "./components/auth/ProfileBypass";

// Public pages
import HomePage from "./pages/HomePage";
import ProgramsPage from "./pages/ProgramsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import UniversitiesPage from "./pages/UniversitiesPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import NotFoundPage from "./pages/NotFoundPage";
import UnderDevelopmentPage from "./pages/UnderDevelopmentPage";

// Test auth pages
// import TestLoginPage from "./pages/auth/TestLoginPage";
// import TestRegisterLandingPage from "./pages/auth/TestRegisterLandingPage";

// Regular auth pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterLandingPage from "./pages/auth/RegisterLandingPage";
import StudentRegistrationPage from "./pages/auth/StudentRegistrationPage";
import UniversityRegistrationPage from "./pages/auth/UniversityRegistrationPage";
import AgentRegistrationPage from "./pages/auth/AgentRegistrationPage";
import RegistrationSuccessPage from "./pages/auth/RegistrationSuccessPage";
import RequestResetPage from "./pages/auth/RequestResetPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import GoogleCallback from "./pages/auth/GoogleCallback";
import GoogleRoleSelectionPage from "./pages/auth/GoogleRoleSelectionPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import AuthCallbackPage from "./pages/auth/AuthCallbackPage";

// Dashboard pages
import StudentDashboardPage from "./pages/student/StudentDashboardPage";
import AgentDashboardPage from "./pages/agent/AgentDashboardPage";
import UniversityDashboardPage from "./pages/university/UniversityDashboardPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";

const App: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ErrorBoundary>
        <QueryProvider>
          <AuthProvider>
            <AuthStateHandler />
            <ProfileBypass />
            <Layout>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/programs" element={<ProgramsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/universities" element={<UniversitiesPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route
                  path="/under-development"
                  element={<UnderDevelopmentPage />}
                />

                {/* Test Auth routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/register/landing"
                  element={<RegisterLandingPage />}
                />

                {/* Registration routes */}
                <Route path="/register" element={<RegisterLandingPage />} />
                <Route
                  path="/register/student"
                  element={<StudentRegistrationPage />}
                />
                <Route
                  path="/register/university"
                  element={<UniversityRegistrationPage />}
                />
                <Route
                  path="/register/agent"
                  element={<AgentRegistrationPage />}
                />
                <Route
                  path="/registration-success"
                  element={<RegistrationSuccessPage />}
                />

                {/* Password reset routes */}
                <Route
                  path="/auth/reset-password"
                  element={<RequestResetPage />}
                />
                <Route
                  path="/auth/reset-password/:token"
                  element={<ResetPasswordPage />}
                />
                <Route
                  path="/forgot-password"
                  element={<ForgotPasswordPage />}
                />

                {/* OAuth callback routes */}
                <Route
                  path="/auth/google/callback"
                  element={<GoogleCallback />}
                />
                <Route
                  path="/auth/select-role"
                  element={<GoogleRoleSelectionPage />}
                />
                <Route path="/auth/callback" element={<AuthCallbackPage />} />

                {/* Student dashboard routes */}
                <Route
                  path="/dashboard/student"
                  element={
                    <ProtectedRoute requiredRole="student">
                      <StudentDashboardPage />
                    </ProtectedRoute>
                  }
                />

                {/* University dashboard routes */}
                <Route
                  path="/dashboard/university"
                  element={
                    <ProtectedRoute requiredRole="university">
                      <UniversityDashboardPage />
                    </ProtectedRoute>
                  }
                />

                {/* Agent dashboard routes */}
                <Route
                  path="/dashboard/agent"
                  element={
                    <ProtectedRoute requiredRole="agent">
                      <AgentDashboardPage />
                    </ProtectedRoute>
                  }
                />

                {/* Admin dashboard routes */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminDashboardPage />
                    </ProtectedRoute>
                  }
                />

                {/* Debug route */}
                <Route
                  path="/debug"
                  element={
                    <div className="min-h-screen bg-red-900 flex items-center justify-center">
                      <h1 className="text-white text-4xl">
                        Debug Route Works!
                      </h1>
                    </div>
                  }
                />

                {/* Special debug route */}
                <Route
                  path="/special-debug-123456789"
                  element={
                    <div className="min-h-screen bg-green-900 flex items-center justify-center">
                      <h1 className="text-white text-4xl">
                        Special Debug Route Works!
                      </h1>
                    </div>
                  }
                />

                {/* Fallback routes */}
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Layout>
          </AuthProvider>
        </QueryProvider>
      </ErrorBoundary>
    </GoogleOAuthProvider>
  );
};

export default App;
