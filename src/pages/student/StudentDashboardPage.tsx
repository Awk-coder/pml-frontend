import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  getApplicationsByStudent, 
  getPrograms, 
  Application, 
  Program 
} from '../../services/localStorageService';
import { FiSearch, FiFilter, FiBookOpen, FiFileText, FiUser } from 'react-icons/fi';

const StudentDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'applications' | 'programs'>('applications');

  useEffect(() => {
    if (user) {
      // Load student's applications
      const studentApplications = getApplicationsByStudent(user.id);
      setApplications(studentApplications);
      
      // Load all programs
      const allPrograms = getPrograms();
      setPrograms(allPrograms);
    }
  }, [user]);

  // Get program details for an application
  const getProgramForApplication = (programId: string) => {
    return programs.find(program => program.id === programId);
  };

  // Filter programs based on search term
  const filteredPrograms = programs.filter(program => 
    program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.fieldOfStudy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white font-orbitron">Student Dashboard</h1>
            <p className="mt-1 text-gray-400">
              Welcome back, {user?.firstName} {user?.lastName}
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Link
              to="/student/profile"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <FiUser className="mr-2" />
              Profile
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('applications')}
              className={`${
                activeTab === 'applications'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <FiFileText className="mr-2" />
              My Applications
            </button>
            <button
              onClick={() => setActiveTab('programs')}
              className={`${
                activeTab === 'programs'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <FiBookOpen className="mr-2" />
              Browse Programs
            </button>
          </nav>
        </div>

        {/* Search and Filter */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-800 block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Content */}
        {activeTab === 'applications' && (
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">My Applications</h2>
            
            {applications.length === 0 ? (
              <div className="bg-gray-800 rounded-lg p-6 text-center">
                <p className="text-gray-400">You haven't applied to any programs yet.</p>
                <button
                  onClick={() => setActiveTab('programs')}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Browse Programs
                </button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {applications.map((application) => {
                  const program = getProgramForApplication(application.programId);
                  return (
                    <div key={application.id} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                      <div className="p-5">
                        <h3 className="text-lg font-medium text-white">{program?.name}</h3>
                        <p className="text-sm text-gray-400">{program?.university}</p>
                        
                        <div className="mt-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                            application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            application.status === 'reviewing' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </span>
                        </div>
                        
                        <div className="mt-4 flex justify-between">
                          <span className="text-sm text-gray-400">
                            Submitted: {new Date(application.submittedAt).toLocaleDateString()}
                          </span>
                          <Link
                            to={`/student/applications/${application.id}`}
                            className="text-blue-400 hover:text-blue-300 text-sm"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'programs' && (
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Available Programs</h2>
            
            {filteredPrograms.length === 0 ? (
              <div className="bg-gray-800 rounded-lg p-6 text-center">
                <p className="text-gray-400">No programs match your search criteria.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPrograms.map((program) => (
                  <div key={program.id} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                    <div className="p-5">
                      <h3 className="text-lg font-medium text-white">{program.name}</h3>
                      <p className="text-sm text-gray-400">{program.university}</p>
                      
                      <div className="mt-2">
                        <span className="text-sm text-gray-400">{program.degreeLevel} • {program.duration} years</span>
                      </div>
                      
                      <p className="mt-3 text-sm text-gray-300 line-clamp-3">{program.description}</p>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-sm text-gray-400">
                          Tuition: ${program.tuition.toLocaleString()}/year
                        </span>
                        <Link
                          to={`/student/programs/${program.id}`}
                          className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboardPage; 