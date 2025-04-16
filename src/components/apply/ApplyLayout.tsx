import React from "react";
import Navbar from "../layout/Navbar";
import { motion } from "framer-motion";

interface ApplyLayoutProps {
  children: React.ReactNode;
  step: number;
  title: string;
}

const ApplyLayout: React.FC<ApplyLayoutProps> = ({ children, step, title }) => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed top-0 w-full z-50">
        <Navbar />
      </div>

      {/* Progress Bar */}
      <div className="fixed top-[72px] w-full bg-gray-900 border-b border-gray-800 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-center gap-2 text-sm font-space">
            <span className="text-blue-400">Step {step}</span>
            <span className="text-gray-400">{title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="pt-[144px] min-h-screen"
      >
        <div className="container mx-auto px-6 py-12 flex flex-col items-center">
          <h1 className="font-orbitron text-4xl mb-8 text-center">Program Application</h1>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default ApplyLayout; 