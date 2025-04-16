import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface Program {
  id: string;
  title: string;
  university: string;
  category: string;
  image: string;
}

interface RecommendedProgramsProps {
  programs: Program[];
}

const RecommendedPrograms: React.FC<RecommendedProgramsProps> = ({ programs }) => {
  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-orbitron text-xl text-white">Recommended For You</h3>
        <Link to="/programs" className="text-sm text-blue-400 hover:text-blue-300">
          Browse All
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {programs.map((program, index) => (
          <motion.div
            key={program.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/20 border border-gray-800 rounded-lg overflow-hidden flex flex-col"
          >
            <div className="h-32 bg-gray-800 relative">
              <img
                src={program.image}
                alt={program.title}
                className="w-full h-full object-cover"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  const target = e.currentTarget;
                  target.onerror = null;
                  target.src = `https://source.unsplash.com/400x200/?university,education&sig=${program.id}`;
                }}
              />
              <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs py-1 px-2 rounded">
                {program.category}
              </div>
            </div>
            <div className="p-4 flex-grow">
              <h4 className="font-orbitron text-white mb-1">{program.title}</h4>
              <p className="text-gray-400 text-sm mb-4">{program.university}</p>
              <Link
                to={`/programs/${program.id}`}
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedPrograms; 