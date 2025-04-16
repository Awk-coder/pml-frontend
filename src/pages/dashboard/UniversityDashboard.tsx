import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../../components/layout/Navbar";
import SquaresBackground from "../../components/layout/SquaresBackground";

interface Application {
  id: string;
  studentName: string;
  program: string;
  submittedDate: string;
  status: "pending" | "accepted" | "rejected";
  documents: string[];
}

const UniversityDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Mock data - would come from API
  const applications: Application[] = [
    {
      id: "1",
      studentName: "John Doe",
      program: "Computer Science",
      submittedDate: "2024-03-15",
      status: "pending",
      documents: ["Transcript", "LOR", "SOP"],
    },
    // ... more applications
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="relative min-h-screen bg-black pt-24">
        <SquaresBackground />

        <div className="container mx-auto px-6 relative z-20">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="font-orbitron text-4xl font-bold text-white mb-4">
              Welcome,{" "}
              <span className="text-blue-400">{user?.universityName}</span>
            </h1>
            <p className="font-space text-gray-400">
              Manage your applications and student submissions
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <h3 className="font-space text-gray-400 mb-2">
                Total Applications
              </h3>
              <p className="font-orbitron text-3xl text-white">156</p>
            </div>
            <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <h3 className="font-space text-gray-400 mb-2">Pending Review</h3>
              <p className="font-orbitron text-3xl text-white">23</p>
            </div>
            <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <h3 className="font-space text-gray-400 mb-2">Accepted</h3>
              <p className="font-orbitron text-3xl text-green-400">89</p>
            </div>
            <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <h3 className="font-space text-gray-400 mb-2">Rejected</h3>
              <p className="font-orbitron text-3xl text-red-400">44</p>
            </div>
          </div>

          {/* Applications Table */}
          <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
              <h2 className="font-space text-2xl text-white">Applications</h2>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-gray-800 text-white rounded-lg px-4 py-2 font-space text-sm"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="reviewing">Reviewing</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900/50">
                  <tr>
                    <th className="text-left p-4 font-space text-gray-400">
                      Student
                    </th>
                    <th className="text-left p-4 font-space text-gray-400">
                      Program
                    </th>
                    <th className="text-left p-4 font-space text-gray-400">
                      Submitted
                    </th>
                    <th className="text-left p-4 font-space text-gray-400">
                      Status
                    </th>
                    <th className="text-left p-4 font-space text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr
                      key={app.id}
                      className="border-t border-gray-800 hover:bg-gray-900/30"
                    >
                      <td className="p-4">
                        <div className="font-space text-white">
                          {app.studentName}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-space text-white">
                          {app.program}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-space text-gray-400">
                          {app.submittedDate}
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-space ${
                            app.status === "accepted"
                              ? "bg-green-500/10 text-green-400"
                              : app.status === "rejected"
                              ? "bg-red-500/10 text-red-400"
                              : "bg-yellow-500/10 text-yellow-400"
                          }`}
                        >
                          {app.status.charAt(0).toUpperCase() +
                            app.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-4">
                        <button className="font-space text-sm bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityDashboard;
