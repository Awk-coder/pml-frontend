import React from 'react';
import { Link } from 'react-router-dom';
import { FiClock, FiDollarSign, FiAward } from 'react-icons/fi';

interface ProgramCardProps {
  program: any;
  universityId: string;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program, universityId }) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <h3 className="text-lg font-medium text-gray-900 mb-2">{program.title}</h3>
        
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {program.description}
        </p>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <FiClock className="mr-1 text-blue-500" />
            <span>{program.duration}</span>
          </div>
          
          <div className="flex items-center">
            <FiAward className="mr-1 text-blue-500" />
            <span>{program.level}</span>
          </div>
          
          <div className="flex items-center">
            <FiDollarSign className="mr-1 text-blue-500" />
            <span>${program.tuitionFee.toLocaleString()}</span>
          </div>
        </div>
        
        <Link 
          to={`/programs/${program._id}`}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProgramCard; 