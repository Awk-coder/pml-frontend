import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  getUserByEmail, 
  createUser, 
  initializeLocalStorage 
} from '../services/localStorageService';

// Define the AuthContextType with proper methods
export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: string) => Promise<User>;
  googleLogin: (token: string) => Promise<void>;
  logout: () => void;
  signup: (data: any) => Promise<void>; // This was likely missing or named differently
  register: (email: string, password: string, firstName: string, lastName: string, role: string) => Promise<User>;
  updateProfile: (data: any) => Promise<void>;
  error: string | null;
  updateUserRole: (role: string, googleToken?: string | null) => Promise<void>;
}

// Create the context with an initial undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Initialize local storage and check for existing session
  useEffect(() => {
    initializeLocalStorage();
    
    // Check if user is already logged in
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string, role: string): Promise<User> => {
    setError(null);
    setIsLoading(true);
    
    try {
      // In a real app, we would validate the password here
      // For this demo, we'll just check if the user exists and has the correct role
      const user = getUserByEmail(email);
      
      if (!user) {
        throw new Error('User not found');
      }
      
      if (user.role !== role) {
        throw new Error('Invalid role for this user');
      }
      
      // Store the user in local storage
      localStorage.setItem('currentUser', JSON.stringify(user));
      setUser(user);
      
      return user;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Google login
  const googleLogin = async (token: string) => {
    setError(null);
    try {
      setIsLoading(true);
      const data = await api.googleLogin(token);

      if (data && data.token) {
        localStorage.setItem("token", data.token);
        if (data.user && data.user.role) {
          localStorage.setItem("userRole", data.user.role);
        }
        setToken(data.token);
        setUser(data.user);
        navigate("/");
      } else {
        throw new Error("Invalid Google login response");
      }
    } catch (err: any) {
      console.error("Google login error:", err);
      setError(err.message || "Google login failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem('currentUser');
    setToken(null);
    setUser(null);
    navigate("/");
  };

  // Signup/Register function
  const signup = async (userData: any) => {
    setIsLoading(true);
    try {
      // Use the register method from our API service
      const data = await api.register(userData);

      // Save token to storage
      localStorage.setItem("token", data.token);
      api.setAuthToken(data.token);

      // Set user in state
      setUser(data.user);
      return data.user;
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Update profile function
  const updateProfile = async (profileData: any) => {
    try {
      const response = await api.put(`/users/${user?._id}`, profileData);
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error("Profile update failed", error);
      throw error;
    }
  };

  // Update user role function
  const updateUserRole = async (role: string, googleToken?: string | null) => {
    setError(null);
    try {
      setIsLoading(true);

      // If we have a googleToken, this is coming from the Google OAuth flow
      const endpoint = googleToken
        ? "/auth/google/role"
        : `/users/${user?._id}/role`;

      const payload = googleToken ? { role, token: googleToken } : { role };

      const response = await api.post(endpoint, payload);

      if (response.data && response.data.user) {
        setUser(response.data.user);

        // If this is from Google OAuth, also set the token
        if (googleToken && response.data.token) {
          localStorage.setItem("token", response.data.token);
          setToken(response.data.token);
        }
      } else {
        throw new Error("Invalid response when updating role");
      }
    } catch (err: any) {
      console.error("Update role error:", err);
      setError(err.message || "Failed to update role");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string, 
    role: string
  ): Promise<User> => {
    setIsLoading(true);
    
    try {
      // Check if user already exists
      const existingUser = getUserByEmail(email);
      if (existingUser) {
        throw new Error('User already exists');
      }
      
      // Create new user
      const newUser = createUser({
        email,
        firstName,
        lastName,
        role: role as 'student' | 'university' | 'agent' | 'admin',
      });
      
      // In a real app, we would hash the password and store it
      // For this demo, we'll just store the user
      
      return newUser;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Create the context value object with all the functions
  const contextValue: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user,
    isLoading,
    login,
    googleLogin,
    logout,
    signup,
    register,
    updateProfile,
    error,
    updateUserRole,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

// Also export useAuth as an alias for backward compatibility
export const useAuth = useAuthContext;

// Modify the ProtectedRoute component to allow access without authentication
export const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  requiredRole?: "student" | "university" | "admin";
}> = ({ children, requiredRole }) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  // For development purposes, we'll allow access to all routes
  return <>{children}</>;

  // In production, you would use this code instead:
  /*
  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth/login");
    } else if (!isLoading && user && requiredRole && user.role !== requiredRole) {
      navigate("/unauthorized");
    }
  }, [user, isLoading, navigate, requiredRole]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  if (requiredRole && user.role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
  */
};
