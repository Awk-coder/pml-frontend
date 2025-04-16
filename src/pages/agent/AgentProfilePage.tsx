import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGlobe,
  FiEdit2,
  FiSave,
  FiCamera,
  FiBriefcase,
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../../components/common/LoadingSpinner";

interface AgentProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profilePhoto: string | null;
  agencyName: string;
  agencyWebsite: string;
  yearEstablished: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  territory: {
    countries: string[];
    specialization: string[];
  };
  bio: string;
  servicesOffered: string[];
}

const AgentProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("general");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileData, setProfileData] = useState<AgentProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    profilePhoto: null,
    agencyName: "",
    agencyWebsite: "",
    yearEstablished: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    territory: {
      countries: [],
      specialization: [],
    },
    bio: "",
    servicesOffered: [],
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        // In a real application, you would get this from your API
        if (
          typeof window !== "undefined" &&
          window.location.hostname === "localhost" &&
          !import.meta.env.VITE_USE_REAL_API
        ) {
          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 800));

          setProfileData({
            firstName: "James",
            lastName: "Peterson",
            email: "james@globaledurecruiters.com",
            phone: "+1 (555) 987-6543",
            profilePhoto: null,
            agencyName: "Global Education Recruiters",
            agencyWebsite: "www.globaledurecruiters.com",
            yearEstablished: "2010",
            address: {
              street: "123 Recruitment Avenue, Suite 400",
              city: "Toronto",
              state: "Ontario",
              postalCode: "M5V 2N4",
              country: "Canada",
            },
            territory: {
              countries: ["Canada", "India", "Nigeria", "Brazil", "Vietnam"],
              specialization: [
                "Undergraduate",
                "Graduate",
                "MBA",
                "Engineering",
              ],
            },
            bio: "Global Education Recruiters specializes in helping students find the right educational opportunities worldwide. With over 10 years of experience, we have helped thousands of students achieve their academic dreams.",
            servicesOffered: [
              "University Selection Guidance",
              "Application Assistance",
              "Visa Support",
              "Pre-departure Orientation",
              "Scholarship Guidance",
            ],
          });
        } else {
          const response = await api.getAgentProfile();
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
      if (
        (typeof window !== "undefined" &&
          window.location.hostname !== "localhost") ||
        import.meta.env.VITE_USE_REAL_API
      ) {
        await api.updateAgentProfile(profileData);
      } else {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));
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

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileData({
          ...profileData,
          profilePhoto: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    section?: string
  ) => {
    const { name, value } = e.target;

    if (section) {
      setProfileData({
        ...profileData,
        [section]: {
          ...(profileData[section as keyof AgentProfileData] as object),
          [name]: value,
        },
      });
    } else {
      setProfileData({
        ...profileData,
        [name]: value,
      });
    }
  };

  const handleArrayInput = (field: keyof AgentProfileData, value: string[]) => {
    setProfileData({
      ...profileData,
      [field]: value,
    });
  };

  const handleNestedArrayInput = (
    section: keyof AgentProfileData,
    field: string,
    value: string[]
  ) => {
    setProfileData({
      ...profileData,
      [section]: {
        ...(profileData[section] as object),
        [field]: value,
      },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 sm:p-10 flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 flex flex-col items-center">
              <div className="relative group">
                <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
                  {profileData.profilePhoto ? (
                    <img
                      src={profileData.profilePhoto}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiUser className="text-gray-400 text-6xl" />
                  )}
                </div>

                {isEditMode && (
                  <label
                    htmlFor="profile-photo-upload"
                    className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer"
                  >
                    <FiCamera className="text-white" />
                    <input
                      id="profile-photo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfilePhotoChange}
                    />
                  </label>
                )}
              </div>

              <div className="text-center mt-4 w-full">
                <div className="flex justify-center mt-6">
                  {isEditMode ? (
                    <div className="space-x-3">
                      <button
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                      >
                        {isSaving ? (
                          <>
                            <LoadingSpinner size="small" />
                            <span className="ml-2">Saving...</span>
                          </>
                        ) : (
                          <>
                            <FiSave className="mr-2" />
                            Save Profile
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => setIsEditMode(false)}
                        disabled={isSaving}
                        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsEditMode(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                    >
                      <FiEdit2 className="mr-2" />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-6 w-full">
                <h3 className="text-lg font-medium text-white mb-3">
                  Agent Info
                </h3>
                <div className="bg-gray-700 rounded-lg p-4">
                  <p className="text-gray-300 flex items-center mb-2">
                    <FiBriefcase className="mr-2 text-blue-400" />
                    {profileData.agencyName}
                  </p>
                  <p className="text-gray-300 flex items-center mb-2">
                    <FiGlobe className="mr-2 text-blue-400" />
                    {profileData.agencyWebsite}
                  </p>
                  <p className="text-gray-300 flex items-center mb-2">
                    <FiMail className="mr-2 text-blue-400" />
                    {profileData.email}
                  </p>
                  <p className="text-gray-300 flex items-center">
                    <FiPhone className="mr-2 text-blue-400" />
                    {profileData.phone}
                  </p>
                </div>
              </div>
            </div>

            <div className="md:w-2/3">
              {/* Tab Navigation */}
              <div className="border-b border-gray-700 mb-6">
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
                    onClick={() => setActiveTab("territory")}
                    className={`py-2 px-1 ${
                      activeTab === "territory"
                        ? "border-b-2 border-blue-500 text-blue-500"
                        : "text-gray-400 hover:text-gray-300"
                    }`}
                  >
                    Territory & Services
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div>
                {/* General Information Tab */}
                {activeTab === "general" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-gray-400 mb-2">
                          First Name
                        </label>
                        {isEditMode ? (
                          <input
                            type="text"
                            name="firstName"
                            value={profileData.firstName}
                            onChange={handleInputChange}
                            className="bg-gray-700 text-white w-full px-3 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          />
                        ) : (
                          <p className="text-white">{profileData.firstName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-2">
                          Last Name
                        </label>
                        {isEditMode ? (
                          <input
                            type="text"
                            name="lastName"
                            value={profileData.lastName}
                            onChange={handleInputChange}
                            className="bg-gray-700 text-white w-full px-3 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          />
                        ) : (
                          <p className="text-white">{profileData.lastName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-2">
                          Email Address
                        </label>
                        {isEditMode ? (
                          <input
                            type="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleInputChange}
                            className="bg-gray-700 text-white w-full px-3 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          />
                        ) : (
                          <p className="text-white">{profileData.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-2">
                          Phone Number
                        </label>
                        {isEditMode ? (
                          <input
                            type="text"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleInputChange}
                            className="bg-gray-700 text-white w-full px-3 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          />
                        ) : (
                          <p className="text-white">{profileData.phone}</p>
                        )}
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-gray-400 mb-2">
                        Agency Name
                      </label>
                      {isEditMode ? (
                        <input
                          type="text"
                          name="agencyName"
                          value={profileData.agencyName}
                          onChange={handleInputChange}
                          className="bg-gray-700 text-white w-full px-3 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        />
                      ) : (
                        <p className="text-white">{profileData.agencyName}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-gray-400 mb-2">
                          Agency Website
                        </label>
                        {isEditMode ? (
                          <input
                            type="text"
                            name="agencyWebsite"
                            value={profileData.agencyWebsite}
                            onChange={handleInputChange}
                            className="bg-gray-700 text-white w-full px-3 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          />
                        ) : (
                          <p className="text-white">
                            {profileData.agencyWebsite}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-2">
                          Year Established
                        </label>
                        {isEditMode ? (
                          <input
                            type="text"
                            name="yearEstablished"
                            value={profileData.yearEstablished}
                            onChange={handleInputChange}
                            className="bg-gray-700 text-white w-full px-3 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          />
                        ) : (
                          <p className="text-white">
                            {profileData.yearEstablished}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-gray-400 mb-2">
                        Bio/Description
                      </label>
                      {isEditMode ? (
                        <textarea
                          name="bio"
                          value={profileData.bio}
                          onChange={handleInputChange}
                          rows={4}
                          className="bg-gray-700 text-white w-full px-3 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        ></textarea>
                      ) : (
                        <p className="text-white">{profileData.bio}</p>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg text-white mb-3">Address</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-gray-400 mb-2">
                            Street Address
                          </label>
                          {isEditMode ? (
                            <input
                              type="text"
                              name="street"
                              value={profileData.address.street}
                              onChange={(e) => handleInputChange(e, "address")}
                              className="bg-gray-700 text-white w-full px-3 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                          ) : (
                            <p className="text-white">
                              {profileData.address.street}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-gray-400 mb-2">
                            City
                          </label>
                          {isEditMode ? (
                            <input
                              type="text"
                              name="city"
                              value={profileData.address.city}
                              onChange={(e) => handleInputChange(e, "address")}
                              className="bg-gray-700 text-white w-full px-3 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                          ) : (
                            <p className="text-white">
                              {profileData.address.city}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-gray-400 mb-2">
                            State/Province
                          </label>
                          {isEditMode ? (
                            <input
                              type="text"
                              name="state"
                              value={profileData.address.state}
                              onChange={(e) => handleInputChange(e, "address")}
                              className="bg-gray-700 text-white w-full px-3 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                          ) : (
                            <p className="text-white">
                              {profileData.address.state}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-gray-400 mb-2">
                            Postal Code
                          </label>
                          {isEditMode ? (
                            <input
                              type="text"
                              name="postalCode"
                              value={profileData.address.postalCode}
                              onChange={(e) => handleInputChange(e, "address")}
                              className="bg-gray-700 text-white w-full px-3 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                          ) : (
                            <p className="text-white">
                              {profileData.address.postalCode}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-gray-400 mb-2">
                            Country
                          </label>
                          {isEditMode ? (
                            <input
                              type="text"
                              name="country"
                              value={profileData.address.country}
                              onChange={(e) => handleInputChange(e, "address")}
                              className="bg-gray-700 text-white w-full px-3 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                          ) : (
                            <p className="text-white">
                              {profileData.address.country}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentProfilePage;
