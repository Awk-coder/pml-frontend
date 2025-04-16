import React from 'react';
import { University } from '../../types';

interface Props {
  university: University;
}

const UniversityHero = ({ university }: Props) => {
  return (
    <div className="relative bg-blue-800">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src={university.coverImage || '/default-university-cover.jpg'}
          alt={university.name}
        />
        <div className="absolute inset-0 bg-blue-800 mix-blend-multiply" />
      </div>

      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-6">
          {/* University Logo */}
          <img
            className="h-24 w-24 rounded-full bg-white p-2"
            src={university.logo || '/default-university-logo.png'}
            alt={`${university.name} logo`}
          />
          
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {university.name}
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl">
              {university.location}, {university.country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityHero; 