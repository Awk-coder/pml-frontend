import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import SquaresBackground from "../../components/layout/SquaresBackground";
import Navbar from "../../components/layout/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  FiBookOpen,
  FiCheckCircle,
  FiClock,
  FiX,
  FiBell,
} from "react-icons/fi";
import Layout from "../../components/layout/Layout";
import LoadingSpinner from "../../components/common/LoadingSpinner";

// Define the application type
interface Application {
  id: string;
  program: {
    title: string;
    university: string;
  };
  status: "pending" | "accepted" | "rejected";
  submittedDate: string;
}

// Define the program type
interface Program {
  id: string;
  title: string;
  university: string;
  level: string;
  duration: string;
  description: string;
  image?: string;
  field?: string;
}

// Mock data
const MOCK_DATA = {
  applications: [
    {
      id: "APP-3234",
      program: "Diploma in Nursing",
      university: "MAIWP International University College",
      status: "Pending",
      date: "2023-11-15",
    },
    {
      id: "APP-3235",
      program: "Diploma in Business Management",
      university: "MAIWP International University College",
      status: "Approved",
      date: "2023-11-10",
    },
    {
      id: "APP-3236",
      program: "Bachelor of Computer Science",
      university: "Global Education Institute",
      status: "Rejected",
      date: "2023-10-25",
    },
  ],
  savedPrograms: [
    {
      id: "PRG-123",
      name: "Diploma in Medical Science",
      university: "MAIWP International University College",
      level: "Diploma",
      tuitionFee: 28000,
    },
    {
      id: "PRG-124",
      name: "Bachelor of Engineering",
      university: "International College of Technology",
      level: "Bachelor",
      tuitionFee: 45000,
    },
    {
      id: "PRG-125",
      name: "Diploma in Culinary Arts",
      university: "Asia Pacific University",
      level: "Diploma",
      tuitionFee: 25000,
    },
  ],
  notifications: [
    {
      id: "NOT-1",
      message: "Your application for Diploma in Nursing has been received",
      date: "2023-11-15",
      read: false,
    },
    {
      id: "NOT-2",
      message:
        "Your application for Diploma in Business Management has been approved",
      date: "2023-11-10",
      read: true,
    },
    {
      id: "NOT-3",
      message: "New scholarship opportunities available",
      date: "2023-11-05",
      read: false,
    },
  ],
};

const StudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("applications");
  const navigate = useNavigate();
  const { user } = useAuth();

  // Application data
  const { data: applications, isLoading } = useQuery({
    queryKey: ["studentApplications"],
    queryFn: () => api.getStudentApplications(),
  });

  // Program search state
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    university: "",
    level: "",
    field: "",
  });
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const programsPerPage = 9;

  // Get universities for filter dropdown
  const { data: universities } = useQuery({
    queryKey: ["universities"],
    queryFn: () => api.getUniversities(),
    enabled: activeTab === "programs",
  });

  // Get all programs
  const { data: programs, isLoading: programsLoading } = useQuery({
    queryKey: ["programs"],
    queryFn: () => api.getPrograms({}),
    enabled: activeTab === "programs",
  });

  // Filter programs based on search query and filters
  useEffect(() => {
    console.log("Programs data:", programs);

    if (!programs) {
      console.log("No programs data available");
      return;
    }

    let result = [...programs];
    console.log("Initial filtered result:", result);

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (program) =>
          program.title.toLowerCase().includes(query) ||
          program.university.toLowerCase().includes(query) ||
          program.description.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (filters.university) {
      result = result.filter(
        (program) => program.university === filters.university
      );
    }
    if (filters.level) {
      result = result.filter((program) => program.level === filters.level);
    }
    if (filters.field) {
      result = result.filter((program) => program.field === filters.field);
    }

    console.log("Final filtered result:", result);
    setFilteredPrograms(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, filters, programs]);

  // Handle search button click
  const handleSearch = () => {
    // The filtering is already handled by the useEffect
    // This function is mainly for the button click event
    console.log("Searching for:", searchQuery);
  };

  // Handle pagination
  const totalPages = Math.ceil(
    (filteredPrograms?.length || 0) / programsPerPage
  );
  const currentPrograms =
    filteredPrograms?.slice(
      (currentPage - 1) * programsPerPage,
      currentPage * programsPerPage
    ) || [];

  // Update the Profile Tab section in StudentDashboard.tsx

  // First, add these state variables at the top of the component
  const [firstName, setFirstName] = useState("John");
  const [dateOfBirth, setDateOfBirth] = useState("1998-05-15");
  const [nationality, setNationality] = useState("Malaysian");
  const [email, setEmail] = useState("john.doe@example.com");
  const [phone, setPhone] = useState("+60 12 345 6789");
  const [address, setAddress] = useState(
    "123 Main Street, Kuala Lumpur, Malaysia"
  );
  const [educationLevel, setEducationLevel] = useState("High School / SPM");
  const [institution, setInstitution] = useState("SMK Taman Melawati");
  const [yearOfCompletion, setYearOfCompletion] = useState("2022");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updateProfileMutation = useQuery({
    queryKey: ["updateProfile"],
    queryFn: () =>
      api.updateProfile({
        firstName,
        dateOfBirth,
        nationality,
        email,
        phone,
        address,
        educationLevel,
        institution,
        yearOfCompletion,
      }),
    enabled: false,
  });

  const changePasswordMutation = useQuery({
    queryKey: ["changePassword"],
    queryFn: () =>
      api.changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      }),
    enabled: false,
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.refetch();
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    changePasswordMutation.refetch();
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-3xl font-bold text-white mb-8">
          Student Dashboard
        </h1>

        {/* Tabs */}
        <div className="flex flex-wrap border-b border-gray-700 mb-8">
          <button
            className={`mr-4 py-2 px-4 font-medium ${
              activeTab === "applications"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("applications")}
          >
            My Applications
          </button>
          <button
            className={`mr-4 py-2 px-4 font-medium ${
              activeTab === "saved"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("saved")}
          >
            Saved Programs
          </button>
          <button
            className={`mr-4 py-2 px-4 font-medium ${
              activeTab === "notifications"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("notifications")}
          >
            Notifications
          </button>
          <button
            className={`mr-4 py-2 px-4 font-medium ${
              activeTab === "profile"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
        </div>

        {/* Applications Tab */}
        {activeTab === "applications" && (
          <div>
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">My Applications</h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                Browse Programs
              </button>
            </div>

            {MOCK_DATA.applications.length > 0 ? (
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-400 border-b border-gray-700">
                        <th className="px-6 py-3 font-medium">ID</th>
                        <th className="px-6 py-3 font-medium">Program</th>
                        <th className="px-6 py-3 font-medium">University</th>
                        <th className="px-6 py-3 font-medium">Status</th>
                        <th className="px-6 py-3 font-medium">Date</th>
                        <th className="px-6 py-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MOCK_DATA.applications.map((app) => (
                        <tr key={app.id} className="border-b border-gray-700">
                          <td className="px-6 py-4 text-white">{app.id}</td>
                          <td className="px-6 py-4 text-white">
                            {app.program}
                          </td>
                          <td className="px-6 py-4 text-white">
                            {app.university}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                app.status === "Approved"
                                  ? "bg-green-900 text-green-300"
                                  : app.status === "Rejected"
                                  ? "bg-red-900 text-red-300"
                                  : "bg-yellow-900 text-yellow-300"
                              }`}
                            >
                              {app.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-white">{app.date}</td>
                          <td className="px-6 py-4">
                            <button className="text-blue-400 hover:text-blue-300">
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <FiBookOpen className="mx-auto text-4xl text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">
                  No Applications Yet
                </h3>
                <p className="text-gray-400 mb-6">
                  You haven't applied to any programs yet. Browse our programs
                  and start your application.
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                  Browse Programs
                </button>
              </div>
            )}
          </div>
        )}

        {/* Saved Programs Tab */}
        {activeTab === "saved" && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">
              Saved Programs
            </h2>

            {MOCK_DATA.savedPrograms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_DATA.savedPrograms.map((program) => (
                  <div
                    key={program.id}
                    className="bg-gray-800 rounded-lg overflow-hidden"
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {program.name}
                      </h3>
                      <p className="text-gray-400 mb-4">{program.university}</p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="px-2 py-1 bg-gray-700 rounded text-sm text-gray-300">
                          {program.level}
                        </span>
                        <span className="text-white font-medium">
                          RM {program.tuitionFee.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <button className="text-blue-400 hover:text-blue-300">
                          View Details
                        </button>
                        <button className="text-red-400 hover:text-red-300">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <FiBookOpen className="mx-auto text-4xl text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">
                  No Saved Programs
                </h3>
                <p className="text-gray-400 mb-6">
                  You haven't saved any programs yet. Browse our programs and
                  save the ones you're interested in.
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                  Browse Programs
                </button>
              </div>
            )}
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div>
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Notifications</h2>
              <button className="text-gray-400 hover:text-white">
                Mark all as read
              </button>
            </div>

            {MOCK_DATA.notifications.length > 0 ? (
              <div className="space-y-4">
                {MOCK_DATA.notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg ${
                      notification.read
                        ? "bg-gray-800"
                        : "bg-gray-800 border-l-4 border-blue-500"
                    }`}
                  >
                    <div className="flex items-start">
                      <div
                        className={`p-2 rounded-full mr-4 ${
                          notification.read
                            ? "bg-gray-700 text-gray-400"
                            : "bg-blue-900 text-blue-300"
                        }`}
                      >
                        <FiBell className="text-lg" />
                      </div>
                      <div className="flex-1">
                        <p
                          className={`${
                            notification.read ? "text-gray-400" : "text-white"
                          } mb-1`}
                        >
                          {notification.message}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {notification.date}
                        </p>
                      </div>
                      {!notification.read && (
                        <button className="text-gray-400 hover:text-white">
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <FiBell className="mx-auto text-4xl text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">
                  No Notifications
                </h3>
                <p className="text-gray-400">
                  You don't have any notifications at the moment.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-6">
              Student Profile
            </h3>

            {updateProfileMutation.isSuccess ? (
              <div className="text-green-400 mb-4">
                Profile updated successfully!
              </div>
            ) : (
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-medium text-white mb-4">
                      Personal Information
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-400 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-1">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                          value={dateOfBirth}
                          onChange={(e) => setDateOfBirth(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-1">
                          Nationality
                        </label>
                        <select
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                          value={nationality}
                          onChange={(e) => setNationality(e.target.value)}
                        >
                          <option value="">Select Nationality</option>
                          <option value="Malaysian">Malaysian</option>
                          <option value="Indonesian">Indonesian</option>
                          <option value="Singaporean">Singaporean</option>
                          <option value="Thai">Thai</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-white mb-4">
                      Contact Information
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-400 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-1">
                          Phone
                        </label>
                        <input
                          type="text"
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-1">
                          Address
                        </label>
                        <textarea
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                          rows={3}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-lg font-medium text-white mb-4">
                    Education Background
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 mb-1">
                        Highest Education Level
                      </label>
                      <select
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                        value={educationLevel}
                        onChange={(e) => setEducationLevel(e.target.value)}
                      >
                        <option value="">Select Education Level</option>
                        <option value="High School / SPM">
                          High School / SPM
                        </option>
                        <option value="Certificate">Certificate</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Bachelor's Degree">
                          Bachelor's Degree
                        </option>
                        <option value="Master's Degree">Master's Degree</option>
                        <option value="PhD">PhD</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">
                        School/Institution
                      </label>
                      <input
                        type="text"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">
                        Year of Completion
                      </label>
                      <input
                        type="text"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                        value={yearOfCompletion}
                        onChange={(e) => setYearOfCompletion(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                    disabled={updateProfileMutation.isPending}
                  >
                    {updateProfileMutation.isPending ? (
                      <span className="flex items-center">
                        <LoadingSpinner size="small" />
                        <span className="ml-2">Saving...</span>
                      </span>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Password Change Form */}
            <form
              onSubmit={handlePasswordChange}
              className="bg-gray-800 rounded-lg p-6"
            >
              <h4 className="text-lg font-medium text-white mb-4">
                Change Password
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                  disabled={
                    changePasswordMutation.isPending ||
                    !currentPassword ||
                    !newPassword ||
                    !confirmPassword
                  }
                >
                  {changePasswordMutation.isPending ? (
                    <span className="flex items-center">
                      <LoadingSpinner size="small" />
                      <span className="ml-2">Updating...</span>
                    </span>
                  ) : (
                    "Update Password"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default StudentDashboard;
