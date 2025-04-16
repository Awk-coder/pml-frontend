import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "../../services/api";
import Navbar from "../../components/layout/Navbar";
import SquaresBackground from "../../components/layout/SquaresBackground";

const ProgramDetail: React.FC = () => {
  const { programId } = useParams<{ programId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"details" | "apply">("details");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    education: "",
    statement: "",
    documents: [] as File[]
  });

  const { data: program, isLoading } = useQuery({
    queryKey: ["program", programId],
    queryFn: () => api.getProgramById(programId as string)
  });

  const submitApplication = useMutation({
    mutationFn: (data: typeof formData) => 
      api.submitApplication(programId as string, data),
    onSuccess: () => {
      navigate("/student/dashboard");
      // Show success notification
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({ 
        ...prev, 
        documents: [...prev.documents, ...Array.from(e.target.files || [])]
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitApplication.mutate(formData);
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
            Back
          </button>

          {program && (
            <>
              <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 mb-6">
                <h1 className="font-orbitron text-3xl font-bold text-white mb-2">
                  {program.title}
                </h1>
                <p className="text-xl text-gray-300 mb-4">{program.university}</p>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="bg-gray-800 px-3 py-1 rounded-full text-gray-300 text-sm">
                    {program.level}
                  </div>
                  <div className="bg-gray-800 px-3 py-1 rounded-full text-gray-300 text-sm">
                    {program.duration}
                  </div>
                  <div className="bg-gray-800 px-3 py-1 rounded-full text-gray-300 text-sm">
                    {program.field}
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mb-6">
                <button
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === "details" 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-800 text-gray-300"
                  }`}
                  onClick={() => setActiveTab("details")}
                >
                  Program Details
                </button>
                <button
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === "apply" 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-800 text-gray-300"
                  }`}
                  onClick={() => setActiveTab("apply")}
                >
                  Apply Now
                </button>
              </div>

              {activeTab === "details" ? (
                <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                  <div className="prose prose-invert max-w-none">
                    <h2>Program Overview</h2>
                    <p>{program.description}</p>
                    
                    <h2>Requirements</h2>
                    <ul>
                      {program.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                    
                    <h2>Curriculum</h2>
                    <p>{program.curriculum}</p>
                    
                    <h2>Career Opportunities</h2>
                    <p>{program.careerOpportunities}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                  <h2 className="font-orbitron text-xl text-white mb-4">
                    Apply to {program.title}
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-400 mb-2">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-2">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-400 mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-2">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 mb-2">Education Background</label>
                      <textarea
                        name="education"
                        value={formData.education}
                        onChange={handleInputChange}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white h-32"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 mb-2">Personal Statement</label>
                      <textarea
                        name="statement"
                        value={formData.statement}
                        onChange={handleInputChange}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white h-32"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 mb-2">Upload Documents</label>
                      <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
                        <input
                          type="file"
                          multiple
                          onChange={handleFileChange}
                          className="hidden"
                          id="document-upload"
                        />
                        <label 
                          htmlFor="document-upload"
                          className="cursor-pointer text-blue-500 hover:text-blue-400"
                        >
                          Click to upload or drag and drop
                        </label>
                        <p className="text-gray-500 text-sm mt-1">
                          PDF, DOC, DOCX up to 10MB each
                        </p>
                        
                        {formData.documents.length > 0 && (
                          <div className="mt-4 text-left">
                            <p className="text-gray-400 mb-2">Uploaded files:</p>
                            <ul className="space-y-1">
                              {formData.documents.map((file, index) => (
                                <li key={index} className="text-gray-300 flex items-center">
                                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  {file.name}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
                        disabled={submitApplication.isPending}
                      >
                        {submitApplication.isPending ? "Submitting..." : "Submit Application"}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail; 