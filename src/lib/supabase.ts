// Mock Supabase client until the package is installed
// Replace this with the actual implementation after installing @supabase/supabase-js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables");
}

// Configure Supabase with balanced settings that allow login but don't make logout difficult
export const supabase = createClient(
  supabaseUrl || "",
  supabaseAnonKey || "",
  {
    auth: {
      autoRefreshToken: true, // Allow token refresh for normal operation
      persistSession: true,   // Keep session data between page loads for normal operation
      detectSessionInUrl: false // Don't detect session in URL to avoid potential issues
    }
  }
);

// Log when client is initialized
console.log("Supabase client initialized with URL:", supabaseUrl);
console.log("Supabase project reference:", supabaseUrl?.split('https://')[1]?.split('.')[0]); 