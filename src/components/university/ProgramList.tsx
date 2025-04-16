import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProgramsByUniversity } from '../../api/programs';
import ProgramCard from './ProgramCard';
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorAlert from "../common/ErrorAlert";

interface Props {
  universityId: string;
}

const ProgramList = ({ universityId }: Props) => {
  const { data: programs, isLoading, error } = useQuery({
    queryKey: ['programs', universityId],
    queryFn: () => getProgramsByUniversity(universityId)
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Failed to load programs" />;
  if (!programs?.length) return <p>No programs available at this time.</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Available Programs
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {programs.map((program) => (
          <ProgramCard 
            key={program._id} 
            program={program}
            universityId={universityId}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgramList; 