import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { FiEdit2, FiSave, FiCamera, FiMapPin, FiMail, FiPhone, FiGlobe, FiInfo } from "react-icons/fi";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../../components/common/LoadingSpinner";

interface UniversityProfileData {
  name: string;
  logo: string | null;
  email: string;
  phone: string;
  website: string;
  foundedYear: string;
  accreditations: string[];
  description: string;
  location: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  contactPerson: {
    name: string;
    position: string;
    email: string;
    phone: string;
  };
}

const UniversityProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("general");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileData, setProfileData] = useState<UniversityProfileData>({
    name: "",
    logo: null,
    email: "",
    phone: "",
    website: "",
    foundedYear: "",
    accreditations: [],
    description: "",
    location: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    contactPerson: {
      name: "",
      position: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        // In a real application, you would get this from your API
        if (typeof window !== "undefined" && 
            window.location.hostname === "localhost" && 
            !import.meta.env.VITE_USE_REAL_API) {
          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 800));
          
          setProfileData({
            name: "Oxford University",
            logo: null,
            email: "admissions@oxford.edu",
            phone: "+44 1865 270000",
            website: "www.oxford.edu",
            foundedYear: "1096",
            accreditations: ["Higher Education Commission", "QAA", "Russell Group"],
            description: "Oxford is a collegiate research university. It has the oldest university in the English-speaking world and the world's second-oldest university in continuous operation.",
            location: {
              street: "Oxford University, Wellington Square",
              city: "Oxford",
              state: "Oxfordshire",
              postalCode: "OX1 2JD",
              country: "United Kingdom",
            },
            contactPerson: {
              name: "Dr. Sarah Johnson",
              position: "Director of International Admissions",
              email: "s.johnson@oxford.edu",
              phone: "+44 1865 270001",
            },
          });
        } else {
          const response = await api.getUniversityProfile();
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
      if (typeof window !== "undefined" && 
          window.location.hostname !== "localhost" || 
          import.meta.env.VITE_USE_REAL_API) {
        await api.updateUniversityProfile(profileData);
      } else {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      
      setIsEditMode(false);
      toast.success("University profile updated successfully");
    } catch (err) {
      toast.error("Failed to update profile");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    section?: string
  ) => {
    const { name, value } = e.target;
    
    if (section) {
      setProfileData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          [name]: value,
        },
      }));
    } else {
      setProfileData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setProfileData((prev) => ({
            ...prev,
            logo: event.target?.result as string,
          }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-900/30 p-6 pb-16 relative">
          <div className="flex justify-between">
            <h1 className="text-3xl font-orbitron text-white mb-2">University Profile</h1>
            
            <button
              onClick={() => {
                if (isEditMode) {
                  handleSaveProfile();
                } else {
                  setIsEditMode(true);
                }
              }}
              disabled={isSaving}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isEditMode ? (
                <>
                  {isSaving ? "Saving..." : "Save Changes"}
                  <FiSave className="ml-2" />
                </>
              ) : (
                <>
                  Edit Profile
                  <FiEdit2 className="ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Logo and Basic Info */}
        <div className="flex flex-col md:flex-row relative px-6">
          <div className="md:w-1/3 -mt-16">
            <div className="relative rounded-lg overflow-hidden bg-gray-800 border-4 border-gray-900 w-40 h-40">
              {profileData.logo ? (
                <img 
                  src={profileData.logo} 
                  alt={`${profileData.name} Logo`} 
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-blue-900/20 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                  </svg>
                </div>
              )}
              
              {isEditMode && (
                <label className="absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer opacity-0 hover:opacity-100 transition-opacity">
                  <FiCamera size={24} className="text-white" />
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleLogoUpload}
                  />
                </label>
              )}
            </div>
            
            <div className="mt-4">
              <h2 className="text-2xl font-semibold text-white">
                {profileData.name}
              </h2>
              <p className="text-gray-400 flex items-center mt-1">
                <FiMail className="mr-2" /> {profileData.email}
              </p>
              <p className="text-gray-400 flex items-center mt-1">
                <FiPhone className="mr-2" /> {profileData.phone}
              </p>
              <p className="text-gray-400 flex items-center mt-1">
                <FiGlobe className="mr-2" /> {profileData.website}
              </p>
              <p className="text-gray-400 flex items-center mt-1">
                <FiMapPin className="mr-2" /> {profileData.location.city}, {profileData.location.country}
              </p>
              <p className="text-gray-400 flex items-center mt-1">
                <FiInfo className="mr-2" /> Founded in {profileData.foundedYear}
              </p>
            </div>
          </div>
          
          <div className="md:w-2/3 mt-6 md:mt-0">
            {/* Tab Navigation */}
            <div className="border-b border-gray-800">
              <nav className="-mb-px flex space-x-6">
                <button
                  onClick={() => setActiveTab("general")}
                  className={`py-2 px-1 ${
                    activeTab === "general"
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  General Information
                </button>
                <button
                  onClick={() => setActiveTab("contact")}
                  className={`py-2 px-1 ${
                    activeTab === "contact"
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  Contact Details
                </button>
                <li>
                  <button
                    className={`py-2 px-4 focus:outline-none ${
                      activeTab === "accreditations"
                        ? "text-white border-b-2 border-blue-500 font-medium"
                        : "text-gray-400 hover:text-white"
                    }`}
                    onClick={() => setActiveTab("accreditations")}
                  >
                    Accreditations
                  </button>
                </li>
                <li>
                  <button
                    className={`py-2 px-4 focus:outline-none ${
                      activeTab === "programs"
                        ? "text-white border-b-2 border-blue-500 font-medium"
                        : "text-gray-400 hover:text-white"
                    }`}
                    onClick={() => setActiveTab("programs")}
                  >
                    Programs
                  </button>
                </li>
              </nav>
            </div>
            
            {/* Tab Content */}
            <div className="py-6">
              {/* General Information Tab */}
              {activeTab === "general" && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-400 mb-2">University Name</label>
                    {isEditMode ? (
                      <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleInputChange}
                        className="bg-gray-800 text-white w-full px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      />
                    ) : (
                      <p className="text-white">{profileData.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 mb-2">Description</label>
                    {isEditMode ? (
                      <textarea
                        name="description"
                        value={profileData.description}
                        onChange={handleInputChange}
                        rows={4}
                        className="bg-gray-800 text-white w-full px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      />
                    ) : (
                      <p className="text-white">{profileData.description}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-400 mb-2">Founded Year</label>
                      {isEditMode ? (
                        <input
                          type="text"
                          name="foundedYear"
                          value={profileData.foundedYear}
                          onChange={handleInputChange}
                          className="bg-gray-800 text-white w-full px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        />
                      ) : (
                        <p className="text-white">{profileData.foundedYear}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 mb-2">Website</label>
                      {isEditMode ? (
                        <input
                          type="text"
                          name="website"
                          value={profileData.website}
                          onChange={handleInputChange}
                          className="bg-gray-800 text-white w-full px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        />
                      ) : (
                        <p className="text-white">{profileData.website}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Contact Details Tab */}
              {activeTab === "contact" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-400 mb-2">Email</label>
                      {isEditMode ? (
                        <input
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleInputChange}
                          className="bg-gray-800 text-white w-full px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        />
                      ) : (
                        <p className="text-white">{profileData.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 mb-2">Phone</label>
                      {isEditMode ? (
                        <input
                          type="text"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleInputChange}
                          className="bg-gray-800 text-white w-full px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        />
                      ) : (
                        <p className="text-white">{profileData.phone}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg text-white mb-3">Location</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-400 mb-2">Street Address</label>
                        {isEditMode ? (
                          <input
                            type="text"
                            name="street"
                            value={profileData.location.street}
                            onChange={(e) => handleInputChange(e, "location")}
                            className="bg-gray-800 text-white w-full px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          />
                        ) : (
                          <p className="text-white">{profileData.location.street}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 mb-2">City</label>
                        {isEditMode ? (
                          <input
                            type="text"
                            name="city"
                            value={profileData.location.city}
                            onChange={(e) => handleInputChange(e, "location")}
                            className="bg-gray-800 text-white w-full px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          />
                        ) : (
                          <p className="text-white">{profileData.location.city}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 mb-2">State/Province</label>
                        {isEditMode ? (
                          <input
                            type="text"
                            name="state"
                            value={profileData.location.state}
                            onChange={(e) => handleInputChange(e, "location")}
                            className="bg-gray-800 text-white w-full px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          />
                        ) : (
                          <p className="text-white">{profileData.location.state}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 mb-2">Postal Code</label>
                        {isEditMode ? (
                          <input
                            type="text"
                            name="postalCode"
                            value={profileData.location.postalCode}
                            onChange={(e) => handleInputChange(e, "location")}
                            className="bg-gray-800 text-white w-full px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          />
                        ) : (
                          <p className="text-white">{profileData.location.postalCode}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 mb-2">Country</label>
                        {isEditMode ? (
                          <input
                            type="text"
                            name="country"
                            value={profileData.location.country}
                            onChange={(e) => handleInputChange(e, "location")}
                            className="bg-gray-800 text-white w-full px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          />
                        ) : (
                          <p className="text-white">{profileData.location.country}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg text-white mb-3">Primary Contact Person</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-400 mb-2">Full Name</label>
                        {isEditMode ? (
                          <input
                            type="text"
                            name="name"
                            value={profileData.contactPerson.name}
                            onChange={(e) => handleInputChange(e, "contactPerson")}
                            className="bg-gray-800 text-white w-full px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          />
                        ) : (
                          <p className="text-white">{profileData.contactPerson.name}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 mb-2">Position/Title</label>
                        {isEditMode ? (
                          <input
                            type="text"
                            name="position"
                            value={profileData.contactPerson.position}
                            onChange={(e) => handleInputChange(e, "contactPerson")}
                            className="bg-gray-800 text-white w-full px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          />
                        ) : (
                          <p className="text-white">{profileData.contactPerson.position}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 mb-2">Email Address</label>
                        {isEditMode ? (
                          <input
                            type="email"
                            name="email"
                            value={profileData.contactPerson.email}
                            onChange={(e) => handleInputChange(e, "contactPerson")}
                            className="bg-gray-800 text-white w-full px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          />
                        ) : (
                          <p className="text-white">{profileData.contactPerson.email}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 mb-2">Phone Number</label>
                        {isEditMode ? (
                          <input
                            type="text"
                            name="phone"
                            value={profileData.contactPerson.phone}
                            onChange={(e) => handleInputChange(e, "contactPerson")}
                            className="bg-gray-800 text-white w-full px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          />
                        ) : (
                          <p className="text-white">{profileData.contactPerson.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Accreditations Tab */}
              {activeTab === "accreditations" && (
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg text-white">Accreditations & Certifications</h3>
                      
                      {isEditMode && (
                        <button
                          type="button"
                          onClick={() => {
                            setProfileData((prev) => ({
                              ...prev,
                              accreditations: [...prev.accreditations, ""]
                            }));
                          }}
                          className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
                        >
                          Add New
                        </button>
                      )}
                    </div>
                    
                    {profileData.accreditations.length > 0 ? (
                      <ul className="space-y-3">
                        {profileData.accreditations.map((item, index) => (
                          <li key={index} className="flex items-center">
                            {isEditMode ? (
                              <div className="flex items-center w-full">
                                <input
                                  type="text"
                                  value={item}
                                  onChange={(e) => {
                                    const newAccreditations = [...profileData.accreditations];
                                    newAccreditations[index] = e.target.value;
                                    setProfileData((prev) => ({
                                      ...prev,
                                      accreditations: newAccreditations
                                    }));
                                  }}
                                  className="bg-gray-800 text-white flex-grow px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newAccreditations = [...profileData.accreditations];
                                    newAccreditations.splice(index, 1);
                                    setProfileData((prev) => ({
                                      ...prev,
                                      accreditations: newAccreditations
                                    }));
                                  }}
                                  className="ml-2 text-red-400 hover:text-red-500"
                                >
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                  </svg>
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center bg-gray-800/60 px-4 py-3 rounded-lg w-full">
                                <span className="text-blue-400 mr-2">•</span>
                                <span className="text-white">{item}</span>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-400 italic">No accreditations added yet.</p>
                    )}
                    
                    <div className="mt-6">
                      <p className="text-gray-400 text-sm">
                        Accreditations and certifications help students evaluate the quality and reputation of your institution. List all relevant recognitions from educational authorities.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Programs Tab */}
              {activeTab === "programs" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg text-white">Programs Overview</h3>
                    <button
                      type="button"
                      onClick={() => window.location.href = '/university/programs'}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      Manage Programs
                    </button>
                  </div>
                  
                  <div className="bg-gray-800/50 p-6 rounded-lg">
                    <p className="text-white mb-4">
                      Your institution's academic programs are managed in the Programs section. There you can:
                    </p>
                    <ul className="text-gray-300 space-y-2 list-disc list-inside">
                      <li>Add new degree, certificate, and diploma programs</li>
                      <li>Update program details, requirements, and tuition</li>
                      <li>Manage program availability and application deadlines</li>
                      <li>View and respond to student applications for each program</li>
                    </ul>
                    
                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={() => window.location.href = '/university/programs'}
                        className="inline-flex items-center text-blue-400 hover:text-blue-300"
                      >
                        <span>Go to Programs Dashboard</span>
                        <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityProfilePage; 