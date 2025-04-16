import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import SquaresBackground from "../../components/layout/SquaresBackground";

const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      if (user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        setError("Access denied. Admin privileges required.");
        await logout();
      }
    } catch (err) {
      setError(typeof err === "string" ? err : "Failed to log in");
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="relative min-h-screen bg-black">
        <SquaresBackground
          direction="diagonal"
          speed={0.3}
          squareSize={40}
          borderColor="rgba(255, 255, 255, 0.3)"
          hoverFillColor="#333"
          backgroundColor="#000000"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-md p-8 bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl">
            <h1 className="text-3xl font-orbitron text-white mb-8">
              Admin Login
            </h1>

            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-space text-sm text-gray-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  required
                />
              </div>

              <div>
                <label className="block font-space text-sm text-gray-400 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-space py-3 px-6 rounded-lg transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
