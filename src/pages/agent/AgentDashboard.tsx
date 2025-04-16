import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FiUsers, FiDollarSign, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';
import { api } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import SquaresBackground from "../../components/layout/SquaresBackground";
import Navbar from "../../components/layout/Navbar";

const AgentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("students");
  
  const { data: students, isLoading } = useQuery({
    queryKey: ["agentStudents"],
    queryFn: () => api.getAgentStudents()
  });
  
  const { data: commissions, isLoading: isLoadingCommissions } = useQuery({
    queryKey: ["agentCommissions"],
    queryFn: () => api.getAgentCommissions()
  });

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="relative min-h-screen bg-black pt-24">
        <SquaresBackground
          direction="diagonal"
          speed={0.3}
          squareSize={40}
          borderColor="rgba(255, 255, 255, 0.3)"
          hoverFillColor="#333"
          backgroundColor="#000000"
        />

        <div className="container mx-auto px-6 relative z-20">
          <h1 className="font-orbitron text-4xl font-bold text-white mb-4">
            Agent Dashboard
          </h1>
          
          <div className="flex space-x-4 mb-6">
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === "students" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-800 text-gray-300"
              }`}
              onClick={() => setActiveTab("students")}
            >
              My Students
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === "commissions" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-800 text-gray-300"
              }`}
              onClick={() => setActiveTab("commissions")}
            >
              Commissions
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === "programs" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-800 text-gray-300"
              }`}
              onClick={() => setActiveTab("programs")}
            >
              Programs
            </button>
          </div>
          
          {activeTab === "students" && (
            <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-orbitron text-xl text-white">Your Students</h2>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                  Add New Student
                </button>
              </div>
              
              {isLoading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-10 bg-gray-800 rounded w-full"></div>
                  <div className="h-20 bg-gray-800 rounded w-full"></div>
                  <div className="h-20 bg-gray-800 rounded w-full"></div>
                </div>
              ) : students && students.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Applications
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {students.map(student => (
                        <tr key={student.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">{student.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {student.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {student.applications}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              student.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {student.status === 'active' ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button className="text-blue-500 hover:text-blue-400 mr-3">
                              View
                            </button>
                            <button className="text-blue-500 hover:text-blue-400">
                              Apply
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-400">You haven't added any students yet.</p>
              )}
            </div>
          )}
          
          {activeTab === "commissions" && (
            <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <h2 className="font-orbitron text-xl text-white mb-4">
                Your Commissions
              </h2>
              
              {isLoadingCommissions ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-10 bg-gray-800 rounded w-full"></div>
                  <div className="h-20 bg-gray-800 rounded w-full"></div>
                </div>
              ) : commissions ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <p className="text-gray-400 text-sm">Total Earned</p>
                      <p className="text-2xl font-bold text-white">${commissions.total}</p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <p className="text-gray-400 text-sm">Pending</p>
                      <p className="text-2xl font-bold text-white">${commissions.pending}</p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <p className="text-gray-400 text-sm">This Month</p>
                      <p className="text-2xl font-bold text-white">${commissions.thisMonth}</p>
                    </div>
                  </div>

                  {commissions.history && commissions.history.length > 0 && (
                    <div>
                      <h3 className="font-space text-gray-400 mb-4">Recent Commissions</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                          <thead>
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Student
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                University
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Amount
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Date
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-700">
                            {commissions.history.map(commission => (
                              <tr key={commission.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                  {commission.student}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                  {commission.university}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                  ${commission.amount}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    commission.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {commission.status === 'paid' ? 'Paid' : 'Pending'}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                  {new Date(commission.date).toLocaleDateString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-gray-400">No commission data available.</p>
              )}
            </div>
          )}
          
          {activeTab === "programs" && (
            <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <h2 className="font-orbitron text-xl text-white mb-4">
                Available Programs
              </h2>
              
              <p className="text-gray-400 mb-4">
                Browse programs to recommend to your students.
              </p>
              
              {/* Program list would go here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value }) => (
  <div className="bg-gray-900 rounded-lg p-6">
    <div className="flex items-center gap-3 mb-4">
      <span className="text-blue-400 text-xl">{icon}</span>
      <h3 className="font-space text-gray-400">{title}</h3>
    </div>
    <p className="text-2xl font-space">{value}</p>
  </div>
);

export default AgentDashboard; 