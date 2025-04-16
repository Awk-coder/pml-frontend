import React from "react";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = "medium" }) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-12 h-12",
    large: "w-16 h-16"
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default LoadingSpinner; 