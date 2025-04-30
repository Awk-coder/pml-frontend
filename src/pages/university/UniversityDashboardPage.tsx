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
import { FiPlus, FiSearch, FiEdit, FiTrash, FiUser, FiFileText, FiBookOpen, FiUsers, FiClock, FiCheck, FiX, FiBarChart2 } from 'react-icons/fi';

const UniversityDashboardPage: React.FC = () => {
  const { user, profile } = useAuth();
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

  const getStatusBadge = (status: string) => {
    switch (status) {
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
            University Dashboard
          </h1>
          <p className="text-gray-400">
            Welcome back, {profile?.first_name || "University Admin"}
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-900 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400">Total Programs</h3>
              <FiBookOpen className="text-blue-400" />
            </div>
            <p className="text-3xl font-bold">12</p>
            <p className="text-green-400 text-sm mt-2">+2 this month</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400">Applications</h3>
              <FiFileText className="text-purple-400" />
            </div>
            <p className="text-3xl font-bold">43</p>
            <p className="text-green-400 text-sm mt-2">+8 this month</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400">Enrolled Students</h3>
              <FiUsers className="text-green-400" />
            </div>
            <p className="text-3xl font-bold">156</p>
            <p className="text-green-400 text-sm mt-2">+12 this month</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400">Acceptance Rate</h3>
              <FiBarChart2 className="text-yellow-400" />
            </div>
            <p className="text-3xl font-bold">68%</p>
            <p className="text-green-400 text-sm mt-2">+3% this month</p>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 2/3 width on large screens */}
          <div className="lg:col-span-2 space-y-6">
            {/* Applications Section */}
            <div className="bg-gray-900 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-orbitron text-xl font-bold">
                  Recent Applications
                </h2>
                <Link
                  to="/university/applications"
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
                      <th className="pb-2">Agent</th>
                      <th className="pb-2">Status</th>
                      <th className="pb-2">Submitted</th>
                      <th className="pb-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                      <tr
                        key={app.id}
                        className="border-b border-gray-800 hover:bg-gray-800/30"
                      >
                        <td className="py-3">{app.student}</td>
                        <td className="py-3">{app.program}</td>
                        <td className="py-3">
                          {app.agent || <span className="text-gray-500">-</span>}
                        </td>
                        <td className="py-3">{getStatusBadge(app.status)}</td>
                        <td className="py-3">{app.submittedDate}</td>
                        <td className="py-3 text-right">
                          <Link
                            to={`/university/applications/${app.id}`}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            Review
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Programs Section */}
            <div className="bg-gray-900 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-orbitron text-xl font-bold">
                  My Programs
                </h2>
                <Link
                  to="/university/programs/add"
                  className="flex items-center text-blue-400 hover:text-blue-300 text-sm"
                >
                  <FiPlus className="mr-1" /> Add Program
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-gray-800">
                      <th className="pb-2">Program</th>
                      <th className="pb-2">Applications</th>
                      <th className="pb-2">Capacity</th>
                      <th className="pb-2">Start Date</th>
                      <th className="pb-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {programs.map((program) => (
                      <tr
                        key={program.id}
                        className="border-b border-gray-800 hover:bg-gray-800/30"
                      >
                        <td className="py-3">{program.title}</td>
                        <td className="py-3">{program.applications}</td>
                        <td className="py-3">{program.capacity}</td>
                        <td className="py-3">{program.startDate}</td>
                        <td className="py-3 text-right">
                          <Link
                            to={`/university/programs/${program.id}`}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            Edit
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
            {/* University Profile Summary */}
            <div className="bg-gray-900 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-2xl mr-4">
                  {profile?.first_name?.[0] || "U"}
                </div>
                <div>
                  <h2 className="font-bold">
                    UCMI University
                  </h2>
                  <p className="text-gray-400 text-sm">{profile?.email}</p>
                </div>
              </div>
              <div className="border-t border-gray-800 pt-4 mt-4">
                <Link
                  to="/profile/university"
                  className="bg-gray-800 hover:bg-gray-700 text-white w-full py-2 rounded-lg flex items-center justify-center"
                >
                  <FiUser className="mr-2" /> Edit Profile
                </Link>
              </div>
            </div>

            {/* Application Stats */}
            <div className="bg-gray-900 rounded-xl p-6">
              <h2 className="font-orbitron text-xl font-bold mb-4">
                Application Stats
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Pending Review</span>
                  <span className="font-bold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Approved</span>
                  <span className="font-bold">28</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Rejected</span>
                  <span className="font-bold">3</span>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-800">
                  <Link
                    to="/university/applications"
                    className="text-blue-400 hover:text-blue-300 flex items-center justify-center"
                  >
                    View All Applications
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
                  to="/university/programs"
                  className="flex items-center text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800"
                >
                  <FiBookOpen className="mr-3" /> All Programs
                </Link>
                <Link
                  to="/university/applications"
                  className="flex items-center text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800"
                >
                  <FiFileText className="mr-3" /> All Applications
                </Link>
                <Link
                  to="/university/students"
                  className="flex items-center text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800"
                >
                  <FiUsers className="mr-3" /> Enrolled Students
                </Link>
                <Link
                  to="/university/messages"
                  className="flex items-center text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800"
                >
                  <FiMessageSquare className="mr-3" /> Messages
                </Link>
                <Link
                  to="/university/settings"
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

export default UniversityDashboardPage; 