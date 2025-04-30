import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiBookOpen, FiBriefcase } from "react-icons/fi";
import Logo from "../../components/common/Logo";
import SquaresBackground from "../../components/layout/SquaresBackground";

const RegisterLandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
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
        <div className="max-w-4xl w-full">
          <div className="text-center mb-10">
            <Logo linkTo="/" className="mx-auto mb-6" />
            <h1 className="font-orbitron text-3xl md:text-4xl text-white font-bold mb-4">
              Join PML Academy
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Select the account type that best describes you to get started
              with your personalized experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Student Option */}
            <div
              onClick={() => navigate("/register/student")}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition-all cursor-pointer group"
            >
              <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-blue-900/50 transition-all">
                <FiUser className="text-blue-400 text-2xl" />
              </div>
              <h3 className="text-xl text-white font-bold text-center mb-2">
                Student
              </h3>
              <p className="text-gray-400 text-center text-sm">
                Looking to study abroad or find educational opportunities
                worldwide.
              </p>
              <div className="mt-6 text-center">
                <span className="text-blue-500 font-medium">
                  Create Student Account
                </span>
              </div>
            </div>

            {/* University Option */}
            <div
              onClick={() => navigate("/register/university")}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition-all cursor-pointer group"
            >
              <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-blue-900/50 transition-all">
                <FiBookOpen className="text-blue-400 text-2xl" />
              </div>
              <h3 className="text-xl text-white font-bold text-center mb-2">
                University
              </h3>
              <p className="text-gray-400 text-center text-sm">
                Represent an educational institution looking to attract
                international students.
              </p>
              <div className="mt-6 text-center">
                <span className="text-blue-500 font-medium">
                  Create University Account
                </span>
              </div>
            </div>

            {/* Agent Option */}
            <div
              onClick={() => navigate("/register/agent")}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition-all cursor-pointer group"
            >
              <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-blue-900/50 transition-all">
                <FiBriefcase className="text-blue-400 text-2xl" />
              </div>
              <h3 className="text-xl text-white font-bold text-center mb-2">
                Agent
              </h3>
              <p className="text-gray-400 text-center text-sm">
                Connect students with educational opportunities and help
                institutions recruit.
              </p>
              <div className="mt-6 text-center">
                <span className="text-blue-500 font-medium">
                  Create Agent Account
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:text-blue-400">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLandingPage;
