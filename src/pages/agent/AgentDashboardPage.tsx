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
import { FiSearch, FiUser, FiBookOpen, FiFileText, FiUsers, FiDollarSign, FiMessageSquare, FiSettings, FiPlus, FiClock, FiCheck, FiX, FiBarChart2 } from 'react-icons/fi';

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

  // Mock data for the dashboard
  const mockStudents = [
    {
      id: "stud-1",
      name: "John Doe",
      email: "john.doe@example.com",
      applications: 2,
      status: "active",
    },
    {
      id: "stud-2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      applications: 1,
      status: "pending",
    },
  ];

  const mockApplications = [
    {
      id: "app-1",
      student: "John Doe",
      program: "Bachelor of Computer Science",
      university: "UCMI University",
      status: "under_review",
      submittedDate: "2023-10-15",
    },
    {
      id: "app-2",
      student: "Jane Smith",
      program: "Master of Business Administration",
      university: "UCMI University",
      status: "approved",
      submittedDate: "2023-09-20",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <span className="bg-green-900/60 text-green-200 px-2 py-1 rounded-full text-xs flex items-center">
            <FiCheck className="mr-1" /> Active
          </span>
        );
      case "pending":
        return (
          <span className="bg-yellow-900/60 text-yellow-200 px-2 py-1 rounded-full text-xs flex items-center">
            <FiClock className="mr-1" /> Pending
          </span>
        );
      case "draft":
        return (
          <span className="bg-gray-700 text-gray-200 px-2 py-1 rounded-full text-xs flex items-center">
            <FiClock className="mr-1" /> Draft
          </span>
        );
      case "submitted":
        return (
          <span className="bg-blue-900/60 text-blue-200 px-2 py-1 rounded-full text-xs flex items-center">
            <FiFileText className="mr-1" /> Submitted
          </span>
        );
      case "under_review":
        return (
          <span className="bg-yellow-900/60 text-yellow-200 px-2 py-1 rounded-full text-xs flex items-center">
            <FiClock className="mr-1" /> Under Review
          </span>
        );
      case "approved":
        return (
          <span className="bg-green-900/60 text-green-200 px-2 py-1 rounded-full text-xs flex items-center">
            <FiCheck className="mr-1" /> Approved
          </span>
        );
      case "rejected":
        return (
          <span className="bg-red-900/60 text-red-200 px-2 py-1 rounded-full text-xs flex items-center">
            <FiX className="mr-1" /> Rejected
          </span>
        );
      default:
        return (
          <span className="bg-gray-700 text-gray-200 px-2 py-1 rounded-full text-xs">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="font-orbitron text-3xl font-bold mb-2">
            Agent Dashboard
          </h1>
          <p className="text-gray-400">
            Welcome back, {user?.firstName || "Agent"}
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-900 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400">Total Students</h3>
              <FiUsers className="text-blue-400" />
            </div>
            <p className="text-3xl font-bold">12</p>
            <p className="text-green-400 text-sm mt-2">+2 this month</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400">Applications</h3>
              <FiFileText className="text-purple-400" />
            </div>
            <p className="text-3xl font-bold">18</p>
            <p className="text-green-400 text-sm mt-2">+3 this month</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400">Success Rate</h3>
              <FiBarChart2 className="text-green-400" />
            </div>
            <p className="text-3xl font-bold">78%</p>
            <p className="text-green-400 text-sm mt-2">+5% from last month</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400">Commissions</h3>
              <FiDollarSign className="text-yellow-400" />
            </div>
            <p className="text-3xl font-bold">$2,450</p>
            <p className="text-green-400 text-sm mt-2">+$350 this month</p>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 2/3 width on large screens */}
          <div className="lg:col-span-2 space-y-6">
            {/* Students Section */}
            <div className="bg-gray-900 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-orbitron text-xl font-bold">My Students</h2>
                <Link
                  to="/agent/students/add"
                  className="flex items-center text-blue-400 hover:text-blue-300 text-sm"
                >
                  <FiPlus className="mr-1" /> Add Student
                </Link>
              </div>

              {mockStudents.length === 0 ? (
                <div className="text-center py-8 bg-gray-800/50 rounded-lg">
                  <p className="text-gray-400 mb-4">
                    You haven't added any students yet
                  </p>
                  <Link
                    to="/agent/students/add"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center"
                  >
                    <FiPlus className="mr-2" /> Add Student
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-400 border-b border-gray-800">
                        <th className="pb-2">Name</th>
                        <th className="pb-2">Email</th>
                        <th className="pb-2">Applications</th>
                        <th className="pb-2">Status</th>
                        <th className="pb-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockStudents.map((student) => (
                        <tr
                          key={student.id}
                          className="border-b border-gray-800 hover:bg-gray-800/30"
                        >
                          <td className="py-3">{student.name}</td>
                          <td className="py-3">{student.email}</td>
                          <td className="py-3">{student.applications}</td>
                          <td className="py-3">
                            {getStatusBadge(student.status)}
                          </td>
                          <td className="py-3 text-right">
                            <Link
                              to={`/agent/students/${student.id}`}
                              className="text-blue-400 hover:text-blue-300"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Applications Section */}
            <div className="bg-gray-900 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-orbitron text-xl font-bold">
                  Recent Applications
                </h2>
                <Link
                  to="/agent/applications"
                  className="flex items-center text-blue-400 hover:text-blue-300 text-sm"
                >
                  View All
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-gray-800">
                      <th className="pb-2">Student</th>
                      <th className="pb-2">Program</th>
                      <th className="pb-2">Status</th>
                      <th className="pb-2">Submitted</th>
                      <th className="pb-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockApplications.map((app) => (
                      <tr
                        key={app.id}
                        className="border-b border-gray-800 hover:bg-gray-800/30"
                      >
                        <td className="py-3">{app.student}</td>
                        <td className="py-3">{app.program}</td>
                        <td className="py-3">{getStatusBadge(app.status)}</td>
                        <td className="py-3">{app.submittedDate}</td>
                        <td className="py-3 text-right">
                          <Link
                            to={`/agent/applications/${app.id}`}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar - 1/3 width on large screens */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <div className="bg-gray-900 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-2xl mr-4">
                  {user?.firstName?.[0] || "A"}
                </div>
                <div>
                  <h2 className="font-bold">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <p className="text-gray-400 text-sm">{user?.email}</p>
                </div>
              </div>
              <div className="border-t border-gray-800 pt-4 mt-4">
                <Link
                  to="/profile/agent"
                  className="bg-gray-800 hover:bg-gray-700 text-white w-full py-2 rounded-lg flex items-center justify-center"
                >
                  <FiUser className="mr-2" /> Edit Profile
                </Link>
              </div>
            </div>

            {/* Commission Summary */}
            <div className="bg-gray-900 rounded-xl p-6">
              <h2 className="font-orbitron text-xl font-bold mb-4">
                Commission Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">This Month</span>
                  <span className="font-bold">$350</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Month</span>
                  <span className="font-bold">$420</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">This Year</span>
                  <span className="font-bold">$2,450</span>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-800">
                  <Link
                    to="/agent/commissions"
                    className="text-blue-400 hover:text-blue-300 flex items-center justify-center"
                  >
                    View Commission History
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-gray-900 rounded-xl p-6">
              <h2 className="font-orbitron text-xl font-bold mb-4">
                Quick Links
              </h2>
              <nav className="space-y-2">
                <Link
                  to="/agent/students"
                  className="flex items-center text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800"
                >
                  <FiUsers className="mr-3" /> All Students
                </Link>
                <Link
                  to="/agent/applications"
                  className="flex items-center text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800"
                >
                  <FiFileText className="mr-3" /> All Applications
                </Link>
                <Link
                  to="/agent/commissions"
                  className="flex items-center text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800"
                >
                  <FiDollarSign className="mr-3" /> Commissions
                </Link>
                <Link
                  to="/agent/messages"
                  className="flex items-center text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800"
                >
                  <FiMessageSquare className="mr-3" /> Messages
                </Link>
                <Link
                  to="/agent/settings"
                  className="flex items-center text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800"
                >
                  <FiSettings className="mr-3" /> Settings
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboardPage; 