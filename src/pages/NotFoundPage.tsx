import React from "react";
import { Link } from "react-router-dom";
import SquaresBackground from "../components/layout/SquaresBackground";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Squares Background */}
      <div className="absolute inset-0">
        <SquaresBackground
          direction="diagonal"
          speed={0.3}
          squareSize={40}
          borderColor="rgba(255, 255, 255, 0.3)"
          hoverFillColor="#333"
          backgroundColor="#000000"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-4">
        <h1 className="font-orbitron text-9xl font-bold text-white mb-4 flex items-center gap-4">
          4
          <span className="text-blue-400">0</span>
          4
        </h1>
        
        <p className="font-exo text-xl text-gray-300 mb-8 text-center">
          Oops! The page you're looking for doesn't exist.
        </p>

        <div className="flex gap-4">
          <Link
            to="/"
            className="font-space bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Go Home
          </Link>
          <Link
            to="/contact"
            className="font-space border border-white text-white px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage; 