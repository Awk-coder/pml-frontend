import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

interface ErrorAlertProps {
  message: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <FiAlertCircle className="h-5 w-5 text-red-500" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">
            {message || 'An error occurred. Please try again.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorAlert; 