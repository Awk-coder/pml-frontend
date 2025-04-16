import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import SquaresBackground from "../../components/layout/SquaresBackground";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const GoogleCallback: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        // Get the code from URL
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');
        
        if (!code) {
          throw new Error('Authorization code not found in callback URL');
        }
        
        // Log the code length for debugging
        console.log(`Received code of length: ${code.length} characters`);
        
        // Use the code to login
        await loginWithGoogle(code);
        
        // Go to dashboard after successful login
        navigate('/dashboard');
      } catch (err: any) {
        console.error('Google callback error:', err);
        setError(err.message || 'Failed to authenticate with Google');
      }
    };
    
    handleGoogleCallback();
  }, [location, loginWithGoogle, navigate]);
  
  if (error) {
    return (
      <div className="min-h-screen bg-black">
        <div className="relative min-h-screen bg-black">
          <SquaresBackground 
            direction="diagonal"
            speed={0.3}
            squareSize={40}
            borderColor="rgba(255, 255, 255, 0.3)"
            hoverFillColor="#333"
            backgroundColor="#000000"
          />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-md p-8 bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl">
              <h2 className="text-2xl font-orbitron text-white mb-4">Authentication Error</h2>
              <p className="text-red-400 mb-6">{error}</p>
              <button 
                onClick={() => navigate('/auth/login')}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black">
      <div className="relative min-h-screen bg-black">
        <SquaresBackground 
          direction="diagonal"
          speed={0.3}
          squareSize={40}
          borderColor="rgba(255, 255, 255, 0.3)"
          hoverFillColor="#333"
          backgroundColor="#000000"
        />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <LoadingSpinner size="large" />
          <p className="text-white mt-4">Completing Google authentication...</p>
        </div>
      </div>
    </div>
  );
};

export default GoogleCallback;
