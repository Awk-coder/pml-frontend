import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ErrorBoundary from "./components/error/ErrorBoundary";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import HomePage from "./pages/HomePage";
import ProgramsPage from "./pages/ProgramsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import RequestResetPage from "./pages/auth/RequestResetPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import GoogleCallback from "./pages/auth/GoogleCallback";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ApplyAsUniversity from "./pages/universities/ApplyAsUniversity";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import "./App.css";
import "./temp.css";
import Layout from "./components/layout/Layout";
import ProgramDetailsPage from "./pages/ProgramDetailsPage";
import ApplyPage from "./pages/apply/ApplyPage";
import AcademicBackgroundPage from "./pages/apply/AcademicBackgroundPage";
import { QueryProvider } from "./providers/QueryProvider";
import UniversityDashboard from "./pages/university/UniversityDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import AgentDashboard from "./pages/agent/AgentDashboard";
import UniversityLoginPage from "./pages/university/UniversityLoginPage";
import StudentLoginPage from "./pages/student/StudentLoginPage";
import AgentLoginPage from "./pages/agent/AgentLoginPage";
import StudentRegistrationPage from "./pages/auth/StudentRegistrationPage";
import UniversityRegistrationPage from "./pages/auth/UniversityRegistrationPage";
import AgentRegistrationPage from "./pages/auth/AgentRegistrationPage";
import RegistrationSuccessPage from "./pages/auth/RegistrationSuccessPage";
import RegisterLandingPage from "./pages/auth/RegisterLandingPage";
import StudentProfilePage from "./pages/student/StudentProfilePage";
import UniversityProfilePage from "./pages/university/UniversityProfilePage";
import AgentProfilePage from "./pages/agent/AgentProfilePage";
import ProgramDetail from "./pages/student/ProgramDetail";
import ApplicationDetail from "./pages/student/ApplicationDetail";
import ProgramDetailPage from "./pages/ProgramDetailPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleRoleSelectionPage from "./pages/auth/GoogleRoleSelectionPage";
import UniversitiesPage from "./pages/UniversitiesPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import StudentDashboardPage from "./pages/student/StudentDashboardPage";
import UniversityDashboardPage from "./pages/university/UniversityDashboardPage";
import AgentDashboardPage from "./pages/agent/AgentDashboardPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";

const App: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ""}>
      <ErrorBoundary>
        <QueryProvider>
          <AuthProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/programs" element={<ProgramsPage />} />
                <Route path="/programs/:id" element={<ProgramDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/register" element={<RegisterPage />} />
                <Route
                  path="/auth/reset-password"
                  element={<RequestResetPage />}
                />
                <Route
                  path="/auth/reset-password/:token"
                  element={<ResetPasswordPage />}
                />
                <Route
                  path="/auth/google/callback"
                  element={<GoogleCallback />}
                />

                {/* Protected Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute checkRole="admin">
                      <AdminDashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/universities/apply"
                  element={<ApplyAsUniversity />}
                />
                <Route path="/programs/:id" element={<ProgramDetailsPage />} />
                <Route path="/apply" element={<ApplyPage />} />
                <Route
                  path="/apply/academic-background"
                  element={<AcademicBackgroundPage />}
                />
                <Route
                  path="/university/login"
                  element={<Navigate to="/auth/login" />}
                />
                <Route
                  path="/university/dashboard"
                  element={
                    <ProtectedRoute checkRole="university">
                      <UniversityDashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/login"
                  element={<Navigate to="/auth/login" />}
                />
                <Route
                  path="/student/dashboard"
                  element={
                    <ProtectedRoute checkRole="student">
                      <StudentDashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/agent/login"
                  element={<Navigate to="/auth/login" />}
                />
                <Route
                  path="/agent/dashboard"
                  element={
                    <ProtectedRoute checkRole="agent">
                      <AgentDashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/auth/register/student"
                  element={<Navigate to="/auth/register" />}
                />
                <Route
                  path="/auth/register/university"
                  element={<Navigate to="/auth/register" />}
                />
                <Route
                  path="/auth/register/agent"
                  element={<Navigate to="/auth/register" />}
                />
                <Route
                  path="/auth/registration-success"
                  element={<RegistrationSuccessPage />}
                />
                <Route
                  path="/student/profile"
                  element={
                    <ProtectedRoute checkRole="student">
                      <StudentProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/university/profile"
                  element={
                    <ProtectedRoute checkRole="university">
                      <UniversityProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/agent/profile"
                  element={
                    <ProtectedRoute checkRole="agent">
                      <AgentProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/student/programs/:programId"
                  element={<ProgramDetail />}
                />
                <Route
                  path="/student/applications/:applicationId"
                  element={
                    <ProtectedRoute checkRole="student">
                      <ApplicationDetail />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/auth/select-role"
                  element={<GoogleRoleSelectionPage />}
                />
                <Route path="/universities" element={<UniversitiesPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
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
