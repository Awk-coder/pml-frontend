import React, { useState } from "react";
import { FiUsers, FiBookOpen, FiBarChart2, FiCheckCircle, FiXCircle } from "react-icons/fi";
import Layout from "../../components/layout/Layout";

// Mock data
const MOCK_STATS = {
  totalStudents: 458,
  totalPrograms: 12,
  pendingApplications: 24,
  applications: [
    { id: "APP-2234", student: "John Doe", program: "Diploma in Nursing", status: "Pending", date: "2023-11-15" },
    { id: "APP-2235", student: "Jane Smith", program: "Diploma in Business Management", status: "Approved", date: "2023-11-14" },
    { id: "APP-2236", student: "Ahmed Khan", program: "Diploma in Psychology", status: "Rejected", date: "2023-11-13" },
    { id: "APP-2237", student: "Sarah Wong", program: "Diploma in Pharmacy", status: "Pending", date: "2023-11-12" },
    { id: "APP-2238", student: "Michael Chen", program: "Diploma in Medical Science", status: "Approved", date: "2023-11-11" },
  ],
  programs: [
    { id: "PRG-123", name: "Diploma in Nursing", students: 87, applications: 12, status: "Active" },
    { id: "PRG-124", name: "Diploma in Business Management", students: 65, applications: 8, status: "Active" },
    { id: "PRG-125", name: "Diploma in Psychology", students: 42, applications: 5, status: "Active" },
    { id: "PRG-126", name: "Diploma in Pharmacy", students: 56, applications: 7, status: "Active" },
    { id: "PRG-127", name: "Diploma in Medical Science", students: 38, applications: 4, status: "Active" },
  ]
};

const UniversityDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-3xl font-bold text-white mb-8">University Dashboard</h1>
        
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
              activeTab === "students"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("students")}
          >
            Students
          </button>
          <button
            className={`mr-4 py-2 px-4 font-medium ${
              activeTab === "profile"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400 font-medium">Total Students</h3>
                  <FiUsers className="text-blue-400 text-xl" />
                </div>
                <p className="text-3xl font-bold text-white">{MOCK_STATS.totalStudents}</p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400 font-medium">Programs</h3>
                  <FiBookOpen className="text-green-400 text-xl" />
                </div>
                <p className="text-3xl font-bold text-white">{MOCK_STATS.totalPrograms}</p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400 font-medium">Pending Applications</h3>
                  <FiBarChart2 className="text-yellow-400 text-xl" />
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
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_STATS.applications.map((app) => (
                      <tr key={app.id} className="border-b border-gray-700">
                        <td className="py-3 text-white">{app.id}</td>
                        <td className="py-3 text-white">{app.student}</td>
                        <td className="py-3 text-white">{app.program}</td>
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
                        <td className="py-3 flex space-x-2">
                          {app.status === "Pending" && (
                            <>
                              <button className="p-1 bg-green-900 text-green-300 rounded hover:bg-green-800">
                                <FiCheckCircle />
                              </button>
                              <button className="p-1 bg-red-900 text-red-300 rounded hover:bg-red-800">
                                <FiXCircle />
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Programs Overview */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Programs Overview</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-gray-700">
                      <th className="pb-3 font-medium">ID</th>
                      <th className="pb-3 font-medium">Program</th>
                      <th className="pb-3 font-medium">Students</th>
                      <th className="pb-3 font-medium">Applications</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_STATS.programs.map((program) => (
                      <tr key={program.id} className="border-b border-gray-700">
                        <td className="py-3 text-white">{program.id}</td>
                        <td className="py-3 text-white">{program.name}</td>
                        <td className="py-3 text-white">{program.students}</td>
                        <td className="py-3 text-white">{program.applications}</td>
                        <td className="py-3">
                          <span className="px-2 py-1 rounded text-xs font-medium bg-green-900 text-green-300">
                            {program.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === "applications" && (
          <div>
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Student Applications</h2>
              <div className="flex space-x-2">
                <select className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2">
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <select className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2">
                  <option value="all">All Programs</option>
                  {MOCK_STATS.programs.map(program => (
                    <option key={program.id} value={program.id}>{program.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-gray-700">
                      <th className="pb-3 font-medium">ID</th>
                      <th className="pb-3 font-medium">Student</th>
                      <th className="pb-3 font-medium">Program</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_STATS.applications.map((app) => (
                      <tr key={app.id} className="border-b border-gray-700">
                        <td className="py-3 text-white">{app.id}</td>
                        <td className="py-3 text-white">{app.student}</td>
                        <td className="py-3 text-white">{app.program}</td>
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
                        <td className="py-3 flex space-x-2">
                          <button className="text-blue-400 hover:text-blue-300">
                            View
                          </button>
                          {app.status === "Pending" && (
                            <>
                              <button className="text-green-400 hover:text-green-300 ml-2">
                                Approve
                              </button>
                              <button className="text-red-400 hover:text-red-300 ml-2">
                                Reject
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Programs Tab */}
        {activeTab === "programs" && (
          <div>
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Your Programs</h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                Add New Program
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_STATS.programs.map((program) => (
                <div key={program.id} className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{program.name}</h3>
                  <div className="flex justify-between text-gray-400 text-sm mb-4">
                    <span>ID: {program.id}</span>
                    <span className="px-2 py-1 rounded text-xs font-medium bg-green-900 text-green-300">
                      {program.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-700 rounded-lg p-3">
                      <p className="text-gray-400 text-xs">Students</p>
                      <p className="text-white text-lg font-bold">{program.students}</p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-3">
                      <p className="text-gray-400 text-xs">Applications</p>
                      <p className="text-white text-lg font-bold">{program.applications}</p>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button className="text-blue-400 hover:text-blue-300">
                      Edit
                    </button>
                    <button className="text-red-400 hover:text-red-300">
                      Deactivate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === "students" && (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-4">
              Students Section
            </h3>
            <p className="text-gray-400">
              This section is under development. You'll be able to view and manage enrolled students here.
            </p>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-6">University Profile</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-medium text-white mb-4">Basic Information</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 mb-1">University Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                      value="MAIWP International University College"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1">Location</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                      value="Kuala Lumpur, Malaysia"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1">Established</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                      value="2005"
                      readOnly
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-white mb-4">Contact Information</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 mb-1">Email</label>
                    <input 
                      type="email" 
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                      value="admissions@ucmi.edu.my"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1">Phone</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                      value="+60 3 1234 5678"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1">Website</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                      value="https://www.ucmi.edu.my"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="text-lg font-medium text-white mb-4">University Description</h4>
              <textarea 
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white h-32"
                value="MAIWP International University College is a leading institution dedicated to providing quality education in various fields including healthcare, business, and technology. Our mission is to empower students with knowledge and skills for successful careers."
              ></textarea>
            </div>
            
            <div className="flex justify-end mt-6">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UniversityDashboard; 