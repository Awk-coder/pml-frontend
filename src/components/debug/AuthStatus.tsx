import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { nukeAuth } from '../../utils/authUtils';

const AuthStatus = () => {
  const [session, setSession] = useState<any>(null);
  const [storageKeys, setStorageKeys] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  
  const refreshStatus = async () => {
    // Get current session
    const { data } = await supabase.auth.getSession();
    setSession(data.session);
    
    // Get localStorage keys
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) keys.push(key);
    }
    setStorageKeys(keys);
  };
  
  useEffect(() => {
    refreshStatus();
    
    // Check status every few seconds
    const interval = setInterval(refreshStatus, 3000);
    return () => clearInterval(interval);
  }, []);
  
  const sessionStatus = session ? 
    `✅ LOGGED IN as ${session.user?.email || 'unknown'}` : 
    '❌ NOT LOGGED IN';
  
  const authItems = storageKeys.filter(k => 
    k.includes('supabase') || k.includes('sb-') || k.includes('auth')
  );
  
  return (
    <div className="fixed top-4 left-4 z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`${session ? 'bg-green-600' : 'bg-red-600'} text-white px-2 py-1 rounded-full text-xs`}
      >
        {session ? '🔒' : '🔓'}
      </button>
      
      {isOpen && (
        <div className="mt-2 bg-gray-900 border border-gray-700 p-3 rounded shadow-lg w-80">
          <div className="text-white text-sm font-bold mb-1">{sessionStatus}</div>
          
          {session && (
            <div className="text-xs text-gray-300 mb-2">
              ID: {session.user?.id.substring(0, 8)}...
              <br />
              Expires: {new Date(session.expires_at * 1000).toLocaleTimeString()}
            </div>
          )}
          
          <div className="text-xs text-gray-400 mt-2">
            Auth Items: {authItems.length}
            {authItems.length > 0 && (
              <ul className="mt-1 pl-2 text-gray-500">
                {authItems.map((key, i) => (
                  <li key={i} className="truncate">{key}</li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="flex justify-between mt-3">
            <button
              onClick={refreshStatus}
              className="text-xs bg-blue-600 text-white px-2 py-1 rounded"
            >
              Refresh
            </button>
            <button
              onClick={nukeAuth}
              className="text-xs bg-red-600 text-white px-2 py-1 rounded"
            >
              NUKE AUTH
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthStatus; 