import React from "react";
import { Link } from "react-router-dom";
import { FiUser, FiBookOpen, FiUsers } from "react-icons/fi";

const RegisterLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white font-orbitron">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Select your account type to get started
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-700">
          <div className="space-y-4">
            <Link
              to="/auth/register"
              state={{ role: "student" }}
              className="w-full flex items-center justify-between p-4 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center">
                <div className="bg-blue-600 p-3 rounded-full mr-4">
                  <FiUser className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Student</h3>
                  <p className="text-gray-400 text-sm">
                    Find and apply to programs
                  </p>
                </div>
              </div>
              <div className="text-blue-400">→</div>
            </Link>

            <Link
              to="/auth/register"
              state={{ role: "university" }}
              className="w-full flex items-center justify-between p-4 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center">
                <div className="bg-purple-600 p-3 rounded-full mr-4">
                  <FiBookOpen className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-white font-medium">University</h3>
                  <p className="text-gray-400 text-sm">
                    Manage programs and applications
                  </p>
                </div>
              </div>
              <div className="text-purple-400">→</div>
            </Link>

            <Link
              to="/auth/register"
              state={{ role: "agent" }}
              className="w-full flex items-center justify-between p-4 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center">
                <div className="bg-green-600 p-3 rounded-full mr-4">
                  <FiUsers className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Agent</h3>
                  <p className="text-gray-400 text-sm">
                    Recruit students and track applications
                  </p>
                </div>
              </div>
              <div className="text-green-400">→</div>
            </Link>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/auth/login"
                className="w-full flex justify-center py-2 px-4 border border-blue-500 rounded-md shadow-sm text-sm font-medium text-blue-400 bg-transparent hover:bg-blue-500/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLandingPage;
