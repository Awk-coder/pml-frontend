import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

const TokenDebugger = () => {
  const [tokenInfo, setTokenInfo] = useState<any>(null);
  
  useEffect(() => {
    const checkTokens = async () => {
      // Get current session
      const { data: { session } } = await supabase.auth.getSession();
      
      // Check localStorage for all keys
      const storageKeys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        storageKeys.push(key);
      }
      
      // Check for indexedDB storage
      const hasIndexedDB = window.indexedDB !== undefined;
      
      // Get browser cookies
      const cookies = document.cookie.split(';').map(c => c.trim());
      
      // Check if session persistence is enabled in Supabase
      const persistenceEnabled = (supabase.auth.onAuthStateChange !== undefined);
      
      setTokenInfo({
        hasSession: !!session,
        sessionExpiry: session?.expires_at ? new Date(session.expires_at * 1000).toLocaleString() : 'N/A',
        localStorage: storageKeys,
        cookies,
        hasIndexedDB,
        persistenceEnabled
      });
    };
    
    checkTokens();
    
    // Also check every few seconds
    const interval = setInterval(checkTokens, 5000);
    return () => clearInterval(interval);
  }, []);
  
  if (!tokenInfo) return <div>Loading token info...</div>;
  
  return (
    <div className="fixed bottom-20 right-10 bg-gray-800/90 p-3 rounded-lg shadow-lg z-50 w-[300px] overflow-auto max-h-[60vh] text-xs">
      <h2 className="text-white font-bold mb-1">Auth Debug</h2>
      <div className="text-gray-300 space-y-1">
        <div>
          <strong>Session:</strong> {tokenInfo.hasSession ? '✅' : '❌'}
          {tokenInfo.hasSession && ` (expires: ${tokenInfo.sessionExpiry.split(' ')[1] || 'N/A'})`}
        </div>
        <div>
          <strong>localStorage:</strong> {tokenInfo.localStorage.length} keys
          <button 
            onClick={() => alert(tokenInfo.localStorage.join('\n'))}
            className="ml-1 text-blue-400 hover:underline"
          >
            Show
          </button>
        </div>
        <div>
          <strong>Cookies:</strong> {tokenInfo.cookies.length}
        </div>
        <div className="flex space-x-2 mt-1">
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-2 py-1 text-xs rounded"
          >
            Refresh
          </button>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="bg-red-600 text-white px-2 py-1 text-xs rounded"
          >
            Clear Storage
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenDebugger; 