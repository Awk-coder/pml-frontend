import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiTool } from "react-icons/fi";

const UnderDevelopmentPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8 flex justify-center">
          <div className="bg-blue-900/30 p-6 rounded-full">
            <FiTool className="text-blue-400 w-16 h-16 animate-pulse" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-orbitron">
          Under Development
        </h1>
        
        <div className="h-2 w-24 bg-blue-500 mx-auto mb-8"></div>
        
        <p className="text-xl text-gray-300 mb-8 font-exo">
          We're working hard to bring you this feature. Please check back soon!
        </p>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 transition-colors"
          >
            <FiArrowLeft className="mr-2" /> Return to Home
          </Link>
          
          <Link
            to="/programs"
            className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-blue-400 bg-transparent border border-blue-500 rounded-md hover:bg-blue-900/20 transition-colors"
          >
            Explore Programs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnderDevelopmentPage; 