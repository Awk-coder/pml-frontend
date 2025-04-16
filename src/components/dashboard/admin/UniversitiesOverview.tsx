import React from "react";
import { Link } from "react-router-dom";
import { FiEdit2, FiEye, FiUserCheck, FiClock } from "react-icons/fi";

interface University {
  id: string;
  name: string;
  location: string;
  status: "active" | "pending" | "suspended";
  programsCount: number;
  applicationsCount: number;
}

interface UniversitiesOverviewProps {
  universities: University[];
}

const UniversitiesOverview: React.FC<UniversitiesOverviewProps> = ({ universities }) => {
  const getStatusClassName = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-900/30 text-green-400";
      case "pending":
        return "bg-yellow-900/30 text-yellow-400";
      case "suspended":
        return "bg-red-900/30 text-red-400";
      default:
        return "bg-gray-900/30 text-gray-400";
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-orbitron text-xl text-white">Universities</h3>
        <Link
          to="/admin/universities"
          className="text-sm text-blue-400 hover:text-blue-300"
        >
          View All
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="pb-4 text-left text-sm font-semibold text-gray-400">University</th>
              <th className="pb-4 text-left text-sm font-semibold text-gray-400">Location</th>
              <th className="pb-4 text-left text-sm font-semibold text-gray-400">Status</th>
              <th className="pb-4 text-left text-sm font-semibold text-gray-400">Programs</th>
              <th className="pb-4 text-left text-sm font-semibold text-gray-400">Applications</th>
              <th className="pb-4 text-left text-sm font-semibold text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {universities.map((university) => (
              <tr key={university.id} className="border-b border-gray-800 last:border-b-0">
                <td className="py-4 text-white">{university.name}</td>
                <td className="py-4 text-gray-300">{university.location}</td>
                <td className="py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getStatusClassName(
                      university.status
                    )}`}
                  >
                    {university.status.charAt(0).toUpperCase() + university.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 text-gray-300">{university.programsCount}</td>
                <td className="py-4 text-gray-300">{university.applicationsCount}</td>
                <td className="py-4">
                  <div className="flex space-x-3">
                    <Link
                      to={`/admin/universities/${university.id}`}
                      className="text-blue-400 hover:text-blue-300"
                      title="Edit University"
                    >
                      <FiEdit2 />
                    </Link>
                    <Link
                      to={`/universities/${university.id}`}
                      className="text-blue-400 hover:text-blue-300"
                      title="View Public Page"
                    >
                      <FiEye />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UniversitiesOverview; 