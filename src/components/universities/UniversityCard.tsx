import React from "react";
import { Link } from "react-router-dom";
import { FiMapPin, FiBookOpen } from "react-icons/fi";

interface UniversityProps {
  university: {
    id: string;
    name: string;
    location: string;
    country: string;
    logo: string;
    description: string;
    programCount: number;
    featured: boolean;
  };
}

const UniversityCard: React.FC<UniversityProps> = ({ university }) => {
  return (
    <div className={`bg-gray-900 rounded-xl overflow-hidden border border-gray-800 transition-all hover:border-blue-500 h-full flex flex-col ${
      university.featured ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-black' : ''
    }`}>
      <div className="p-6 flex items-center justify-center bg-black/30 h-40">
        <img 
          src={university.logo} 
          alt={`${university.name} logo`} 
          className="max-h-24 max-w-full object-contain"
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            const target = e.currentTarget;
            target.onerror = null;
            target.src = `https://via.placeholder.com/200x100?text=${university.name.split(' ')[0]}`;
          }}
        />
      </div>
      
      <div className="p-6 flex-grow">
        <h3 className="font-orbitron text-xl text-white mb-2">{university.name}</h3>
        
        <div className="flex items-center text-gray-400 text-sm mb-4">
          <FiMapPin className="mr-2" />
          <span>{university.location}, {university.country}</span>
        </div>
        
        <p className="text-gray-300 mb-6">{university.description}</p>
        
        <div className="flex items-center text-blue-400 text-sm">
          <FiBookOpen className="mr-2" />
          <span>{university.programCount} Programs Available</span>
        </div>
      </div>
      
      <div className="p-6 pt-0 mt-auto">
        <Link 
          to={`/universities/${university.id}`}
          className="block w-full py-3 text-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-space"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default UniversityCard; 