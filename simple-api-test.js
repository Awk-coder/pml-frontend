import axios from 'axios';

const API_URL = 'http://localhost:5173/api';

async function testApi() {
  try {
    console.log('Testing API availability...');
    const response = await axios.get(`${API_URL}/auth/login`);
    console.log('Response:', response.status);
    console.log('API is available!');
  } catch (error) {
    if (error.response) {
      console.log('Got response with status:', error.response.status);
      console.log('API is available but returned an error');
    } else {
      console.error('API is not available:', error.message);
    }
  }
}

testApi(); 