import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import Navbar from "../../components/layout/Navbar";
import SquaresBackground from "../../components/layout/SquaresBackground";

interface ApplicationStatus {
  step: string;
  date: string;
  status: "completed" | "current" | "upcoming";
  notes?: string;
}

const ApplicationDetail: React.FC = () => {
  const { applicationId } = useParams<{ applicationId: string }>();
  const navigate = useNavigate();
  
  const { data: application, isLoading } = useQuery({
    queryKey: ["application", applicationId],
    queryFn: () => api.getApplicationById(applicationId as string)
  });

  const [messageText, setMessageText] = useState("");

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement message sending functionality
    console.log("Sending message:", messageText);
    setMessageText("");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="container mx-auto px-6 pt-24">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-800 rounded w-1/3"></div>
            <div className="h-60 bg-gray-800 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

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
          <button 
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center text-gray-400 hover:text-white"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Applications
          </button>

          {application && (
            <>
              <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 mb-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div>
                    <h1 className="font-orbitron text-3xl font-bold text-white mb-2">
                      {application.program.title}
                    </h1>
                    <p className="text-xl text-gray-300 mb-4">{application.program.university}</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                      application.status === "accepted" ? "bg-green-100 text-green-800" :
                      application.status === "rejected" ? "bg-red-100 text-red-800" :
                      "bg-yellow-100 text-yellow-800"
                    }`}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left column - Application details */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                    <h2 className="font-orbitron text-xl text-white mb-4">Application Status</h2>
                    
                    <div className="relative">
                      {/* Application timeline */}
                      <div className="ml-6 border-l-2 border-gray-700 py-2">
                        {application.timeline.map((item: ApplicationStatus, index: number) => (
                          <div key={index} className="mb-8 ml-6 relative">
                            {/* Status indicator */}
                            <div className={`absolute -left-9 mt-1.5 w-4 h-4 rounded-full ${
                              item.status === "completed" ? "bg-green-500" :
                              item.status === "current" ? "bg-blue-500" :
                              "bg-gray-700"
                            }`}></div>
                            
                            <div className="flex flex-col">
                              <span className="text-gray-300 font-medium">{item.step}</span>
                              <span className="text-gray-500 text-sm">{new Date(item.date).toLocaleDateString()}</span>
                              {item.notes && (
                                <p className="text-gray-400 mt-1 text-sm">{item.notes}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                    <h2 className="font-orbitron text-xl text-white mb-4">Application Details</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-gray-400 text-sm">Submitted On</h3>
                        <p className="text-white">{new Date(application.submittedDate).toLocaleDateString()}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-gray-400 text-sm">Application ID</h3>
                        <p className="text-white">{application.id}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-gray-400 text-sm">Program Details</h3>
                        <p className="text-white">{application.program.level} - {application.program.duration}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-gray-400 text-sm">Start Date</h3>
                        <p className="text-white">{application.program.startDate}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                    <h2 className="font-orbitron text-xl text-white mb-4">Submitted Documents</h2>
                    
                    <div className="space-y-3">
                      {application.documents.map((doc: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                          <div className="flex items-center">
                            <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="text-gray-300">{doc.name}</span>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            doc.status === "verified" ? "bg-green-900/50 text-green-400" :
                            "bg-yellow-900/50 text-yellow-400"
                          }`}>
                            {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Right column - Messages and actions */}
                <div className="space-y-6">
                  <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                    <h2 className="font-orbitron text-xl text-white mb-4">Messages</h2>
                    
                    <div className="h-64 overflow-y-auto mb-4 space-y-4">
                      {application.messages && application.messages.length > 0 ? (
                        application.messages.map((message: any, index: number) => (
                          <div key={index} className={`p-3 rounded-lg ${
                            message.sender === "university" 
                              ? "bg-gray-800 ml-4" 
                              : "bg-blue-900/30 mr-4 border border-blue-800"
                          }`}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium text-gray-300">
                                {message.sender === "university" ? application.program.university : "You"}
                              </span>
                              <span className="text-xs text-gray-500">
                                {new Date(message.date).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-gray-300 text-sm">{message.text}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-center py-8">No messages yet</p>
                      )}
                    </div>
                    
                    <form onSubmit={sendMessage} className="mt-4">
                      <div className="flex">
                        <input
                          type="text"
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          placeholder="Type a message..."
                          className="flex-1 bg-gray-900 border border-gray-700 rounded-l-lg px-4 py-2 text-white"
                        />
                        <button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg"
                        >
                          Send
                        </button>
                      </div>
                    </form>
                  </div>
                  
                  <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                    <h2 className="font-orbitron text-xl text-white mb-4">Actions</h2>
                    
                    <div className="space-y-3">
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
                        Update Information
                      </button>
                      
                      {application.status === "pending" && (
                        <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg">
                          Withdraw Application
                        </button>
                      )}
                      
                      <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg">
                        Download Application PDF
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetail; 