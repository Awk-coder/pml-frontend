import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "../lib/supabase";
import { User, Session } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import {
  getUserByEmail,
  createUser,
  initializeLocalStorage,
} from "../services/localStorageService";
import { signOutUser } from '../utils/authUtils';

// Define the shape of the user profile
export interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: "student" | "agent" | "university" | "admin";
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
  // Add other profile fields as needed
}

// Define the shape of the auth context
interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  signUp: (
    email: string,
    password: string,
    userData: Partial<UserProfile>
  ) => Promise<{ error: any | null }>;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signInWithGoogle: () => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
  loading: boolean;
  error: string | null;
  updateProfile: (data: Partial<UserProfile>) => Promise<{ error: any | null }>;
  debugLogout: () => Promise<void>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  profile: null,
  isAuthenticated: false,
  signUp: async () => ({ error: null }),
  signIn: async () => ({ error: null }),
  signInWithGoogle: async () => ({ error: null }),
  signOut: async () => {},
  loading: false,
  error: null,
  updateProfile: async () => ({ error: null }),
  debugLogout: async () => {},
});

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: ReactNode;
}

// Provider component that wraps your app and makes auth object available to any child component that calls useAuth()
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);

      try {
        // Get current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Error getting session:", sessionError);
          setLoading(false);
          return;
        }

        if (session) {
          console.log("Found session for user:", session.user.id);
          setSession(session);
          setUser(session.user);
          setIsAuthenticated(true);

          // Proper profile handling with retry and error handling
          let profileData = null;
          let profileError = null;

          // First attempt - standard fetch
          const profileResult = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();
          
          profileData = profileResult.data;
          profileError = profileResult.error;

          // If first attempt fails, try to create the profile
          if (profileError && !profileData) {
            console.log("Profile not found, creating one");
            
            // Check if it exists first using count
            const { count } = await supabase
              .from("profiles")
              .select("*", { count: 'exact', head: true })
              .eq("id", session.user.id);
            
            // Only insert if count is 0
            if (!count) {
              // Create basic profile with role from user metadata or default
              const role = session.user.user_metadata?.role || 'student';
              
              const { data: newProfile, error: insertError } = await supabase
                .from("profiles")
                .insert({
                  id: session.user.id,
                  email: session.user.email,
                  role: role,
                  first_name: '',
                  last_name: '',
                  created_at: new Date().toISOString()
                })
                .select()
                .single();
                
              if (!insertError && newProfile) {
                profileData = newProfile;
                profileError = null;
              } else {
                console.error("Failed to create profile:", insertError);
              }
            } else {
              console.warn("Profile exists but couldn't be fetched - RLS issue");
            }
          }

          // Set profile if we were able to get or create it
          if (profileData) {
            console.log("Profile set:", profileData);
            setProfile(profileData);
          } else {
            console.error("Unable to fetch or create profile");
          }
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Enhanced auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(`Auth state changed: ${event}`, { session });
      
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setSession(session);
        setUser(session?.user || null);
        setIsAuthenticated(!!session);
        
        if (session?.user) {
          try {
            // Try to fetch the profile
            const { data: profileData, error } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", session.user.id)
              .single();
            
            // If profile doesn't exist, create one
            if (error && error.code === 'PGRST116') { // PostgreSQL "not found" error
              console.log("No profile found for new user, creating one");
              
              // Create a default profile for the new user
              const newProfile = {
                id: session.user.id,
                email: session.user.email,
                role: 'student', // Default role
                first_name: '',
                last_name: '',
                created_at: new Date().toISOString()
              };
              
              // Insert the new profile
              const { data: createdProfile, error: createError } = await supabase
                .from("profiles")
                .insert(newProfile)
                .select()
                .single();
              
              if (createError) {
                console.error("Error creating profile:", createError);
                setLoading(false);
              } else {
                console.log("Created new profile for user");
                setProfile(createdProfile);
                setLoading(false);
              }
            } else if (profileData) {
              // Profile exists, use it
              setProfile(profileData);
              setLoading(false);
            } else {
              console.error("Unexpected profile fetch result:", { profileData, error });
              setLoading(false);
            }
          } catch (err) {
            console.error("Error in profile handling:", err);
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      } else if (event === 'SIGNED_OUT') {
        // Clear user state on sign out
        setUser(null);
        setProfile(null);
        setSession(null);
        setIsAuthenticated(false);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Add this to the end of your AuthProvider component (inside useEffect)
  useEffect(() => {
    // Safety timeout - never stay in loading state for more than 10 seconds
    const safetyTimeout = setTimeout(() => {
      if (loading) {
        console.warn("Safety timeout triggered - forcing loading state to false");
        setLoading(false);
      }
    }, 10000);
    
    return () => clearTimeout(safetyTimeout);
  }, [loading]);

  // Sign up function
  const signUp = async (
    email: string,
    password: string,
    userData: Partial<UserProfile>
  ) => {
    try {
      setLoading(true);
      
      // Minimal user data for auth signup
      const minimalUserData = {
        role: userData.role || "student"
      };
      
      console.log("AUTH DEBUG: Calling Supabase auth.signUp with minimal data");
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { 
          data: minimalUserData 
        }
      });
      
      if (error) {
        console.error("AUTH DEBUG: Signup error:", error);
        setError(error.message);
        setLoading(false);
        return { error };
      }
      
      // If successful, manually create the complete profile
      if (data?.user) {
        try {
          console.log("AUTH DEBUG: Creating profile with id:", data.user.id);
          const profileData = {
            id: data.user.id,
            email: email,
            role: userData.role || "student",
            first_name: userData.first_name || "",
            last_name: userData.last_name || "",
            country: userData.country || ""
          };
          
          console.log("AUTH DEBUG: Profile data:", profileData);
          
          const { error: profileError } = await supabase
            .from("profiles")
            .insert(profileData);
          
          if (profileError) {
            console.warn("AUTH DEBUG: Profile creation error:", profileError);
          } else {
            console.log("AUTH DEBUG: Profile created successfully");
            
            // Store the profile in state immediately
            setProfile(profileData as UserProfile);
          }
        } catch (err) {
          console.warn("AUTH DEBUG: Profile creation exception:", err);
        }
      }
      
      setLoading(false);
      return { error: null, data };
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      return { error: err };
    }
  };

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      console.log("AUTH DEBUG: Starting sign in process for", email);
      setLoading(true);
      
      console.log("AUTH DEBUG: Calling Supabase auth.signInWithPassword");
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      console.log("AUTH DEBUG: Sign in response:", data ? "Data received" : "No data", error ? `Error: ${error.message}` : "No error");
      
      if (error) {
        console.error("AUTH DEBUG: Sign in error:", error);
        setError(error.message);
        return { data, error };
      }
      
      // Check if we have a session
      if (data?.session) {
        console.log("AUTH DEBUG: Session found:", data.session);
        
        // Try to get the user's profile
        try {
          console.log("AUTH DEBUG: Fetching user profile");
          // Fetch user profile from profiles table
          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", data.user.id)
            .single();

          if (profileError) {
            console.error("AUTH DEBUG: Error fetching profile:", profileError);
          } else if (profileData) {
            setProfile(profileData as UserProfile);
          }
        } catch (profileError) {
          console.error("AUTH DEBUG: Error fetching profile:", profileError);
        }
      } else {
        console.warn("AUTH DEBUG: No session in response data");
      }
      
      return { data, error };
    } catch (err) {
      console.error("AUTH DEBUG: Unexpected error:", err);
      setError("An unexpected error occurred");
      return { error: err };
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: googleError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (googleError) {
        setError(googleError.message);
        setLoading(false);
        return { error: googleError };
      }

      setLoading(false);
      return { error: null };
    } catch (err) {
      setError("Failed to sign in with Google");
      setLoading(false);
      console.error("Google sign in error:", err);
      return { error: err };
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      await signOutUser();
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  // Update profile function
  const updateProfile = async (data: Partial<UserProfile>) => {
    try {
      setLoading(true);

      if (!user) {
        setError("User not authenticated");
        setLoading(false);
        return { error: "User not authenticated" };
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return { error: updateError };
      }

      // Refresh profile data
      const { data: updatedProfile, error: fetchError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (fetchError) {
        console.error("Error fetching updated profile:", fetchError);
      } else if (updatedProfile) {
        setProfile(updatedProfile as UserProfile);
      }

      setLoading(false);
      return { error: null };
    } catch (err) {
      setError("Failed to update profile");
      setLoading(false);
      console.error("Update profile error:", err);
      return { error: err };
    }
  };

  // Debug logout function
  const debugLogout = async () => {
    console.log("DEBUG LOGOUT");
    console.group("Auth State Before Logout");
    console.log("Session:", await supabase.auth.getSession());
    console.log("localStorage keys:", Object.keys(localStorage));
    console.groupEnd();
    
    await signOutUser();
  };

  // Auth context value
  const value = {
    session,
    user,
    profile,
    isAuthenticated,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    loading,
    error,
    updateProfile,
    debugLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Modify the ProtectedRoute component to allow access without authentication
export const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  requiredRole?: "student" | "university" | "admin";
}> = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
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
