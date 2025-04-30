import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

const ProfileBypass = () => {
  const { isAuthenticated, user, setProfile, profile, loading } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const bypassProfileIssues = async () => {
      if (!isAuthenticated || !user) {
        setIsLoading(false);
        return;
      }

      try {
        console.log("ProfileBypass: Using direct SQL query to get profile");
        
        // Try using a stored function to bypass RLS
        const { data, error } = await supabase.rpc('get_profile_for_user', {
          user_id: user.id
        });
        
        if (error) {
          console.error("First attempt failed:", error);
          // Fall back to an emergency default profile
          setProfile({
            id: user.id,
            email: user.email || '',
            role: 'student', // Default role
            first_name: '',
            last_name: '',
            created_at: new Date().toISOString()
          });
          
          navigate('/dashboard/student');
          return;
        }
        
        if (data) {
          console.log("Found profile via RPC:", data);
          setProfile(data);
          navigate(`/dashboard/${data.role}`);
        }
      } catch (err) {
        console.error("ProfileBypass error:", err);
        setError("Error accessing your profile. Using default profile.");
        
        // Emergency fallback
        setProfile({
          id: user.id,
          email: user.email || '',
          role: 'student',
          first_name: '',
          last_name: '',
          created_at: new Date().toISOString()
        });
        
        navigate('/dashboard/student');
      } finally {
        setIsLoading(false);
      }
    };

    bypassProfileIssues();
  }, [isAuthenticated, user, navigate, setProfile]);

  useEffect(() => {
    if (isAuthenticated && !profile && !loading) {
      console.log("Creating temporary profile");
      // Your profile creation logic
      // ...
    }
  }, [isAuthenticated, profile, loading]);

  if (!isAuthenticated) return null;
  
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-xl font-bold text-white mb-4">Loading Your Profile</h2>
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-xl font-bold text-white mb-4">Profile Issue Detected</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <p className="text-gray-300 mb-4">We're using a default profile to help you access the app.</p>
          <button 
            onClick={() => navigate('/dashboard/student')}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Continue to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default ProfileBypass; 