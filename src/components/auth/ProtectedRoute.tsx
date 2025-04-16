import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import LoadingSpinner from "../common/LoadingSpinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  checkRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  checkRole,
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (checkRole && user?.role !== checkRole) {
    // Redirect to appropriate dashboard if role doesn't match
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user?.role === "university") {
      return <Navigate to="/university/dashboard" replace />;
    } else if (user?.role === "student") {
      return <Navigate to="/student/dashboard" replace />;
    } else if (user?.role === "agent") {
      return <Navigate to="/agent/dashboard" replace />;
    }
    
    // Fallback to home page if role doesn't match any known role
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
