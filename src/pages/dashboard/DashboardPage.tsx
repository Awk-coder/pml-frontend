import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/layout/Navbar';
import SquaresBackground from '../../components/layout/SquaresBackground';

interface StatusUpdate {
  date: string;
  status: string;
  description: string;
}

interface Application {
  id: number;
  university: string;
  program: string;
  status: string;
  deadline: string;
  documents: string[];
  missingDocs: string[];
  timeline: StatusUpdate[];
}

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  // Mock data - would come from API
  const applications: Application[] = [
    {
      id: 1,
      university: "MIT",
      program: "Computer Science",
      status: "Under Review",
      deadline: "2024-04-15",
      documents: ["Transcript", "LOR", "SOP"],
      missingDocs: ["Financial Documents"],
      timeline: [
        {
          date: "2024-03-15",
          status: "Under Review",
          description: "Application is being reviewed by the admissions committee"
        },
        {
          date: "2024-03-10",
          status: "Documents Verified",
          description: "All submitted documents have been verified"
        },
        {
          date: "2024-03-01",
          status: "Application Submitted",
          description: "Initial application submitted successfully"
        }
      ]
    },
    {
      id: 2,
      university: "Stanford",
      program: "Data Science",
      status: "Documents Pending",
      deadline: "2024-04-30",
      documents: ["Transcript"],
      missingDocs: ["LOR", "SOP", "Financial Documents"],
      timeline: []
    },
    {
      id: 3,
      university: "Harvard",
      program: "Artificial Intelligence",
      status: "Submitted",
      deadline: "2024-03-30",
      documents: ["Transcript", "LOR", "SOP", "Financial Documents"],
      missingDocs: [],
      timeline: []
    }
  ];

  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

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
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="font-orbitron text-4xl font-bold text-white mb-4">
              Welcome, <span className="text-blue-400">{user?.firstName}</span>
            </h1>
            <p className="font-space text-gray-400">
              Track your university applications and admission status
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <h3 className="font-space text-gray-400 mb-2">Total Applications</h3>
              <p className="font-orbitron text-3xl text-white">3</p>
            </div>
            <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <h3 className="font-space text-gray-400 mb-2">Pending Documents</h3>
              <p className="font-orbitron text-3xl text-white">4</p>
            </div>
            <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <h3 className="font-space text-gray-400 mb-2">Upcoming Deadlines</h3>
              <p className="font-orbitron text-3xl text-white">2</p>
            </div>
          </div>

          {/* Applications Table */}
          <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <h2 className="font-space text-2xl text-white">Your Applications</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900/50">
                  <tr>
                    <th className="text-left p-4 font-space text-gray-400">University</th>
                    <th className="text-left p-4 font-space text-gray-400">Program</th>
                    <th className="text-left p-4 font-space text-gray-400">Status</th>
                    <th className="text-left p-4 font-space text-gray-400">Deadline</th>
                    <th className="text-left p-4 font-space text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id} className="border-t border-gray-800 hover:bg-gray-900/30">
                      <td className="p-4">
                        <div className="font-space text-white">{app.university}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-space text-white">{app.program}</div>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-space ${
                          app.status === 'Submitted' ? 'bg-green-500/10 text-green-400' :
                          app.status === 'Under Review' ? 'bg-blue-500/10 text-blue-400' :
                          'bg-yellow-500/10 text-yellow-400'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="font-space text-gray-400">{app.deadline}</div>
                      </td>
                      <td className="p-4">
                        <button 
                          onClick={() => setSelectedApp(app)}
                          className="font-space text-sm bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Missing Documents Alert */}
          <div className="mt-8">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
              <h3 className="font-space text-yellow-400 mb-4">Missing Documents</h3>
              <div className="space-y-2">
                {applications.map(app => app.missingDocs.length > 0 && (
                  <div key={app.id} className="flex items-center justify-between">
                    <div className="font-space text-gray-400">
                      {app.university}: {app.missingDocs.join(", ")}
                    </div>
                    <button className="font-space text-sm text-yellow-400 hover:text-yellow-300">
                      Upload →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Timeline Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-black/90 border border-gray-800 rounded-xl w-full max-w-2xl mx-4">
            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
              <div>
                <h2 className="font-space text-2xl text-white">{selectedApp.university}</h2>
                <p className="font-space text-gray-400">{selectedApp.program}</p>
              </div>
              <button 
                onClick={() => setSelectedApp(null)}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-8">
                {selectedApp.timeline.map((update, index) => (
                  <div key={index} className="relative pl-8">
                    {/* Timeline line */}
                    {index !== selectedApp.timeline.length - 1 && (
                      <div className="absolute left-[11px] top-8 w-0.5 h-full bg-gray-800"></div>
                    )}
                    
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1.5 w-[22px] h-[22px] rounded-full border-4 border-gray-800 bg-blue-500"></div>
                    
                    {/* Content */}
                    <div>
                      <span className="font-space text-sm text-gray-400 block mb-1">
                        {new Date(update.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                      <h3 className="font-space text-lg text-white mb-1">{update.status}</h3>
                      <p className="font-space text-sm text-gray-400">{update.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage; 