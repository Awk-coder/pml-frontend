import React from "react";
import { Link } from "react-router-dom";
import { FiExternalLink, FiFileText } from "react-icons/fi";

interface Application {
  id: string;
  program: string;
  university: string;
  status: string;
  date: string;
}

interface ApplicationsListProps {
  applications: Application[];
}

const ApplicationsList: React.FC<ApplicationsListProps> = ({ applications }) => {
  const getStatusClassName = (status: string) => {
    switch (status) {
      case "Accepted":
        return "bg-green-900/30 text-green-400";
      case "Pending":
        return "bg-yellow-900/30 text-yellow-400";
      case "Reviewing":
        return "bg-blue-900/30 text-blue-400";
      case "Rejected":
        return "bg-red-900/30 text-red-400";
      default:
        return "bg-gray-900/30 text-gray-400";
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-orbitron text-xl text-white">My Applications</h3>
        <Link to="/student/applications" className="text-sm text-blue-400 hover:text-blue-300">
          View All
        </Link>
      </div>

      {applications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8">
          <FiFileText className="text-4xl text-gray-500 mb-4" />
          <p className="text-gray-400 text-center">No applications yet</p>
          <Link
            to="/programs"
            className="mt-4 text-blue-400 hover:text-blue-300"
          >
            Browse Programs
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="pb-4 text-left text-sm font-semibold text-gray-400">Program</th>
                <th className="pb-4 text-left text-sm font-semibold text-gray-400">University</th>
                <th className="pb-4 text-left text-sm font-semibold text-gray-400">Status</th>
                <th className="pb-4 text-left text-sm font-semibold text-gray-400">Date</th>
                <th className="pb-4 text-left text-sm font-semibold text-gray-400"></th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application.id} className="border-b border-gray-800 last:border-b-0">
                  <td className="py-4 text-white text-sm">{application.program}</td>
                  <td className="py-4 text-gray-300 text-sm">{application.university}</td>
                  <td className="py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusClassName(
                        application.status
                      )}`}
                    >
                      {application.status}
                    </span>
                  </td>
                  <td className="py-4 text-gray-300 text-sm">{application.date}</td>
                  <td className="py-4 text-right">
                    <Link
                      to={`/student/applications/${application.id}`}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <FiExternalLink />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ApplicationsList; 