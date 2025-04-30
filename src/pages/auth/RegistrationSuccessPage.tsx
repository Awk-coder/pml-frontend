import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SquaresBackground from "../../components/layout/SquaresBackground";
import { FiCheck, FiClock, FiMail, FiArrowRight } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthContext";

const RegistrationSuccessPage: React.FC = () => {
  const { isAuthenticated, profile } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "student";
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (isAuthenticated && profile) {
      navigate(`/dashboard/${profile.role}`);
    }
  }, [isAuthenticated, profile, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Navigate to login page based on role
          navigate("/login");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, role]);

  // Role-specific content
  const getRoleContent = () => {
    switch (role) {
      case "university":
        return {
          title: "University Application Submitted",
          message:
            "Your university partnership application has been successfully submitted for review.",
          details:
            "Our team will carefully review your application and verify the provided information. This process typically takes 2-3 business days.",
          nextStep:
            "Once approved, you will receive an email with login credentials and instructions for setting up your university profile.",
        };

      case "agent":
        return {
          title: "Agent Application Submitted",
          message:
            "Your agent application has been successfully submitted for review.",
          details:
            "Our team will review your recruitment experience and verify your details. This process typically takes 1-2 business days.",
          nextStep:
            "Once approved, you'll receive an email with login details and information about commission rates and partnership terms.",
        };

      case "student":
      default:
        return {
          title: "Registration Successful",
          message: "Your student account has been successfully created.",
          details:
            "You can now log in and start exploring programs from universities around the world.",
          nextStep:
            "Complete your profile and preferences to receive personalized program recommendations.",
        };
    }
  };

  const content = getRoleContent();

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
          <div className="w-full max-w-xl p-8 bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl">
            <div className="flex flex-col items-center mb-8">
              <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                <FiCheck className="text-green-400 text-4xl" />
              </div>

              <h1 className="text-3xl font-orbitron text-white text-center">
                {content.title}
              </h1>
            </div>

            <p className="text-gray-300 text-center mb-6">{content.message}</p>

            <div className="space-y-6">
              {role !== "student" && (
                <div className="bg-blue-900/30 border border-blue-800 rounded-lg p-4">
                  <div className="flex items-start">
                    <FiClock className="text-blue-400 mt-1 mr-3" />
                    <p className="text-gray-300 text-sm">{content.details}</p>
                  </div>
                </div>
              )}

              <div className="bg-purple-900/30 border border-purple-800 rounded-lg p-4">
                <div className="flex items-start">
                  <FiMail className="text-purple-400 mt-1 mr-3" />
                  <p className="text-gray-300 text-sm">{content.nextStep}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center">
              {role === "student" ? (
                <button
                  onClick={() => navigate("/login")}
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Continue to Login
                  <FiArrowRight className="ml-2" />
                </button>
              ) : (
                <div>
                  <p className="text-gray-400 text-center mb-2">
                    Redirecting to login page in {countdown} seconds...
                  </p>
                  <button
                    onClick={() => navigate("/login")}
                    className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
                  >
                    Login Now
                    <FiArrowRight className="ml-2" />
                  </button>
                </div>
              )}
            </div>

            <div className="text-center mt-8">
              <a href="/" className="text-blue-400 hover:underline">
                Return to Home Page
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccessPage;
