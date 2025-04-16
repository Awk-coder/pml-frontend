import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { FiUser, FiMail, FiPhone, FiCalendar, FiMapPin, FiEdit2, FiSave, FiCamera } from "react-icons/fi";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  bio: string;
  profilePhoto: string | null;
  academicBackground: {
    highestQualification: string;
    institution: string;
    graduationYear: string;
    gpa: string;
  };
  preferences: {
    studyLevel: string[];
    preferredCountries: string[];
    preferredSubjects: string[];
    budgetRange: string;
  };
  education: {
    level: string;
    institution: string;
    yearOfCompletion: string;
  };
}

const StudentProfilePage: React.FC = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    nationality: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    bio: "",
    profilePhoto: null,
    academicBackground: {
      highestQualification: "",
      institution: "",
      graduationYear: "",
      gpa: "",
    },
    preferences: {
      studyLevel: [],
      preferredCountries: [],
      preferredSubjects: [],
      budgetRange: "",
    },
    education: {
      level: "",
      institution: "",
      yearOfCompletion: "",
    },
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        // In a real application, you would get this from your API
        if (USE_MOCK_DATA) {
          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 800));
          
          setProfileData({
            firstName: user?.firstName || "John",
            lastName: user?.lastName || "Doe",
            email: user?.email || "john.doe@example.com",
            phone: "+1 (555) 123-4567",
            dateOfBirth: "1998-05-15",
            nationality: "United States",
            address: {
              street: "123 University Ave",
              city: "Boston",
              state: "Massachusetts",
              postalCode: "02115",
              country: "United States",
            },
            bio: "Passionate about computer science and artificial intelligence. Looking to pursue graduate studies abroad.",
            profilePhoto: null,
            academicBackground: {
              highestQualification: "Bachelor's Degree",
              institution: "Boston University",
              graduationYear: "2023",
              gpa: "3.8",
            },
            preferences: {
              studyLevel: ["Master's", "PhD"],
              preferredCountries: ["United Kingdom", "Canada", "Australia"],
              preferredSubjects: ["Computer Science", "Artificial Intelligence"],
              budgetRange: "$15,000 - $25,000",
            },
            education: {
              level: "Bachelor's Degree",
              institution: "Boston University",
              yearOfCompletion: "2023",
            },
          });
        } else {
          const response = await api.getStudentProfile();
          setProfileData(response);
        }
      } catch (err) {
        toast.error("Failed to load profile data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfileData();
  }, [user]);

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      
      // In a real application, you would make an API call to save the data
      if (!USE_MOCK_DATA) {
        await api.updateStudentProfile(profileData);
      } else {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      
      setIsEditMode(false);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("Failed to update profile");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };
  
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // In a real application, you would upload this to your server/cloud storage
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock implementation - create a data URL to display the image
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileData({
            ...profileData,
            profilePhoto: event.target.result as string,
          });
          toast.success("Profile photo updated");
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      toast.error("Failed to upload photo");
      console.error(err);
    }
  };
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    section?: string,
    subsection?: string
  ) => {
    const { name, value } = e.target;
    
    if (section === "address") {
      setProfileData({
        ...profileData,
        address: {
          ...profileData.address,
          [name]: value,
        },
      });
    } else if (section === "academicBackground") {
      setProfileData({
        ...profileData,
        academicBackground: {
          ...profileData.academicBackground,
          [name]: value,
        },
      });
    } else if (section === "preferences") {
      if (name === "studyLevel" || name === "preferredCountries" || name === "preferredSubjects") {
        // Handle multi-select options
        const select = e.target as HTMLSelectElement;
        const options = Array.from(select.selectedOptions).map(option => option.value);
        
        setProfileData({
          ...profileData,
          preferences: {
            ...profileData.preferences,
            [name]: options,
          },
        });
      } else {
        setProfileData({
          ...profileData,
          preferences: {
            ...profileData.preferences,
            [name]: value,
          },
        });
      }
    } else if (section === "education") {
      setProfileData({
        ...profileData,
        education: {
          ...profileData.education,
          [name]: value,
        },
      });
    } else {
      // Handle top-level fields
      setProfileData({
        ...profileData,
        [name]: value,
      });
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full py-16">
        <LoadingSpinner size="large" />
      </div>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">My Profile</h2>
          
          <button
            onClick={() => isEditMode ? handleSaveProfile() : setIsEditMode(true)}
            className={`px-4 py-2 rounded-lg ${
              isEditMode 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white flex items-center`}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <LoadingSpinner size="small" />
                <span className="ml-2">Saving...</span>
              </>
            ) : isEditMode ? (
              <>
                <FiSave className="mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <FiEdit2 className="mr-2" />
                Edit Profile
              </>
            )}
          </button>
        </div>
        
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-900/30 border border-green-800 text-green-300' 
              : 'bg-red-900/30 border border-red-800 text-red-300'
          }`}>
            <div className="flex items-center">
              {message.type === 'success' 
                ? <FiCheckCircle className="mr-2" /> 
                : <FiAlertCircle className="mr-2" />
              }
              {message.text}
            </div>
          </div>
        )}
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="large" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Profile sidebar */}
            <div className="md:col-span-1">
              <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <div className="flex flex-col items-center mb-4">
                  <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center mb-4 overflow-hidden">
                    {profileData.profilePhoto ? (
                      <img 
                        src={profileData.profilePhoto} 
                        alt={`${profileData.firstName} ${profileData.lastName}`} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FiUser size={48} className="text-gray-500" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {profileData.firstName} {profileData.lastName}
                  </h3>
                  <p className="text-gray-400">{profileData.email}</p>
                </div>
                
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveTab('personal')}
                    className={`w-full text-left px-4 py-2 rounded-lg ${
                      activeTab === 'personal' 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    Personal Information
                  </button>
                  <button
                    onClick={() => setActiveTab('education')}
                    className={`w-full text-left px-4 py-2 rounded-lg ${
                      activeTab === 'education' 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    Education
                  </button>
                  <button
                    onClick={() => setActiveTab('contact')}
                    className={`w-full text-left px-4 py-2 rounded-lg ${
                      activeTab === 'contact' 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    Contact Information
                  </button>
                </div>
              </div>
            </div>
            
            {/* Profile content */}
            <div className="md:col-span-3">
              <div className="bg-gray-800 rounded-lg p-6">
                {activeTab === 'personal' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white mb-4">Personal Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-400 mb-1">First Name</label>
                        {isEditMode ? (
                          <input
                            type="text"
                            name="firstName"
                            value={profileData.firstName}
                            onChange={handleInputChange}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                          />
                        ) : (
                          <p className="text-white">{profileData.firstName}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 mb-1">Last Name</label>
                        {isEditMode ? (
                          <input
                            type="text"
                            name="lastName"
                            value={profileData.lastName}
                            onChange={handleInputChange}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                          />
                        ) : (
                          <p className="text-white">{profileData.lastName}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 mb-1">Date of Birth</label>
                        {isEditMode ? (
                          <input
                            type="date"
                            name="dateOfBirth"
                            value={profileData.dateOfBirth}
                            onChange={handleInputChange}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                          />
                        ) : (
                          <p className="text-white">
                            {profileData.dateOfBirth ? new Date(profileData.dateOfBirth).toLocaleDateString() : 'Not specified'}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 mb-1">Nationality</label>
                        {isEditMode ? (
                          <select 
                            name="nationality"
                            value={profileData.nationality}
                            onChange={handleInputChange}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                          >
                            <option value="">Select Nationality</option>
                            <option value="Malaysian">Malaysian</option>
                            <option value="Indonesian">Indonesian</option>
                            <option value="Singaporean">Singaporean</option>
                            <option value="Thai">Thai</option>
                            <option value="Other">Other</option>
                          </select>
                        ) : (
                          <p className="text-white">{profileData.nationality || 'Not specified'}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'education' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white mb-4">Education Background</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-400 mb-1">Highest Education Level</label>
                        {isEditMode ? (
                          <select 
                            name="level"
                            value={profileData.education.level}
                            onChange={(e) => handleInputChange(e, 'education')}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                          >
                            <option value="">Select Education Level</option>
                            <option value="High School / SPM">High School / SPM</option>
                            <option value="Certificate">Certificate</option>
                            <option value="Diploma">Diploma</option>
                            <option value="Bachelor's Degree">Bachelor's Degree</option>
                            <option value="Master's Degree">Master's Degree</option>
                            <option value="PhD">PhD</option>
                          </select>
                        ) : (
                          <p className="text-white">{profileData.education.level || 'Not specified'}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 mb-1">Institution</label>
                        {isEditMode ? (
                          <input
                            type="text"
                            name="institution"
                            value={profileData.education.institution}
                            onChange={(e) => handleInputChange(e, 'education')}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                          />
                        ) : (
                          <p className="text-white">{profileData.education.institution || 'Not specified'}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 mb-1">Year of Completion</label>
                        {isEditMode ? (
                          <input
                            type="text"
                            name="yearOfCompletion"
                            value={profileData.education.yearOfCompletion}
                            onChange={(e) => handleInputChange(e, 'education')}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                          />
                        ) : (
                          <p className="text-white">{profileData.education.yearOfCompletion || 'Not specified'}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'contact' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-400 mb-1">Email</label>
                        <p className="text-white">{profileData.email}</p>
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 mb-1">Phone</label>
                        {isEditMode ? (
                          <input
                            type="text"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleInputChange}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                          />
                        ) : (
                          <p className="text-white">{profileData.phone || 'Not specified'}</p>
                        )}
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-gray-400 mb-1">Address</label>
                        {isEditMode ? (
                          <textarea
                            name="address"
                            value={profileData.address.street}
                            onChange={(e) => handleInputChange(e, 'address')}
                            rows={3}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                          />
                        ) : (
                          <p className="text-white">{profileData.address.street || 'Not specified'}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default StudentProfilePage; 