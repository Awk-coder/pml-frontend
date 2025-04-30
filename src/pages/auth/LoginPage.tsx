import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import SquaresBackground from "../../components/layout/SquaresBackground";
import { FiUser, FiLock, FiArrowRight } from "react-icons/fi";
import AuthRedirect from "../../components/auth/AuthRedirect";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, isAuthenticated, profile } = useAuth();

  // Get return URL from query params
  const searchParams = new URLSearchParams(location.search);
  const returnUrl = searchParams.get("returnUrl") || "/";

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && profile) {
      // Redirect based on role
      if (profile.role === "student") {
        navigate("/dashboard/student");
      } else if (profile.role === "university") {
        navigate("/dashboard/university");
      } else if (profile.role === "agent") {
        navigate("/dashboard/agent");
      } else if (profile.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate(returnUrl);
      }
    }
  }, [isAuthenticated, profile, navigate, returnUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    console.log("Login attempt started");
    try {
      await signIn(email, password);
      // The auth state change and useEffect above will handle the redirect
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AuthRedirect />
      <div className="min-h-screen bg-black flex flex-col">
        {/* Background */}
        <div className="absolute inset-0">
          <SquaresBackground
            direction="diagonal"
            speed={0.5}
            className="opacity-30"
          />
        </div>

        {/* Content */}
        <div className="flex-grow flex items-center justify-center relative z-10 px-4 py-12">
          <div className="max-w-md w-full bg-gray-900 rounded-xl shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <Link to="/" className="inline-block">
                  <img
                    src="/logo.svg"
                    alt="PML Academy"
                    className="h-12 mx-auto mb-4"
                  />
                </Link>
                <h1 className="font-orbitron text-2xl text-white font-bold">
                  Sign In
                </h1>
                <p className="text-gray-400 mt-2">
                  Access your PML Academy account
                </p>
              </div>

              {error && (
                <div className="mb-6 bg-red-900/40 border border-red-800 text-red-100 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-400 mb-2"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500"
                        placeholder="Enter your email"
                      />
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-400"
                      >
                        Password
                      </label>
                      <Link
                        to="/reset-password"
                        className="text-sm text-blue-400 hover:text-blue-300"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500"
                        placeholder="Enter your password"
                      />
                      <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors ${
                      isLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? (
                      "Signing in..."
                    ) : (
                      <>
                        Sign In <FiArrowRight className="ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
