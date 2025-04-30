import { supabase } from "../lib/supabase";
import { UserProfile } from "../contexts/AuthContext";

export const ensureUserProfile = async (userId: string, email: string, role = "student") => {
  if (!userId) return null;
  
  try {
    // First try to get the profile
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
      
    if (error || !profile) {
      console.log("No profile found, creating one now");
      
      // Create profile if it doesn't exist
      const newProfile = {
        id: userId,
        email: email || "",
        role: role,
        first_name: "",
        last_name: "",
        created_at: new Date().toISOString()
      };
      
      const { error: insertError } = await supabase
        .from("profiles")
        .insert(newProfile);
        
      if (insertError) {
        console.error("Failed to create profile:", insertError);
        return null;
      }
      
      return newProfile as UserProfile;
    }
    
    return profile as UserProfile;
  } catch (err) {
    console.error("Error in ensureUserProfile:", err);
    return null;
  }
}; 