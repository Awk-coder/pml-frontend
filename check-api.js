import axios from 'axios';

const checkEndpoints = async () => {
  const baseUrl = 'http://localhost:5173'; // Your frontend URL
  const endpoints = [
    '/',                          // Root - should return your frontend
    '/api',                       // API root
    '/api/auth/login',            // Login endpoint
    '/api/auth/register',         // Register endpoint
    '/api/auth/register/student', // Student registration
    '/api/programs',              // Programs endpoint
    '/api/universities'           // Universities endpoint
  ];
  
  console.log('🔍 Checking API endpoints...');
  
  for (const endpoint of endpoints) {
    try {
      const response = await axios.get(`${baseUrl}${endpoint}`);
      console.log(`✅ ${endpoint}: Status ${response.status}`);
    } catch (error) {
      if (error.response) {
        console.log(`❌ ${endpoint}: Status ${error.response.status}`);
      } else {
        console.log(`❌ ${endpoint}: ${error.message}`);
      }
    }
  }
  
  // Also check if we can access the backend directly
  try {
    const backendUrl = 'http://localhost:5000'; // Typical backend URL
    const response = await axios.get(backendUrl);
    console.log(`✅ Backend (${backendUrl}): Status ${response.status}`);
  } catch (error) {
    if (error.response) {
      console.log(`❌ Backend: Status ${error.response.status}`);
    } else {
      console.log(`❌ Backend: ${error.message}`);
    }
  }
};

checkEndpoints().catch(console.error); 