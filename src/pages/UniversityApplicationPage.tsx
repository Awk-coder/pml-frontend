import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUniversityById } from '../api/universities';
import ApplicationForm from '../components/university/ApplicationForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorAlert from '../components/common/ErrorAlert';

const UniversityApplicationPage = () => {
  const { universityId } = useParams<{ universityId: string }>();

  const { data: university, isLoading, error } = useQuery({
    queryKey: ['university', universityId],
    queryFn: () => getUniversityById(universityId!),
    enabled: !!universityId
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Failed to load university details" />;
  if (!university) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Application for {university.name}
          </h1>
          <p className="mt-2 text-gray-600">
            Please fill out all required information carefully
          </p>
        </div>

        <ApplicationForm university={university} />
      </div>
    </div>
  );
};

export default UniversityApplicationPage; 