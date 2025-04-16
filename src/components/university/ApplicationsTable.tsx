import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { FiEye, FiCheck, FiX } from 'react-icons/fi';
import { api } from '../../services/api';

interface Application {
  id: string;
  studentName: string;
  program: string;
  submissionDate: string;
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected';
  documents: string[];
}

const ApplicationsTable: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const queryClient = useQueryClient();

  const { data: applications, isLoading } = useQuery({
    queryKey: ['applications', selectedStatus],
    queryFn: () => api.getUniversityApplications({ status: selectedStatus }),
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return api.updateApplicationStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      // You could add a toast notification here
    },
    onError: (error) => {
      // Handle error (show toast notification, etc.)
      console.error('Failed to update status:', error);
    }
  });

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Filters */}
      <div className="p-4 border-b border-gray-200">
        <select 
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2"
        >
          <option value="all">All Applications</option>
          <option value="pending">Pending</option>
          <option value="reviewing">Reviewing</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Student
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Program
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Submitted
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {applications?.map((application) => (
            <tr key={application.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {application.studentName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {application.program}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {format(new Date(application.submissionDate), 'MMM d, yyyy')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 rounded-full text-xs font-medium
                  ${application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                    application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    application.status === 'reviewing' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button className="text-blue-600 hover:text-blue-900">
                  <FiEye className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => updateStatusMutation.mutate({ 
                    id: application.id, 
                    status: 'accepted' 
                  })}
                  className="text-green-600 hover:text-green-900"
                >
                  <FiCheck className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => updateStatusMutation.mutate({ 
                    id: application.id, 
                    status: 'rejected' 
                  })}
                  className="text-red-600 hover:text-red-900"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationsTable; 