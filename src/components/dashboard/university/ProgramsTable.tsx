import React from "react";
import { Link } from "react-router-dom";
import { FiEdit2, FiEye, FiUsers } from "react-icons/fi";

interface Program {
  id: string;
  title: string;
  level: string;
  category: string;
  applicationsCount: number;
  isActive: boolean;
}

interface ProgramsTableProps {
  programs: Program[];
}

const ProgramsTable: React.FC<ProgramsTableProps> = ({ programs }) => {
  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-orbitron text-xl text-white">Your Programs</h3>
        <Link
          to="/university/programs/add"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
        >
          Add Program
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="pb-4 text-left text-sm font-semibold text-gray-400">Program</th>
              <th className="pb-4 text-left text-sm font-semibold text-gray-400">Level</th>
              <th className="pb-4 text-left text-sm font-semibold text-gray-400">Category</th>
              <th className="pb-4 text-left text-sm font-semibold text-gray-400">Applications</th>
              <th className="pb-4 text-left text-sm font-semibold text-gray-400">Status</th>
              <th className="pb-4 text-left text-sm font-semibold text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {programs.map((program) => (
              <tr key={program.id} className="border-b border-gray-800 last:border-b-0">
                <td className="py-4 text-white">{program.title}</td>
                <td className="py-4 text-gray-300">{program.level}</td>
                <td className="py-4 text-gray-300">{program.category}</td>
                <td className="py-4">
                  <div className="flex items-center">
                    <FiUsers className="text-blue-400 mr-2" />
                    <span className="text-gray-300">{program.applicationsCount}</span>
                  </div>
                </td>
                <td className="py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      program.isActive
                        ? "bg-green-900/30 text-green-400"
                        : "bg-gray-900/30 text-gray-400"
                    }`}
                  >
                    {program.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex space-x-3">
                    <Link
                      to={`/university/programs/${program.id}/edit`}
                      className="text-blue-400 hover:text-blue-300"
                      title="Edit Program"
                    >
                      <FiEdit2 />
                    </Link>
                    <Link
                      to={`/programs/${program.id}`}
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

export default ProgramsTable; 