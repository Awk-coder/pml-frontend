import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCalendar, FiClock, FiMapPin, FiDollarSign, FiAward, FiBookOpen, FiBriefcase } from "react-icons/fi";
import Layout from "../components/layout/Layout";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { programs, programsById } from "../data/programs";

const ProgramDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Find the program by ID
  const program = id ? programsById[id] : null;
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // If program not found
  if (!isLoading && !program) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 mt-20">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">Program Not Found</h2>
            <p className="text-gray-400 mb-8">The program you're looking for doesn't exist or has been removed.</p>
            <Link 
              to="/programs" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700"
            >
              <FiArrowLeft className="mr-2" /> Back to Programs
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Loading state
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 mt-20">
          <div className="flex justify-center py-12">
            <LoadingSpinner size="large" />
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-20">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link 
            to="/programs" 
            className="inline-flex items-center text-blue-400 hover:text-blue-300"
          >
            <FiArrowLeft className="mr-2" /> Back to Programs
          </Link>
        </div>
        
        {/* Program Header */}
        <div className="bg-gray-900 rounded-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{program.title}</h1>
              <p className="text-xl text-gray-400 mb-4">{program.university?.name}</p>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="inline-flex items-center bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">
                  <FiAward className="mr-1" /> {program.level}
                </span>
                <span className="inline-flex items-center bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">
                  <FiClock className="mr-1" /> {program.duration}
                </span>
                <span className="inline-flex items-center bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">
                  <FiMapPin className="mr-1" /> {program.university?.location}
                </span>
                <span className="inline-flex items-center bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">
                  <FiDollarSign className="mr-1" /> RM {program.tuitionFee?.toLocaleString()}
                </span>
              </div>
            </div>
            
            <div className="mt-6 md:mt-0">
              <button 
                className="w-full md:w-auto px-6 py-3 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 mb-3"
                onClick={() => navigate(`/apply/${program.id}`)}
              >
                Apply Now
              </button>
              <button className="w-full md:w-auto px-6 py-3 bg-transparent border border-gray-600 rounded-lg text-white font-medium hover:bg-gray-800">
                Save Program
              </button>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex flex-wrap border-b border-gray-700 mb-8">
          <button
            className={`mr-6 py-3 font-medium ${
              activeTab === "overview"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`mr-6 py-3 font-medium ${
              activeTab === "curriculum"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("curriculum")}
          >
            Curriculum
          </button>
          <button
            className={`mr-6 py-3 font-medium ${
              activeTab === "requirements"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("requirements")}
          >
            Requirements
          </button>
          <button
            className={`mr-6 py-3 font-medium ${
              activeTab === "career"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("career")}
          >
            Career Paths
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="bg-gray-900 rounded-lg p-8">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Program Overview</h2>
              <p className="text-gray-300 mb-6 whitespace-pre-line">
                {program.overview || program.description}
              </p>
              
              {program.accreditation && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Accreditation</h3>
                  <p className="text-gray-300">{program.accreditation}</p>
                </div>
              )}
              
              {program.intakes && program.intakes.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Intake Dates</h3>
                  <div className="flex flex-wrap gap-2">
                    {program.intakes.map((intake, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center bg-gray-800 text-gray-300 px-3 py-1 rounded-md text-sm"
                      >
                        <FiCalendar className="mr-2" /> {intake}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {program.campuses && program.campuses.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Available Campuses</h3>
                  <div className="flex flex-wrap gap-2">
                    {program.campuses.map((campus, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center bg-gray-800 text-gray-300 px-3 py-1 rounded-md text-sm"
                      >
                        <FiMapPin className="mr-2" /> {campus}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Curriculum Tab */}
          {activeTab === "curriculum" && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Program Curriculum</h2>
              
              {/* Add disclaimer message */}
              <div className="bg-blue-900/30 border border-blue-800 rounded-lg p-4 mb-6">
                <p className="text-blue-300 text-sm">
                  <strong>Note:</strong> This curriculum is illustrative only and is provided for general information purposes. 
                  The actual curriculum may vary. Please contact the university directly for the most up-to-date and detailed curriculum information.
                </p>
              </div>
              
              {program.curriculum && Array.isArray(program.curriculum) && program.curriculum.length > 0 ? (
                <div className="space-y-8">
                  {program.curriculum.map((semester, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-white mb-4">
                        {semester.title || `Semester ${index + 1}`}
                      </h3>
                      <div className="space-y-4">
                        {Array.isArray(semester.courses) ? (
                          semester.courses.map((course, courseIndex) => (
                            <div key={courseIndex} className="border-b border-gray-700 pb-4 last:border-0 last:pb-0">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="text-lg font-medium text-white">{course.title}</h4>
                                <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm">
                                  {course.credits || 3} Credits
                                </span>
                              </div>
                              <p className="text-gray-400 text-sm">{course.description || "No description available"}</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-400">Course information not available for this semester.</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <p className="text-gray-400 mb-6">Detailed curriculum information is not available for this program.</p>
                  
                  {/* Add generic curriculum structure */}
                  <div className="bg-gray-800 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Typical Program Structure
                    </h3>
                    <p className="text-gray-300 mb-4">
                      This program typically follows a structured approach with core courses, electives, and possibly practical components or internships.
                    </p>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Core courses in the main subject area</li>
                      <li>• Specialized elective courses</li>
                      <li>• Practical training or laboratory work</li>
                      <li>• Research projects or dissertations (for higher-level programs)</li>
                      <li>• Internships or industry placements (where applicable)</li>
                    </ul>
                  </div>
                  
                  <p className="text-gray-400">
                    For specific curriculum details, please contact {program.university?.name || "the university"} directly.
                  </p>
                </div>
              )}
            </div>
          )}
          
          {/* Requirements Tab */}
          {activeTab === "requirements" && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Entry Requirements</h2>
              
              {program.requirements ? (
                <div className="space-y-8">
                  {program.requirements.academic && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Academic Requirements</h3>
                      <ul className="space-y-2">
                        {program.requirements.academic.map((req, index) => (
                          <li key={index} className="flex items-start text-gray-300">
                            <span className="inline-block w-5 h-5 bg-blue-900 text-blue-300 rounded-full flex-shrink-0 flex items-center justify-center mr-3 mt-0.5">
                              {index + 1}
                            </span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {program.requirements.english && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">English Language Requirements</h3>
                      <ul className="space-y-2">
                        {program.requirements.english.map((req, index) => (
                          <li key={index} className="flex items-start text-gray-300">
                            <span className="inline-block w-5 h-5 bg-blue-900 text-blue-300 rounded-full flex-shrink-0 flex items-center justify-center mr-3 mt-0.5">
                              {index + 1}
                            </span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {program.requirements.other && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Additional Requirements</h3>
                      <ul className="space-y-2">
                        {program.requirements.other.map((req, index) => (
                          <li key={index} className="flex items-start text-gray-300">
                            <span className="inline-block w-5 h-5 bg-blue-900 text-blue-300 rounded-full flex-shrink-0 flex items-center justify-center mr-3 mt-0.5">
                              {index + 1}
                            </span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-400">Detailed requirements information is not available for this program.</p>
              )}
            </div>
          )}
          
          {/* Career Tab */}
          {activeTab === "career" && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Career Opportunities</h2>
              
              {program.career ? (
                <div>
                  <p className="text-gray-300 mb-6">{program.career}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    {/* Sample career paths - these would ideally come from the program data */}
                    {program.career.split(',').map((career, index) => (
                      <div key={index} className="bg-gray-800 p-4 rounded-lg">
                        <div className="flex items-center mb-3">
                          <FiBriefcase className="text-blue-400 mr-2" />
                          <h3 className="text-lg font-medium text-white">{career.trim()}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-gray-400">Detailed career information is not available for this program.</p>
              )}
            </div>
          )}
        </div>
        
        {/* Similar Programs */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Similar Programs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programs
              .filter(p => p.id !== program.id && p.category === program.category)
              .slice(0, 3)
              .map(similarProgram => (
                <Link
                  to={`/programs/${similarProgram.id}`}
                  key={similarProgram.id}
                  className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition duration-300"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {similarProgram.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {similarProgram.university?.name}
                    </p>
                    <p className="text-gray-300 mb-4 line-clamp-2">
                      {similarProgram.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-semibold">
                        {similarProgram.tuitionFee &&
                          `RM ${similarProgram.tuitionFee.toLocaleString()}`}
                      </span>
                      <span className="text-xs text-blue-400">
                        View Details →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProgramDetailPage; 