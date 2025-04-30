// Mock Supabase client for tests
export const supabase = {
  auth: {
    signUp: jest.fn().mockResolvedValue({ 
      data: { user: { id: 'test-user-id' } }, 
      error: null 
    }),
    signInWithPassword: jest.fn().mockResolvedValue({
      data: { 
        session: { access_token: 'test-token' },
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
}; 