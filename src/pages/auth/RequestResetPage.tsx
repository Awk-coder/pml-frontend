import React, { useState } from "react";
import { Link } from "react-router-dom";
import SquaresBackground from "../../components/layout/SquaresBackground";
import Navbar from "../../components/layout/Navbar";

const RequestResetPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      // TODO: Implement actual password reset request logic
      console.log("Password reset requested for:", email);
      setSuccess(true);
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Reset Your <span className="text-blue-400">Password</span>
            </h1>
            
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-center">
                {error}
              </div>
            )}

            {success ? (
              <div className="text-center">
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500 rounded-lg text-green-500">
                  Check your email for password reset instructions.
                </div>
                <p className="font-exo text-gray-300 mb-8">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="font-space text-lg bg-white text-black px-8 py-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <>
                <p className="font-exo text-gray-300 text-center mb-8">
                  Enter your email address and we'll send you instructions to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block font-space text-sm text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full font-space text-lg bg-blue-500 text-white px-6 py-3 rounded-lg transition-colors ${
                      isSubmitting ? 'bg-blue-700 cursor-not-allowed' : 'hover:bg-blue-600'
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </form>
              </>
            )}

            <div className="mt-8 text-center">
              <Link to="/auth/login" className="font-space text-sm text-blue-400 hover:text-blue-300">
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestResetPage; 