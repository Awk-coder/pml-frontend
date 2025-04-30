import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

const SignOutDebugger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const checkSession = async () => {
    addLog("Checking current session...");
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      addLog(`Found active session for: ${data.session.user.email}`);
    } else {
      addLog("No active session found");
    }
  };

  const forceSignOut = async () => {
    addLog("Starting force sign out...");
    
    try {
      // 1. Direct Supabase signOut
      const { error } = await supabase.auth.signOut();
      addLog(error ? `Supabase signOut error: ${error.message}` : "Supabase signOut successful");
      
      // 2. Clear storage
      localStorage.clear();
      sessionStorage.clear();
      addLog("Browser storage cleared");
      
      // 3. Clear cookies
      document.cookie.split(";").forEach(c => {
        const cookie = c.trim();
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      });
      addLog("Cookies cleared");
      
      // 4. Check if truly signed out
      const { data } = await supabase.auth.getSession();
      addLog(data.session ? "WARNING: Still have a session!" : "Confirmed: No active session");
      
    } catch (err) {
      addLog(`Error during force sign out: ${err}`);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 left-4 bg-red-600 text-white px-3 py-2 rounded-full z-50"
      >
        🔑
      </button>
      
      {isOpen && (
        <div className="fixed bottom-16 left-4 bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-4 w-80 z-50">
          <h3 className="text-white font-bold mb-2">Sign Out Debugger</h3>
          
          <div className="flex space-x-2 mb-4">
            <button 
              onClick={checkSession}
              className="bg-blue-600 text-white px-3 py-1 text-sm rounded"
            >
              Check Session
            </button>
            <button 
              onClick={forceSignOut}
              className="bg-red-600 text-white px-3 py-1 text-sm rounded"
            >
              Force Sign Out
            </button>
          </div>
          
          <div className="bg-gray-800 rounded p-2 h-40 overflow-y-auto text-xs">
            {logs.length === 0 ? (
              <p className="text-gray-500 italic">No logs yet. Use buttons above to debug.</p>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="text-gray-300 mb-1">{log}</div>
              ))
            )}
          </div>
          
          <div className="mt-3 flex justify-between">
            <button 
              onClick={() => setLogs([])}
              className="text-gray-400 text-xs hover:text-white"
            >
              Clear Logs
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 text-xs hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SignOutDebugger; 