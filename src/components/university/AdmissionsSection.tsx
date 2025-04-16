import React from 'react';

interface AdmissionsSectionProps {
  university: any;
}

const AdmissionsSection: React.FC<AdmissionsSectionProps> = ({ university }) => {
  return (
    <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900">Admissions Information</h3>
        
        <div className="mt-4 text-sm text-gray-500">
          <p className="mb-4">
            Interested in applying to {university.name}? Here's what you need to know about the admissions process.
          </p>
          
          <h4 className="font-medium text-gray-700 mt-4 mb-2">Application Requirements</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Completed application form</li>
            <li>Academic transcripts</li>
            <li>English proficiency test results (if applicable)</li>
            <li>Statement of purpose</li>
            <li>Letters of recommendation</li>
          </ul>
          
          <h4 className="font-medium text-gray-700 mt-4 mb-2">Application Process</h4>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Submit your application through our online portal</li>
            <li>Pay the application fee</li>
            <li>Upload all required documents</li>
            <li>Wait for application review (typically 2-4 weeks)</li>
            <li>If selected, you may be invited for an interview</li>
            <li>Receive admission decision</li>
          </ol>
          
          <div className="mt-6">
            <a 
              href={`/apply/${university._id}`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionsSection; 