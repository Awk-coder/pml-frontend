import { supabase } from '../lib/supabase';

/**
 * Comprehensive sign out function that properly terminates all Supabase sessions
 */
export const signOutUser = async () => {
  try {
    console.log("Starting sign out process");
    
    // Step 1: Use Supabase's official method with global scope
    await supabase.auth.signOut({ scope: 'global' });
    
    // Step 2: Remove any Supabase related items from storage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (
        key.includes('supabase') || 
        key.includes('sb-') ||
        key.includes('auth')
      )) {
        localStorage.removeItem(key);
      }
    }
    
    // Step 3: Clear general storage as well
    localStorage.clear();
    sessionStorage.clear();
    
    // Step 4: Force a reload to ensure a clean state
    window.location.href = "/";
    
    return true;
  } catch (err) {
    console.error("Error during sign out:", err);
    // Still reload even on error
    window.location.href = "/";
    return false;
  }
};

// For backward compatibility
export const completeSignOut = signOutUser; 