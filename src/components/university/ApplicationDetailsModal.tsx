import React from 'react';
import { FiX, FiDownload } from 'react-icons/fi';

interface Props {
  application: any;
  isOpen: boolean;
  onClose: () => void;
}

const ApplicationDetailsModal: React.FC<Props> = ({ application, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Application Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <FiX className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 space-y-6">
          {/* Personal Information */}
          <section>
            <h3 className="text-lg font-medium mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Name</label>
                <p className="mt-1">{application.studentName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Email</label>
                <p className="mt-1">{application.email}</p>
              </div>
              {/* Add more personal details */}
            </div>
          </section>

          {/* Academic Background */}
          <section>
            <h3 className="text-lg font-medium mb-4">Academic Background</h3>
            {/* Add academic details */}
          </section>

          {/* Documents */}
          <section>
            <h3 className="text-lg font-medium mb-4">Documents</h3>
            <div className="space-y-2">
              {application.documents?.map((doc: string, index: number) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span>{doc}</span>
                  <button className="text-blue-600 hover:text-blue-800">
                    <FiDownload className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailsModal; 