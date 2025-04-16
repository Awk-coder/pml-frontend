import React from "react";
import { Link } from "react-router-dom";
import { FiUser, FiExternalLink } from "react-icons/fi";

interface Student {
  id: string;
  name: string;
  email: string;
  applicationCount: number;
  dateAdded: string;
}

interface RecentStudentsProps {
  students: Student[];
}

const RecentStudents: React.FC<RecentStudentsProps> = ({ students }) => {
  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-orbitron text-xl text-white">Recent Students</h3>
        <Link
          to="/agent/students"
          className="text-sm text-blue-400 hover:text-blue-300"
        >
          View All
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="pb-4 text-left text-sm font-semibold text-gray-400">Student</th>
              <th className="pb-4 text-left text-sm font-semibold text-gray-400">Email</th>
              <th className="pb-4 text-left text-sm font-semibold text-gray-400">Applications</th>
              <th className="pb-4 text-left text-sm font-semibold text-gray-400">Date Added</th>
              <th className="pb-4 text-left text-sm font-semibold text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b border-gray-800 last:border-b-0">
                <td className="py-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-3">
                      <FiUser className="text-white" />
                    </div>
                    <span className="text-white">{student.name}</span>
                  </div>
                </td>
                <td className="py-4 text-gray-300">{student.email}</td>
                <td className="py-4 text-gray-300">{student.applicationCount}</td>
                <td className="py-4 text-gray-300">{student.dateAdded}</td>
                <td className="py-4">
                  <Link
                    to={`/agent/students/${student.id}`}
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
    </div>
  );
};

export default RecentStudents; 