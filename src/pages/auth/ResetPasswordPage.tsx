import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SquaresBackground from "../../components/layout/SquaresBackground";
import Navbar from "../../components/layout/Navbar";

const ResetPasswordPage: React.FC = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [tokenValid, setTokenValid] = useState(true);

  useEffect(() => {
    // TODO: Verify token validity
    const verifyToken = async () => {
      try {
        // Simulate token verification
        if (!token) {
          setTokenValid(false);
          setError("Invalid or expired reset link");
        }
      } catch (err) {
        setTokenValid(false);
        setError("Invalid or expired reset link");
      }
    };

    verifyToken();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setIsSubmitting(true);
    setError("");

    try {
      // TODO: Implement actual password reset logic
      console.log("Password reset:", { token, password: formData.password });
      navigate("/auth/login", { state: { message: "Password reset successful. Please sign in." } });
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!tokenValid) {
    return (
      <div style={{ backgroundColor: "black", color: "white", minHeight: "100vh" }}>
        <Navbar />
        <div className="relative min-h-[80vh] bg-black overflow-hidden w-full">
          <SquaresBackground
            direction="diagonal"
            speed={0.3}
            squareSize={40}
            borderColor="rgba(255, 255, 255, 0.3)"
            hoverFillColor="#333"
            backgroundColor="#000000"
          />
          
          <div className="container mx-auto px-6 relative z-20 flex flex-col items-center justify-center min-h-[80vh]">
            <div className="text-center">
              <h1 className="font-orbitron text-4xl font-bold mb-8">
                Invalid <span className="text-blue-400">Link</span>
              </h1>
              <p className="font-exo text-gray-300 mb-8">
                This password reset link is invalid or has expired.
              </p>
              <Link
                to="/auth/reset-password"
                className="font-space text-lg bg-white text-black px-8 py-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Request New Link
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "black", color: "white", minHeight: "100vh" }}>
      <Navbar />
      <div className="relative min-h-[80vh] bg-black overflow-hidden w-full">
        <SquaresBackground
          direction="diagonal"
          speed={0.3}
          squareSize={40}
          borderColor="rgba(255, 255, 255, 0.3)"
          hoverFillColor="#333"
          backgroundColor="#000000"
        />
        
        <div className="container mx-auto px-6 relative z-20 flex flex-col items-center justify-center min-h-[80vh]">
          <div className="w-full max-w-md">
            <h1 className="font-orbitron text-4xl font-bold text-center mb-8">
              Set New <span className="text-blue-400">Password</span>
            </h1>
            
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="password" className="block font-space text-sm text-gray-300 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block font-space text-sm text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Confirm new password"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-space text-lg bg-blue-500 text-white px-6 py-3 rounded-lg transition-colors ${
                  isSubmitting ? 'bg-blue-700 cursor-not-allowed' : 'hover:bg-blue-600'
                }`}
              >
                {isSubmitting ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage; 