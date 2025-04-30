// Mock the supabase module
jest.mock('../lib/supabase', () => {
  return {
    supabase: {
      auth: {
        signUp: jest.fn().mockResolvedValue({ 
          data: { user: { id: 'test-user-id', email: 'test@example.com' } }, 
          error: null 
        }),
        signInWithPassword: jest.fn().mockResolvedValue({
          data: { 
            session: { 
              access_token: 'test-token',
              refresh_token: 'test-refresh-token',
              expires_at: new Date().getTime() + 3600,
              user: { id: 'test-user-id', email: 'test@example.com' }
            },
            user: { id: 'test-user-id', email: 'test@example.com' }
          },
          error: null
        }),
        signInWithOAuth: jest.fn().mockResolvedValue({
          data: { provider: 'google', url: 'http://auth-callback-url' },
          error: null
        }),
        signOut: jest.fn().mockResolvedValue({ error: null }),
        getSession: jest.fn().mockResolvedValue({ 
          data: { session: null }, 
          error: null 
        }),
        onAuthStateChange: jest.fn().mockReturnValue({ 
          data: { subscription: { unsubscribe: jest.fn() } } 
        })
      },
      from: jest.fn().mockReturnValue({
        insert: jest.fn().mockReturnValue({ 
          select: jest.fn().mockReturnValue({ error: null }) 
        }),
        update: jest.fn().mockReturnValue({ error: null }),
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ 
              data: { 
                id: 'profile-id',
                user_id: 'test-user-id',
                role: 'student',
                first_name: 'Test',
                last_name: 'User'
              }, 
              error: null 
            })
          })
        })
      })
    }
  };
});

// Mock env variables used by supabase
process.env.VITE_SUPABASE_URL = 'https://mock-supabase-url.supabase.co';
process.env.VITE_SUPABASE_ANON_KEY = 'mock-anon-key'; 