import { supabase } from '../../lib/supabase';

describe('Debug Tests', () => {
  it('should have supabase mock available', () => {
    // Test if our mock is properly setup
    expect(supabase).toBeDefined();
    expect(supabase.auth).toBeDefined();
    expect(typeof supabase.auth.signIn).toBe('function');
  });

  it('should log environment info', () => {
    // Log test environment information to help troubleshoot
    console.log('Node version:', process.version);
    console.log('Test environment:', process.env.NODE_ENV);
    expect(true).toBe(true);
  });
}); 