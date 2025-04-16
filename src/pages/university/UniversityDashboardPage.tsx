import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  getProgramsByUniversity, 
  getApplicationsByProgram, 
  Program, 
  Application,
  updateApplication,
  createProgram,
  deleteProgram
} from '../../services/localStorageService';
import { FiPlus, FiSearch, FiEdit, FiTrash, FiUser, FiFileText, FiBookOpen } from 'react-icons/fi';

const UniversityDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'programs' | 'applications'>('programs');
  const [showAddProgram, setShowAddProgram] = useState(false);
  const [newProgram, setNewProgram] = useState({
    name: '',
    description: '',
    tuition: 0,
    duration: 1,
    degreeLevel: 'Bachelor',
    fieldOfStudy: '',
    applicationDeadline: '',
    startDate: '',
    requirements: ['']
  });

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = () => {
    if (!user) return;
    
    // Load university's programs
    const universityPrograms = getProgramsByUniversity(user.id);
    setPrograms(universityPrograms);
    
    // Load applications for all programs
    let allApplications: Application[] = [];
    universityPrograms.forEach(program => {
      const programApplications = getApplicationsByProgram(program.id);
      allApplications = [...allApplications, ...programApplications];
    });
    
    setApplications(allApplications);
  };

  const handleAddProgram = () => {
    if (!user) return;
    
    const program = {
      ...newProgram,
      university: `${user.firstName} ${user.lastName}'s University`,
      universityId: user.id,
      requirements: newProgram.requirements.filter(req => req.trim() !== '')
    };
    
    createProgram(program);
    setShowAddProgram(false);
    setNewProgram({
      name: '',
      description: '',
      tuition: 0,
      duration: 1,
      degreeLevel: 'Bachelor',
      fieldOfStudy: '',
      applicationDeadline: '',
      startDate: '',
      requirements: ['']
    });
    
    loadData();
  };

  const handleDeleteProgram = (programId: string) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      deleteProgram(programId);
      loadData();
    }
  };

  const handleUpdateApplicationStatus = (applicationId: string, status: 'pending' | 'reviewing' | 'accepted' | 'rejected') => {
    updateApplication(applicationId, { status });
    loadData();
  };

  // Filter programs based on search term
  const filteredPrograms = programs.filter(program => 
    program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.fieldOfStudy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter applications based on search term
  const filteredApplications = applications.filter(application => {
    const program = programs.find(p => p.id === application.programId);
    return program?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           application.status.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white font-orbitron">University Dashboard</h1>
            <p className="mt-1 text-gray-400">
              Welcome back, {user?.firstName} {user?.lastName}
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Link
              to="/university/profile"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <FiUser className="mr-2" />
              Profile
            </Link>
            <button
              onClick={() => setShowAddProgram(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              <FiPlus className="mr-2" />
              Add Program
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('programs')}
              className={`${
                activeTab === 'programs'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <FiBookOpen className="mr-2" />
              My Programs
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`${
                activeTab === 'applications'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <FiFileText className="mr-2" />
              Applications
            </button>
          </nav>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={activeTab === 'programs' ? "Search programs..." : "Search applications..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-800 block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Content */}
        {activeTab === 'programs' && (
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">My Programs</h2>
            
            {filteredPrograms.length === 0 ? (
              <div className="bg-gray-800 rounded-lg p-6 text-center">
                <p className="text-gray-400">You haven't created any programs yet.</p>
                <button
                  onClick={() => setShowAddProgram(true)}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  <FiPlus className="mr-2" />
                  Add Program
                </button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPrograms.map((program) => (
                  <div key={program.id} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                    <div className="p-5">
                      <h3 className="text-lg font-medium text-white">{program.name}</h3>
                      
                      <div className="mt-2">
                        <span className="text-sm text-gray-400">{program.degreeLevel} • {program.duration} years</span>
                      </div>
                      
                      <p className="mt-3 text-sm text-gray-300 line-clamp-3">{program.description}</p>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-sm text-gray-400">
                          Tuition: ${program.tuition.toLocaleString()}/year
                        </span>
                      </div>
                      
                      <div className="mt-4 flex justify-between">
                        <button
                          onClick={() => handleDeleteProgram(program.id)}
                          className="inline-flex items-center text-red-400 hover:text-red-300 text-sm"
                        >
                          <FiTrash className="mr-1" />
                          Delete
                        </button>
                        <Link
                          to={`/university/programs/${program.id}/edit`}
                          className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm"
                        >
                          <FiEdit className="mr-1" />
                          Edit
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'applications' && (
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Applications</h2>
            
            {filteredApplications.length === 0 ? (
              <div className="bg-gray-800 rounded-lg p-6 text-center">
                <p className="text-gray-400">No applications have been submitted to your programs yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Program
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Student
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Submitted
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {filteredApplications.map((application) => {
                      const program = programs.find(p => p.id === application.programId);
                      return (
                        <tr key={application.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-white">{program?.name}</div>
                            <div className="text-sm text-gray-400">{program?.degreeLevel}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-white">Student ID: {application.studentId}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-400">
                              {new Date(application.submittedAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                              application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              application.status === 'reviewing' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleUpdateApplicationStatus(application.id, 'reviewing')}
                                className="text-yellow-400 hover:text-yellow-300"
                              >
                                Review
                              </button>
                              <button
                                onClick={() => handleUpdateApplicationStatus(application.id, 'accepted')}
                                className="text-green-400 hover:text-green-300"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => handleUpdateApplicationStatus(application.id, 'rejected')}
                                className="text-red-400 hover:text-red-300"
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Add Program Modal */}
        {showAddProgram && (
          <div className="fixed inset-0 overflow-y-auto z-50">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
              </div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              <div className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-white">
                        Add New Program
                      </h3>
                      <div className="mt-4 space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-400">
                            Program Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={newProgram.name}
                            onChange={(e) => setNewProgram({...newProgram, name: e.target.value})}
                            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="description" className="block text-sm font-medium text-gray-400">
                            Description
                          </label>
                          <textarea
                            id="description"
                            rows={3}
                            value={newProgram.description}
                            onChange={(e) => setNewProgram({...newProgram, description: e.target.value})}
                            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="tuition" className="block text-sm font-medium text-gray-400">
                              Tuition ($/year)
                            </label>
                            <input
                              type="number"
                              id="tuition"
                              value={newProgram.tuition}
                              onChange={(e) => setNewProgram({...newProgram, tuition: Number(e.target.value)})}
                              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="duration" className="block text-sm font-medium text-gray-400">
                              Duration (years)
                            </label>
                            <input
                              type="number"
                              id="duration"
                              value={newProgram.duration}
                              onChange={(e) => setNewProgram({...newProgram, duration: Number(e.target.value)})}
                              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="degreeLevel" className="block text-sm font-medium text-gray-400">
                              Degree Level
                            </label>
                            <select
                              id="degreeLevel"
                              value={newProgram.degreeLevel}
                              onChange={(e) => setNewProgram({...newProgram, degreeLevel: e.target.value})}
                              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="Bachelor">Bachelor</option>
                              <option value="Master">Master</option>
                              <option value="PhD">PhD</option>
                              <option value="Diploma">Diploma</option>
                              <option value="Certificate">Certificate</option>
                            </select>
                          </div>
                          
                          <div>
                            <label htmlFor="fieldOfStudy" className="block text-sm font-medium text-gray-400">
                              Field of Study
                            </label>
                            <input
                              type="text"
                              id="fieldOfStudy"
                              value={newProgram.fieldOfStudy}
                              onChange={(e) => setNewProgram({...newProgram, fieldOfStudy: e.target.value})}
                              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="applicationDeadline" className="block text-sm font-medium text-gray-400">
                              Application Deadline
                            </label>
                            <input
                              type="date"
                              id="applicationDeadline"
                              value={newProgram.applicationDeadline}
                              onChange={(e) => setNewProgram({...newProgram, applicationDeadline: e.target.value})}
                              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-400">
                              Start Date
                            </label>
                            <input
                              type="date"
                              id="startDate"
                              value={newProgram.startDate}
                              onChange={(e) => setNewProgram({...newProgram, startDate: e.target.value})}
                              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-400">
                            Requirements
                          </label>
                          {newProgram.requirements.map((req, index) => (
                            <div key={index} className="mt-2 flex">
                              <input
                                type="text"
                                value={req}
                                onChange={(e) => {
                                  const updatedReqs = [...newProgram.requirements];
                                  updatedReqs[index] = e.target.value;
                                  setNewProgram({...newProgram, requirements: updatedReqs});
                                }}
                                className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              />
                              {index === newProgram.requirements.length - 1 && (
                                <button
                                  type="button"
                                  onClick={() => setNewProgram({
                                    ...newProgram, 
                                    requirements: [...newProgram.requirements, '']
                                  })}
                                  className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                  +
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={handleAddProgram}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Add Program
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddProgram(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-500 shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversityDashboardPage; 