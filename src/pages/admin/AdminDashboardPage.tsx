import React from "react";
import { FiUser, FiPlus, FiList } from "react-icons/fi";
import UsersOverview from "../../components/dashboard/admin/UsersOverview";
import UniversitiesOverview from "../../components/dashboard/admin/UniversitiesOverview";

const AdminDashboardPage: React.FC = () => {
  // Mock data for the dashboard
  const userStats = {
    totalUsers: 236,
    students: 157,
    universities: 12,
    agents: 35,
    recentlyJoined: 24
  };

  const universities = [
    {
      id: "1",
      name: "MAIWP International University College",
      location: "Kuala Lumpur, Malaysia",
      status: "active",
      programsCount: 12,
      applicationsCount: 48
    },
    {
      id: "2",
      name: "Westfield Medical College",
      location: "Kuching, Malaysia",
      status: "active",
      programsCount: 8,
      applicationsCount: 32
    },
    {
      id: "3",
      name: "Northridge Health Sciences University",
      location: "Penang, Malaysia",
      status: "pending",
      programsCount: 5,
      applicationsCount: 10
    },
    {
      id: "4",
      name: "Singapore Medical Institute",
      location: "Singapore",
      status: "active",
      programsCount: 15,
      applicationsCount: 72
    }
  ];

  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h1 className="font-orbitron text-3xl text-white mb-4 md:mb-0">
            Admin Dashboard
          </h1>
          <div className="bg-gray-900 py-2 px-4 rounded-lg flex items-center">
            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center mr-3">
              <FiUser className="text-white" />
            </div>
            <div>
              <p className="text-white font-space">System Administrator</p>
              <p className="text-gray-400 text-sm">Admin ID: A-10001</p>
            </div>
          </div>
        </div>

        <div className="mb-10 p-6 bg-gray-900/50 rounded-xl border border-gray-800">
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <div className="mb-4 md:mb-0 md:mr-6">
              <h2 className="font-orbitron text-xl text-white mb-2">
                Welcome to the Administration Panel
              </h2>
              <p className="text-gray-300">
                Manage universities, programs, and user accounts from this dashboard.
              </p>
            </div>
            <div className="flex items-center ml-auto space-x-3">
              <button className="flex items-center bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                <FiPlus className="mr-2" />
                <span>Add University</span>
              </button>
              <button className="flex items-center bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                <FiList className="mr-2" />
                <span>System Logs</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="font-orbitron text-2xl text-white mb-6">Users Overview</h3>
          <UsersOverview stats={userStats} />
        </div>

        <div className="mb-6">
          <UniversitiesOverview universities={universities} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage; 