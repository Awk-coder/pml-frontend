import React, { useState } from "react";
import { FiUsers, FiBookOpen, FiBarChart2, FiSettings, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import Layout from "../../components/layout/Layout";

// Mock data
const MOCK_STATS = {
  totalStudents: 1245,
  totalUniversities: 28,
  totalPrograms: 156,
  pendingApplications: 42,
  recentApplications: [
    { id: "APP-1234", student: "John Doe", program: "Diploma in Nursing", university: "MAIWP International University College", status: "Pending", date: "2023-11-15" },
    { id: "APP-1235", student: "Jane Smith", program: "Diploma in Business Management", university: "MAIWP International University College", status: "Approved", date: "2023-11-14" },
    { id: "APP-1236", student: "Ahmed Khan", program: "Diploma in Psychology", university: "MAIWP International University College", status: "Rejected", date: "2023-11-13" },
    { id: "APP-1237", student: "Sarah Wong", program: "Diploma in Pharmacy", university: "MAIWP International University College", status: "Pending", date: "2023-11-12" },
    { id: "APP-1238", student: "Michael Chen", program: "Diploma in Medical Science", university: "MAIWP International University College", status: "Approved", date: "2023-11-11" },
  ],
  pendingUniversities: [
    { id: "UNI-123", name: "Global Education Institute", location: "Kuala Lumpur", programs: 12, date: "2023-11-10" },
    { id: "UNI-124", name: "International College of Technology", location: "Penang", programs: 8, date: "2023-11-09" },
    { id: "UNI-125", name: "Asia Pacific University", location: "Johor", programs: 15, date: "2023-11-08" },
  ]
};

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>
        
        {/* Tabs */}
        <div className="flex flex-wrap border-b border-gray-700 mb-8">
          <button
            className={`mr-4 py-2 px-4 font-medium ${
              activeTab === "overview"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`mr-4 py-2 px-4 font-medium ${
              activeTab === "applications"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("applications")}
          >
            Applications
          </button>
          <button
            className={`mr-4 py-2 px-4 font-medium ${
              activeTab === "universities"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("universities")}
          >
            Universities
          </button>
          <button
            className={`mr-4 py-2 px-4 font-medium ${
              activeTab === "programs"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("programs")}
          >
            Programs
          </button>
          <button
            className={`mr-4 py-2 px-4 font-medium ${
              activeTab === "settings"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400 font-medium">Total Students</h3>
                  <FiUsers className="text-blue-400 text-xl" />
                </div>
                <p className="text-3xl font-bold text-white">{MOCK_STATS.totalStudents}</p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400 font-medium">Universities</h3>
                  <FiBookOpen className="text-green-400 text-xl" />
                </div>
                <p className="text-3xl font-bold text-white">{MOCK_STATS.totalUniversities}</p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400 font-medium">Programs</h3>
                  <FiBarChart2 className="text-purple-400 text-xl" />
                </div>
                <p className="text-3xl font-bold text-white">{MOCK_STATS.totalPrograms}</p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400 font-medium">Pending Applications</h3>
                  <FiSettings className="text-yellow-400 text-xl" />
                </div>
                <p className="text-3xl font-bold text-white">{MOCK_STATS.pendingApplications}</p>
              </div>
            </div>

            {/* Recent Applications */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Recent Applications</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-gray-700">
                      <th className="pb-3 font-medium">ID</th>
                      <th className="pb-3 font-medium">Student</th>
                      <th className="pb-3 font-medium">Program</th>
                      <th className="pb-3 font-medium">University</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_STATS.recentApplications.map((app) => (
                      <tr key={app.id} className="border-b border-gray-700">
                        <td className="py-3 text-white">{app.id}</td>
                        <td className="py-3 text-white">{app.student}</td>
                        <td className="py-3 text-white">{app.program}</td>
                        <td className="py-3 text-white">{app.university}</td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              app.status === "Approved"
                                ? "bg-green-900 text-green-300"
                                : app.status === "Rejected"
                                ? "bg-red-900 text-red-300"
                                : "bg-yellow-900 text-yellow-300"
                            }`}
                          >
                            {app.status}
                          </span>
                        </td>
                        <td className="py-3 text-white">{app.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pending Universities */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Pending University Applications</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-gray-700">
                      <th className="pb-3 font-medium">ID</th>
                      <th className="pb-3 font-medium">University</th>
                      <th className="pb-3 font-medium">Location</th>
                      <th className="pb-3 font-medium">Programs</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_STATS.pendingUniversities.map((uni) => (
                      <tr key={uni.id} className="border-b border-gray-700">
                        <td className="py-3 text-white">{uni.id}</td>
                        <td className="py-3 text-white">{uni.name}</td>
                        <td className="py-3 text-white">{uni.location}</td>
                        <td className="py-3 text-white">{uni.programs}</td>
                        <td className="py-3 text-white">{uni.date}</td>
                        <td className="py-3 flex space-x-2">
                          <button className="p-1 bg-green-900 text-green-300 rounded hover:bg-green-800">
                            <FiCheckCircle />
                          </button>
                          <button className="p-1 bg-red-900 text-red-300 rounded hover:bg-red-800">
                            <FiAlertCircle />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs would go here */}
        {activeTab !== "overview" && (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-4">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
            </h3>
            <p className="text-gray-400">
              This section is under development. Please check back later.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminDashboard;
