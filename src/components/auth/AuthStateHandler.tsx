import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ensureUserProfile } from '../../services/profileService';

const AuthStateHandler = () => {
  const { isAuthenticated, profile, setProfile, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // First ensure profile exists if we have a user but no profile
  useEffect(() => {
    const checkAndCreateProfile = async () => {
      if (isAuthenticated && user && !profile && !loading) {
        console.log("User authenticated but no profile found, creating one...");
        const createdProfile = await ensureUserProfile(
          user.id, 
          user.email || "", 
          user.user_metadata?.role || "student"
        );
        
        if (createdProfile) {
          setProfile(createdProfile);
        }
      }
    };
    
    checkAndCreateProfile();
  }, [isAuthenticated, user, profile, loading]);

  // Handle navigation based on authentication state
  useEffect(() => {
    // Only redirect if we have confirmed authentication and profile
    if (!loading && isAuthenticated && user && profile) {
      console.log("Auth state handler: User authenticated", profile.role);
      
      // Don't redirect if already on dashboard or specific auth pages
      const currentPath = location.pathname;
      if (!currentPath.includes('/dashboard') && 
          !currentPath.includes('/auth/callback') && 
          !currentPath.includes('/logout')) {
        
        const dashboardPath = `/dashboard/${profile.role}`;
        console.log(`Redirecting to ${dashboardPath}`);
        navigate(dashboardPath, { replace: true });
      }
    }
  }, [isAuthenticated, profile, loading, navigate, location.pathname, user]);

  return null;
};

export default AuthStateHandler; 