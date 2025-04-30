import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  FiHome,
  FiFileText,
  FiBookOpen,
  FiMessageSquare,
  FiSettings,
  FiUser,
  FiPlus,
  FiClock,
  FiCheck,
  FiX,
} from "react-icons/fi";

const StudentDashboardPage: React.FC = () => {
  const { profile } = useAuth();

  // Mock data for the dashboard
  const applications = [
    {
      id: "app-1",
      program: "Bachelor of Computer Science",
      university: "UCMI University",
      status: "under_review",
      submittedDate: "2023-10-15",
    },
    {
      id: "app-2",
      program: "Master of Business Administration",
      university: "UCMI University",
      status: "approved",
      submittedDate: "2023-09-20",
    },
  ];

  const recommendedPrograms = [
    {
      id: "prog-1",
      title: "Bachelor of Engineering",
      university: "UCMI University",
      tuition: "$15,000",
      duration: "4 years",
    },
    {
      id: "prog-2",
      title: "Master of Data Science",
      university: "UCMI University",
      tuition: "$18,000",
      duration: "2 years",
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

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="font-orbitron text-3xl font-bold mb-2">
            Student Dashboard
          </h1>
          <p className="text-gray-400">
            Welcome back, {profile?.first_name || "Student"}
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 2/3 width on large screens */}
          <div className="lg:col-span-2 space-y-6">
            {/* Applications Section */}
            <div className="bg-gray-900 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-orbitron text-xl font-bold">
                  My Applications
                </h2>
                <Link
                  to="/apply"
                  className="flex items-center text-blue-400 hover:text-blue-300 text-sm"
                >
                  <FiPlus className="mr-1" /> New Application
                </Link>
              </div>

              {applications.length === 0 ? (
                <div className="text-center py-8 bg-gray-800/50 rounded-lg">
                  <p className="text-gray-400 mb-4">
                    You haven't submitted any applications yet
                  </p>
                  <Link
                    to="/apply"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center"
                  >
                    <FiPlus className="mr-2" /> Start Application
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-400 border-b border-gray-800">
                        <th className="pb-2">Program</th>
                        <th className="pb-2">University</th>
                        <th className="pb-2">Status</th>
                        <th className="pb-2">Submitted</th>
                        <th className="pb-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((app) => (
                        <tr
                          key={app.id}
                          className="border-b border-gray-800 hover:bg-gray-800/30"
                        >
                          <td className="py-3">{app.program}</td>
                          <td className="py-3">{app.university}</td>
                          <td className="py-3">
                            {getStatusBadge(app.status)}
                          </td>
                          <td className="py-3">{app.submittedDate}</td>
                          <td className="py-3 text-right">
                            <Link
                              to={`/applications/${app.id}`}
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
              )}
            </div>

            {/* Recommended Programs */}
            <div className="bg-gray-900 rounded-xl p-6">
              <h2 className="font-orbitron text-xl font-bold mb-4">
                Recommended Programs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedPrograms.map((program) => (
                  <div
                    key={program.id}
                    className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors"
                  >
                    <h3 className="font-bold mb-1">{program.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">
                      {program.university}
                    </p>
                    <div className="flex justify-between text-sm">
                      <span>{program.tuition}</span>
                      <span>{program.duration}</span>
                    </div>
                    <div className="mt-3">
                      <Link
                        to={`/programs/${program.id}`}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - 1/3 width on large screens */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <div className="bg-gray-900 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-2xl mr-4">
                  {profile?.first_name?.[0] || "S"}
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
                  to="/profile/student"
                  className="bg-gray-800 hover:bg-gray-700 text-white w-full py-2 rounded-lg flex items-center justify-center"
                >
                  <FiUser className="mr-2" /> Edit Profile
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-gray-900 rounded-xl p-6">
              <h2 className="font-orbitron text-xl font-bold mb-4">
                Quick Links
              </h2>
              <nav className="space-y-2">
                <Link
                  to="/programs"
                  className="flex items-center text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800"
                >
                  <FiBookOpen className="mr-3" /> Browse Programs
                </Link>
                <Link
                  to="/universities"
                  className="flex items-center text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800"
                >
                  <FiHome className="mr-3" /> Universities
                </Link>
                <Link
                  to="/messages"
                  className="flex items-center text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800"
                >
                  <FiMessageSquare className="mr-3" /> Messages
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800"
                >
                  <FiSettings className="mr-3" /> Settings
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardPage; 