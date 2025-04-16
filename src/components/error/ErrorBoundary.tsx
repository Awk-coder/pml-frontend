import React, { Component, ErrorInfo, ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="container mx-auto px-6 py-24 text-center">
            <h1 className="font-orbitron text-4xl md:text-6xl font-bold mb-8">
              Something Went <span className="text-blue-400">Wrong</span>
            </h1>
            <p className="font-exo text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              We apologize for the inconvenience. An unexpected error has occurred.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="font-space text-lg bg-white text-black px-8 py-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Refresh Page
              </button>
              <Link
                to="/"
                className="font-space text-lg border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors"
              >
                Go Home
              </Link>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-12 p-6 bg-black/30 border border-red-500 rounded-xl text-left">
                <p className="font-mono text-red-400 mb-4">Error Details:</p>
                <pre className="font-mono text-sm text-gray-400 overflow-x-auto">
                  {this.state.error.toString()}
                </pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 