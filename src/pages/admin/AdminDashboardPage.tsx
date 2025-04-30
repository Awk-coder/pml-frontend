import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  FiUsers,
  FiBookOpen,
  FiFileText,
  FiHome,
  FiSettings,
  FiUser,
  FiPlus,
  FiClock,
  FiCheck,
  FiX,
  FiBarChart2,
  FiDollarSign,
  FiShield,
  FiMessageSquare,
} from "react-icons/fi";

const AdminDashboardPage: React.FC = () => {
  const { profile } = useAuth();

  // Mock data for the dashboard
  const recentApplications = [
    {
      id: "app-1",
      student: "John Doe",
      program: "Bachelor of Computer Science",
      university: "UCMI University",
      status: "under_review",
      submittedDate: "2023-10-15",
    },
    {
      id: "app-2",
      student: "Jane Smith",
      program: "Master of Business Administration",
      university: "UCMI University",
      status: "approved",
      submittedDate: "2023-09-20",
    },
  ];

  const pendingApprovals = [
    {
      id: "univ-1",
      name: "Global University",
      type: "university",
      date: "2023-10-18",
    },
    {
      id: "agent-1",
      name: "International Study Consultants",
      type: "agent",
      date: "2023-10-17",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return (
          <span className="bg-gray-700 text-gray-200 px-2 py-1 rounded-full text-xs flex items-center">
            <FiClock className="mr-1" /> Draft
          </span>
        );
      case "submitted":
        return (
          <span className="bg-blue-900/60 text-blue-200 px-2 py-1 rounded-full text-xs flex items-center">
            <FiFileText className="mr-1" /> Submitted
          </span>
        );
      case "under_review":
        return (
          <span className="bg-yellow-900/60 text-yellow-200 px-2 py-1 rounded-full text-xs flex items-center">
            <FiClock className="mr-1" /> Under Review
          </span>
        );
      case "approved":
        return (
          <span className="bg-green-900/60 text-green-200 px-2 py-1 rounded-full text-xs flex items-center">
            <FiCheck className="mr-1" /> Approved
          </span>
        );
      case "rejected":
        return (
          <span className="bg-red-900/60 text-red-200 px-2 py-1 rounded-full text-xs flex items-center">
            <FiX className="mr-1" /> Rejected
          </span>
        );
      default:
        return (
          <span className="bg-gray-700 text-gray-200 px-2 py-1 rounded-full text-xs">
            {status}
          </span>
        );
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "university":
        return (
          <span className="bg-blue-900/60 text-blue-200 px-2 py-1 rounded-full text-xs flex items-center">
            <FiHome className="mr-1" /> University
          </span>
        );
      case "agent":
        return (
          <span className="bg-purple-900/60 text-purple-200 px-2 py-1 rounded-full text-xs flex items-center">
            <FiUsers className="mr-1" /> Agent
          </span>
        );
      default:
        return (
          <span className="bg-gray-700 text-gray-200 px-2 py-1 rounded-full text-xs">
            {type}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="font-orbitron text-3xl font-bold mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-400">
            Welcome back, {profile?.first_name || "Admin"}
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-900 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400">Total Students</h3>
              <FiUsers className="text-blue-400" />
            </div>
            <p className="text-3xl font-bold">245</p>
            <p className="text-green-400 text-sm mt-2">+18 this month</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400">Universities</h3>
              <FiHome className="text-purple-400" />
            </div>
            <p className="text-3xl font-bold">12</p>
            <p className="text-green-400 text-sm mt-2">+1 this month</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400">Agents</h3>
              <FiUsers className="text-yellow-400" />
            </div>
            <p className="text-3xl font-bold">28</p>
            <p className="text-green-400 text-sm mt-2">+3 this month</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400">Revenue</h3>
              <FiDollarSign className="text-green-400" />
            </div>
            <p className="text-3xl font-bold">$24,850</p>
            <p className="text-green-400 text-sm mt-2">+$3,200 this month</p>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 2/3 width on large screens */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pending Approvals Section */}
            <div className="bg-gray-900 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-orbitron text-xl font-bold">
                  Pending Approvals
                </h2>
                <Link
                  to="/admin/approvals"
                  className="flex items-center text-blue-400 hover:text-blue-300 text-sm"
                >
                  View All
                </Link>
              </div>

              {pendingApprovals.length === 0 ? (
                <div className="text-center py-8 bg-gray-800/50 rounded-lg">
                  <p className="text-gray-400">
                    No pending approvals at this time
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-400 border-b border-gray-800">
                        <th className="pb-2">Name</th>
                        <th className="pb-2">Type</th>
                        <th className="pb-2">Date</th>
                        <th className="pb-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingApprovals.map((item) => (
                        <tr
                          key={item.id}
                          className="border-b border-gray-800 hover:bg-gray-800/30"
                        >
                          <td className="py-3">{item.name}</td>
                          <td className="py-3">{getTypeBadge(item.type)}</td>
                          <td className="py-3">{item.date}</td>
                          <td className="py-3 text-right">
                            <Link
                              to={`/admin/approvals/${item.id}`}
                              className="text-blue-400 hover:text-blue-300"
                            >
                              Review
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Recent Applications Section */}
            <div className="bg-gray-900 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-orbitron text-xl font-bold">
                  Recent Applications
                </h2>
                <Link
                  to="/admin/applications"
                  className="flex items-center text-blue-400 hover:text-blue-300 text-sm"
                >
                  View All
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-gray-800">
                      <th className="pb-2">Student</th>
                      <th className="pb-2">Program</th>
                      <th className="pb-2">University</th>
                      <th className="pb-2">Status</th>
                      <th className="pb-2">Submitted</th>
                      <th className="pb-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentApplications.map((app) => (
                      <tr
                        key={app.id}
                        className="border-b border-gray-800 hover:bg-gray-800/30"
                      >
                        <td className="py-3">{app.student}</td>
                        <td className="py-3">{app.program}</td>
                        <td className="py-3">{app.university}</td>
                        <td className="py-3">{getStatusBadge(app.status)}</td>
                        <td className="py-3">{app.submittedDate}</td>
                        <td className="py-3 text-right">
                          <Link
                            to={`/admin/applications/${app.id}`}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar - 1/3 width on large screens */}
          <div className="space-y-6">
            {/* Admin Profile Summary */}
            <div className="bg-gray-900 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-2xl mr-4">
                  {profile?.first_name?.[0] || "A"}
                </div>
                <div>
                  <h2 className="font-bold">
                    {profile?.first_name} {profile?.last_name}
                  </h2>
                  <p className="text-gray-400 text-sm">{profile?.email}</p>
                </div>
              </div>
              <div className="border-t border-gray-800 pt-4 mt-4">
                <Link
                  to="/admin/profile"
                  className="bg-gray-800 hover:bg-gray-700 text-white w-full py-2 rounded-lg flex items-center justify-center"
                >
                  <FiUser className="mr-2" /> Edit Profile
                </Link>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-gray-900 rounded-xl p-6">
              <h2 className="font-orbitron text-xl font-bold mb-4">
                System Status
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Database</span>
                  <span className="text-green-400 flex items-center">
                    <FiCheck className="mr-1" /> Operational
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Storage</span>
                  <span className="text-green-400 flex items-center">
                    <FiCheck className="mr-1" /> Operational
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Authentication</span>
                  <span className="text-green-400 flex items-center">
                    <FiCheck className="mr-1" /> Operational
                  </span>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-800">
                  <Link
                    to="/admin/system"
                    className="text-blue-400 hover:text-blue-300 flex items-center justify-center"
                  >
                    View System Logs
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-gray-900 rounded-xl p-6">
              <h2 className="font-orbitron text-xl font-bold mb-4">
                Admin Tools
              </h2>
              <nav className="space-y-2">
                <Link
                  to="/admin/users"
                  className="flex items-center text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800"
                >
                  <FiUsers className="mr-3" /> User Management
                </Link>
                <Link
                  to="/admin/universities"
                  className="flex items-center text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800"
                >
                  <FiHome className="mr-3" /> Universities
                </Link>
                <Link
                  to="/admin/agents"
                  className="flex items-center text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800"
                >
                  <FiUsers className="mr-3" /> Agents
                </Link>
                <Link
                  to="/admin/programs"
                  className="flex items-center text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800"
                >
                  <FiBookOpen className="mr-3" /> Programs
                </Link>
                <Link
                  to="/admin/settings"
                  className="flex items-center text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800"
                >
                  <FiSettings className="mr-3" /> Settings
                </Link>
                <Link
                  to="/admin/messages"
                  className="flex items-center text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800"
                >
                  <FiMessageSquare className="mr-3" /> Messages
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage; 