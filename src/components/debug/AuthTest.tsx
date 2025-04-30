import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const AuthTest = () => {
  const [status, setStatus] = useState('Loading...');
  
  useEffect(() => {
    checkAuth();
  }, []);
  
  const checkAuth = async () => {
    const { data } = await supabase.auth.getSession();
    setStatus(data.session ? 'Logged In' : 'Logged Out');
  };
  
  const clearAllStorage = () => {
    localStorage.clear();
    sessionStorage.clear();
    setStatus('Storage Cleared');
    setTimeout(checkAuth, 500);
  };
  
  const signOutSimple = async () => {
    setStatus('Signing Out...');
    await supabase.auth.signOut();
    setTimeout(checkAuth, 500);
  };
  
  const signOutGlobal = async () => {
    setStatus('Signing Out (Global)...');
    await supabase.auth.signOut({ scope: 'global' });
    setTimeout(checkAuth, 500);
  };
  
  const hardReset = async () => {
    await signOutGlobal();
    clearAllStorage();
    window.location.reload();
  };
  
  return (
    <div className="p-4 bg-gray-800 text-white m-4 rounded-lg">
      <h2 className="font-bold mb-2">Auth Test</h2>
      <div className="mb-2">Status: {status}</div>
      <div className="space-x-2">
        <button 
          onClick={checkAuth}
          className="bg-blue-600 px-2 py-1 text-xs rounded"
        >
          Check
        </button>
        <button 
          onClick={signOutSimple}
          className="bg-yellow-600 px-2 py-1 text-xs rounded"
        >
          Sign Out
        </button>
        <button 
          onClick={signOutGlobal}
          className="bg-red-600 px-2 py-1 text-xs rounded"
        >
          Sign Out Global
        </button>
        <button 
          onClick={clearAllStorage}
          className="bg-purple-600 px-2 py-1 text-xs rounded"
        >
          Clear Storage
        </button>
        <button 
          onClick={hardReset}
          className="bg-red-700 px-2 py-1 text-xs rounded"
        >
          HARD RESET
        </button>
      </div>
    </div>
  );
};

export default AuthTest; 