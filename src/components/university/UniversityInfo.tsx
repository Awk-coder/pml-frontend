import React from 'react';
import { University } from '../../types';
import { 
  FiBookOpen, 
  FiGlobe, 
  FiPhone, 
  FiMail,
  FiMapPin
} from 'react-icons/fi';

interface Props {
  university: University;
}

const UniversityInfo: React.FC<Props> = ({ university }) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        {/* Logo and Basic Info */}
        <div className="flex items-center mb-6">
          <img
            className="h-16 w-16 rounded-full mr-4"
            src={university.logo || '/default-university-logo.jpg'}
            alt={university.name}
          />
          <div>
            <h3 className="text-lg font-medium text-gray-900">{university.name}</h3>
            <p className="text-sm text-gray-500">
              <FiMapPin className="inline mr-1" />
              {university.location}, {university.country}
            </p>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-medium text-gray-900">Contact Information</h4>
          <div className="mt-2 space-y-2">
            <div className="flex items-center text-sm text-gray-500">
              <FiGlobe className="mr-2 h-5 w-5 text-gray-400" />
              <a href={university.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                {university.website}
              </a>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <FiMail className="mr-2 h-5 w-5 text-gray-400" />
              <a href={`mailto:${university.contactEmail}`} className="text-blue-600 hover:text-blue-800">
                {university.contactEmail}
              </a>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <FiPhone className="mr-2 h-5 w-5 text-gray-400" />
              <a href={`tel:${university.contactPhone}`} className="text-blue-600 hover:text-blue-800">
                {university.contactPhone}
              </a>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-medium text-gray-900">Accreditation</h4>
          <p className="mt-2 text-sm text-gray-500">
            {university.accreditationNumber}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UniversityInfo; 