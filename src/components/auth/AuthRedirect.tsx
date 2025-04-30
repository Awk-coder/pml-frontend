import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AuthRedirect = () => {
  const { isAuthenticated, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAuthenticated && profile) {
      navigate(`/dashboard/${profile.role}`);
    }
  }, [isAuthenticated, profile, loading, navigate]);

  return null; // This component doesn't render anything
};

export default AuthRedirect; 