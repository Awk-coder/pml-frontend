import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Layout from '../../components/layout/Layout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { FiUser, FiBook, FiBriefcase, FiAlertCircle } from 'react-icons/fi';

type UserRole = 'student' | 'university' | 'agent';

const GoogleRoleSelectionPage: React.FC = () => {
  const { user, updateUserRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Get the token from the URL if it exists (for direct navigation from Google callback)
  const googleToken = new URLSearchParams(location.search).get('token');
  
  useEffect(() => {
    // If user already has a role, redirect them to their dashboard
    if (user?.role && user.role !== 'pending') {
      redirectBasedOnRole(user.role);
    }
  }, [user]);
  
  const redirectBasedOnRole = (role: string) => {
    switch (role) {
      case 'student':
        navigate('/student/dashboard');
        break;
      case 'university':
        navigate('/university/dashboard');
        break;
      case 'agent':
        navigate('/agent/dashboard');
        break;
      default:
        navigate('/');
    }
  };
  
  const handleRoleSelection = async () => {
    if (!selectedRole) {
      setError('Please select a role to continue');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Update the user's role in the backend
      await updateUserRole(selectedRole, googleToken);
      
      // Redirect based on the selected role
      redirectBasedOnRole(selectedRole);
    } catch (err: any) {
      console.error('Role selection error:', err);
      setError(err.message || 'Failed to update role. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const roleOptions = [
    {
      id: 'student',
      title: 'Student',
      description: 'I want to apply to educational programs',
      icon: <FiUser className="w-8 h-8" />
    },
    {
      id: 'university',
      title: 'University',
      description: 'I represent an educational institution',
      icon: <FiBook className="w-8 h-8" />
    },
    {
      id: 'agent',
      title: 'Agent',
      description: 'I help students find educational opportunities',
      icon: <FiBriefcase className="w-8 h-8" />
    }
  ];
  
  return (
    <Layout>
      <div className="min-h-screen bg-gray-900 pt-20">
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="bg-gray-800 rounded-xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome!</h1>
            <p className="text-gray-300 mb-8">
              Thanks for signing in with Google. Please select your role to continue.
            </p>
            
            {error && (
              <div className="mb-6 p-4 bg-red-900/30 border border-red-800 rounded-lg text-red-300 flex items-center">
                <FiAlertCircle className="text-red-400 mr-2" size={20} />
                <span>{error}</span>
              </div>
            )}
            
            <div className="space-y-4 mb-8">
              {roleOptions.map((role) => (
                <div
                  key={role.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedRole === role.id
                      ? 'border-blue-500 bg-blue-900/20'
                      : 'border-gray-700 bg-gray-700/30 hover:bg-gray-700/50'
                  }`}
                  onClick={() => setSelectedRole(role.id as UserRole)}
                >
                  <div className="flex items-center">
                    <div className={`mr-4 text-${selectedRole === role.id ? 'blue-400' : 'gray-400'}`}>
                      {role.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-lg">{role.title}</h3>
                      <p className="text-gray-400">{role.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={handleRoleSelection}
              disabled={!selectedRole || isSubmitting}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${
                !selectedRole || isSubmitting
                  ? 'bg-blue-800/50 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <LoadingSpinner size="small" />
                  <span className="ml-2">Processing...</span>
                </span>
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GoogleRoleSelectionPage; 