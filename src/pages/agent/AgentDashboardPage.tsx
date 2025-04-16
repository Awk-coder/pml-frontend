import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  getPrograms, 
  getApplications,
  Program, 
  Application,
  User,
  getUsers,
  createApplication
} from '../../services/localStorageService';
import { FiSearch, FiUser, FiBookOpen, FiFileText } from 'react-icons/fi';

const AgentDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [students, setStudents] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'programs' | 'applications'>('programs');
  const [showAddApplication, setShowAddApplication] = useState(false);
  const [newApplication, setNewApplication] = useState({
    studentId: '',
    programId: '',
    notes: ''
  });

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = () => {
    // Load all programs
    const allPrograms = getPrograms();
    setPrograms(allPrograms);
    
    // Load all applications
    const allApplications = getApplications();
    setApplications(allApplications);
    
    // Load all students
    const allUsers = getUsers();
    const studentUsers = allUsers.filter(u => u.role === 'student');
    setStudents(studentUsers);
  };

  const handleAddApplication = () => {
    if (!newApplication.studentId || !newApplication.programId) return;
    
    const application = {
      ...newApplication,
      status: 'pending' as const,
      documents: []
    };
    
    createApplication(application);
    setShowAddApplication(false);
    setNewApplication({
      studentId: '',
      programId: '',
      notes: ''
    });
    
    loadData();
  };

  // Filter programs based on search term
  const filteredPrograms = programs.filter(program => 
    program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.fieldOfStudy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter applications based on search term
  const filteredApplications = applications.filter(application => {
    const program = programs.find(p => p.id === application.programId);
    const student = students.find(s => s.id === application.studentId);
    return program?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           student?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           student?.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           application.status.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Get student name for an application
  const getStudentName = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    return student ? `${student.firstName} ${student.lastName}` : 'Unknown Student';
  };

  // Get program name for an application
  const getProgramName = (programId: string) => {
    const program = programs.find(p => p.id === programId);
    return program ? program.name : 'Unknown Program';
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white font-orbitron">Agent Dashboard</h1>
            <p className="mt-1 text-gray-400">
              Welcome back, {user?.firstName} {user?.lastName}
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Link
              to="/agent/profile"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <FiUser className="mr-2" />
              Profile
            </Link>
            <button
              onClick={() => setShowAddApplication(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              <FiFileText className="mr-2" />
              New Application
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
              Available Programs
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
                        <button
                          onClick={() => {
                            setNewApplication({...newApplication, programId: program.id});
                            setShowAddApplication(true);
                          }}
                          className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                          Apply Student
                        </button>
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
                <p className="text-gray-400">No applications match your search criteria.</p>
                <button
                  onClick={() => setShowAddApplication(true)}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Create New Application
                </button>
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Student
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Program
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Submitted
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {filteredApplications.map((application) => (
                      <tr key={application.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{getStudentName(application.studentId)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">{getProgramName(application.programId)}</div>
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {new Date(application.submittedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          <Link
                            to={`/agent/applications/${application.id}`}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Add Application Modal */}
        {showAddApplication && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
              </div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              <div className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-white">
                        Create New Application
                      </h3>
                      <div className="mt-4 space-y-4">
                        <div>
                          <label htmlFor="student" className="block text-sm font-medium text-gray-400">
                            Student
                          </label>
                          <select
                            id="student"
                            value={newApplication.studentId}
                            onChange={(e) => setNewApplication({...newApplication, studentId: e.target.value})}
                            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select a student</option>
                            {students.map(student => (
                              <option key={student.id} value={student.id}>
                                {student.firstName} {student.lastName} ({student.email})
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="program" className="block text-sm font-medium text-gray-400">
                            Program
                          </label>
                          <select
                            id="program"
                            value={newApplication.programId}
                            onChange={(e) => setNewApplication({...newApplication, programId: e.target.value})}
                            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select a program</option>
                            {programs.map(program => (
                              <option key={program.id} value={program.id}>
                                {program.name} - {program.university}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="notes" className="block text-sm font-medium text-gray-400">
                            Notes
                          </label>
                          <textarea
                            id="notes"
                            rows={3}
                            value={newApplication.notes}
                            onChange={(e) => setNewApplication({...newApplication, notes: e.target.value})}
                            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Add any notes about this application..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={handleAddApplication}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Submit Application
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddApplication(false)}
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

export default AgentDashboardPage; 