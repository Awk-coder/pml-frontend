import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get current file directory (ES modules don't have __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration - using the frontend URL with proxy
const FRONTEND_URL = "http://localhost:5173";
const API_URL = `${FRONTEND_URL}/api`;
const TEST_PASSWORD = "Test123!";
const TEST_EMAIL_DOMAIN = "test.com";
const LOG_FILE = path.join(__dirname, "auth-test-results.json");

// Store test accounts for cleanup
const testAccounts = [];

// Axios instance with error handling
const api = axios.create({
  baseURL: API_URL,
  validateStatus: (status) => status < 500, // Don't throw on 4xx errors
  timeout: 10000, // 10 second timeout
});

// Add request/response logging
api.interceptors.request.use((request) => {
  console.log(
    `🔄 Making ${request.method?.toUpperCase()} request to: ${request.baseURL}${
      request.url
    }`
  );
  if (request.data) {
    console.log("Request data:", JSON.stringify(request.data, null, 2));
  }
  return request;
});

api.interceptors.response.use(
  (response) => {
    console.log(
      `✓ Response from ${response.config.url}: Status ${response.status}`
    );
    if (response.data) {
      console.log("Response data:", JSON.stringify(response.data, null, 2));
    }
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(
        `✗ Error response from ${error.config.url}: Status ${error.response.status}`
      );
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      console.error(
        `✗ No response received for request to ${error.config.url}`
      );
      console.error(
        "This usually means the server is not running or the URL is incorrect"
      );
    } else {
      console.error(`✗ Error setting up request: ${error.message}`);
    }
    return Promise.reject(error);
  }
);

// Helper to generate unique test user data
const generateTestUser = (role) => {
  const uniqueId = uuidv4().substring(0, 8);
  const email = `test-${role}-${uniqueId}@${TEST_EMAIL_DOMAIN}`;

  // Adjust the user data structure based on your API requirements
  switch (role) {
    case "student":
      return {
        email,
        password: TEST_PASSWORD,
        confirmPassword: TEST_PASSWORD,
        firstName: "Test",
        lastName: "Student",
        role: "student",
        agreeToTerms: true,
      };
    case "university":
      return {
        email,
        password: TEST_PASSWORD,
        confirmPassword: TEST_PASSWORD,
        universityName: "Test University",
        location: "Test Location",
        accreditationNumber: `ACC-${uniqueId}`,
        website: `https://test-university-${uniqueId}.${TEST_EMAIL_DOMAIN}`,
        role: "university",
        agreeToTerms: true,
      };
    case "agent":
      return {
        email,
        password: TEST_PASSWORD,
        confirmPassword: TEST_PASSWORD,
        firstName: "Test",
        lastName: "Agent",
        agency: `Test Agency ${uniqueId}`,
        website: `https://test-agency-${uniqueId}.${TEST_EMAIL_DOMAIN}`,
        role: "agent",
        agreeToTerms: true,
      };
    default:
      return {
        email,
        password: TEST_PASSWORD,
        confirmPassword: TEST_PASSWORD,
        role,
        agreeToTerms: true,
      };
  }
};

// Test registration
const testRegistration = async (userData) => {
  console.log(
    `\n🔹 Testing ${userData.role} registration with email: ${userData.email}`
  );

  try {
    // Use the correct endpoint from your TypeScript implementation
    const endpoint = "/auth/register";

    console.log(`Using endpoint: ${endpoint}`);
    const response = await api.post(endpoint, userData);

    if (response.status === 201 || response.status === 200) {
      console.log(`✅ Registration successful for ${userData.role}`);
      testAccounts.push({
        ...userData,
        _id: response.data?.user?.id || response.data?.id,
        token: response.data?.token,
      });
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } else {
      console.error(
        `❌ Registration failed for ${userData.role}:`,
        response.data
      );
      return {
        success: false,
        error: response.data,
        status: response.status,
      };
    }
  } catch (error) {
    console.error(
      `❌ Error during ${userData.role} registration:`,
      error.message
    );
    return {
      success: false,
      error: error.message,
    };
  }
};

// Test login
const testLogin = async (email, password) => {
  console.log(`\n🔹 Testing login with email: ${email}`);

  try {
    const response = await api.post("/auth/login", { email, password });

    if (response.status === 200) {
      console.log(`✅ Login successful for ${email}`);
      // Update token in test accounts
      const account = testAccounts.find((acc) => acc.email === email);
      if (account) {
        account.token = response.data?.token;
      }
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } else {
      console.error(`❌ Login failed for ${email}:`, response.data);
      return {
        success: false,
        error: response.data,
        status: response.status,
      };
    }
  } catch (error) {
    console.error(`❌ Error during login for ${email}:`, error.message);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Test protected route access
const testProtectedRoute = async (token, role) => {
  console.log(`\n🔹 Testing protected route access for ${role}`);

  try {
    // Use the user/me endpoint to check authentication
    const endpoint = "/auth/me";

    const response = await api.get(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 200) {
      console.log(`✅ Protected route access successful for ${role}`);
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } else {
      console.error(
        `❌ Protected route access failed for ${role}:`,
        response.data
      );
      return {
        success: false,
        error: response.data,
        status: response.status,
      };
    }
  } catch (error) {
    console.error(
      `❌ Error accessing protected route for ${role}:`,
      error.message
    );
    return {
      success: false,
      error: error.message,
    };
  }
};

// Test Google OAuth flow (simulated)
const testGoogleOAuth = async () => {
  console.log(`\n🔹 Testing Google OAuth flow (simulated)`);

  // In a real test, we'd use a headless browser like Puppeteer to actually click the Google button
  // For this test, we'll simulate the callback with a mock token

  const mockGoogleToken = `mock-google-token-${uuidv4()}`;

  try {
    // Simulate the Google callback
    const response = await api.post("/auth/google", { code: mockGoogleToken });

    if (response.status === 200) {
      console.log(`✅ Google OAuth simulation successful`);

      testAccounts.push({
        email: response.data?.user?.email,
        _id: response.data?.user?.id,
        token: response.data?.token,
        role: response.data?.user?.role,
        isGoogleAuth: true,
      });

      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } else {
      console.error(`❌ Google OAuth simulation failed:`, response.data);
      return {
        success: false,
        error: response.data,
        status: response.status,
      };
    }
  } catch (error) {
    console.error(`❌ Error during Google OAuth simulation:`, error.message);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Clean up test accounts
const cleanupTestAccounts = async () => {
  console.log(`\n🧹 Cleaning up test accounts...`);

  try {
    // In a real implementation, you'd have an admin endpoint to delete test accounts
    // For this example, we'll just log the accounts that would be deleted

    console.log(`Would delete ${testAccounts.length} test accounts:`);
    testAccounts.forEach((account) => {
      console.log(`- ${account.email} (${account.role})`);
    });

    return {
      success: true,
      accountsToDelete: testAccounts.length,
    };
  } catch (error) {
    console.error(`❌ Error cleaning up test accounts:`, error.message);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Check if API is available
const checkApiAvailability = async () => {
  try {
    console.log(`🔍 Checking if API is available at ${API_URL}...`);
    const response = await axios.get(`${API_URL}/auth/login`);
    console.log(`✅ API is available (Status: ${response.status})`);
    return true;
  } catch (error) {
    if (error.response) {
      // Even a 404 means the server is running
      console.log(`✅ API is available (Status: ${error.response.status})`);
      return true;
    }
    console.error(
      "❌ API check failed. Make sure your backend server is running."
    );
    console.error("Error details:", error.message);
    return false;
  }
};

// Run all tests
const runAllTests = async () => {
  console.log("🚀 Starting authentication flow tests...");
  const startTime = Date.now();

  const results = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    apiUrl: API_URL,
    tests: {},
  };

  // Check if API is available before running tests
  const apiAvailable = await checkApiAvailability();
  if (!apiAvailable) {
    console.log("⚠️ Skipping tests because API is not available");
    process.exit(1);
  }

  // Test registration for each role
  const roles = ["student", "university", "agent"];
  for (const role of roles) {
    const userData = generateTestUser(role);
    results.tests[`${role}Registration`] = await testRegistration(userData);

    // If registration was successful, test login
    if (results.tests[`${role}Registration`].success) {
      results.tests[`${role}Login`] = await testLogin(
        userData.email,
        userData.password
      );

      // If login was successful, test protected route
      if (results.tests[`${role}Login`].success) {
        const token =
          results.tests[`${role}Login`].data.token ||
          results.tests[`${role}Login`].data.data?.token;
        results.tests[`${role}ProtectedRoute`] = await testProtectedRoute(
          token,
          role
        );
      }
    }
  }

  // Test Google OAuth flow
  results.tests.googleOAuth = await testGoogleOAuth();

  // Clean up test accounts
  results.tests.cleanup = await cleanupTestAccounts();

  // Calculate duration
  const endTime = Date.now();
  results.duration = `${((endTime - startTime) / 1000).toFixed(2)} seconds`;

  // Log summary
  console.log("\n📊 Test Summary:");
  let passedTests = 0;
  let totalTests = 0;

  Object.entries(results.tests).forEach(([testName, result]) => {
    totalTests++;
    if (result.success) {
      passedTests++;
      console.log(`✅ ${testName}: Passed`);
    } else {
      console.log(`❌ ${testName}: Failed`);
    }
  });

  console.log(
    `\n${passedTests}/${totalTests} tests passed (${Math.round(
      (passedTests / totalTests) * 100
    )}%)`
  );
  console.log(`Total time: ${results.duration}`);

  // Save results to file
  fs.writeFileSync(LOG_FILE, JSON.stringify(results, null, 2));
  console.log(`\nDetailed results saved to ${LOG_FILE}`);
};

// Run the tests
runAllTests().catch((error) => {
  console.error("Fatal error running tests:", error);
  process.exit(1);
});
