import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ApplyLayout from "../../components/apply/ApplyLayout";
import { motion } from "framer-motion";
import { FiChevronRight } from "react-icons/fi";
import PhoneInput from "../../components/form/PhoneInput";
import DateInput from "../../components/form/DateInput";
import CountrySelect from "../../components/form/CountrySelect";

interface ApplicationData {
  programId?: number;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    nationality: string;
    dateOfBirth: string;
  };
}

const ApplyPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    programId: location.state?.programId,
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      nationality: "",
      dateOfBirth: "",
    },
  });

  // Sample programs data (this would come from your API)
  const programs = [
    { id: 1, title: "Bachelor of Nursing", category: "Nursing" },
    { id: 2, title: "Master of Nursing", category: "Nursing" },
    { id: 3, title: "Doctor of Pharmacy", category: "Pharmacy" },
    // ... other programs
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save data and move to next step
    navigate("/apply/academic-background", { 
      state: { applicationData } 
    });
  };

  return (
    <ApplyLayout step={1} title="Program Selection & Basic Info">
      <motion.form 
        onSubmit={handleSubmit} 
        className="max-w-3xl w-full space-y-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Program Selection */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-space text-2xl text-blue-400">Program Selection</h2>
          <div className="space-y-4">
            <label className="block">
              <span className="font-space text-sm text-gray-300 mb-2 block">
                Select Program
              </span>
              <select 
                value={applicationData.programId || ""}
                onChange={(e) => setApplicationData({
                  ...applicationData,
                  programId: Number(e.target.value)
                })}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 font-exo text-white focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">Select a program</option>
                {programs.map(program => (
                  <option key={program.id} value={program.id}>
                    {program.title}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </motion.div>

        {/* Personal Information */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="font-space text-2xl text-blue-400">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="block">
              <span className="font-space text-sm text-gray-300 mb-2 block">
                First Name
              </span>
              <input
                type="text"
                value={applicationData.personalInfo.firstName}
                onChange={(e) => setApplicationData({
                  ...applicationData,
                  personalInfo: {
                    ...applicationData.personalInfo,
                    firstName: e.target.value
                  }
                })}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 font-exo text-white focus:outline-none focus:border-blue-500"
                required
              />
            </label>

            <label className="block">
              <span className="font-space text-sm text-gray-300 mb-2 block">
                Last Name
              </span>
              <input
                type="text"
                value={applicationData.personalInfo.lastName}
                onChange={(e) => setApplicationData({
                  ...applicationData,
                  personalInfo: {
                    ...applicationData.personalInfo,
                    lastName: e.target.value
                  }
                })}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 font-exo text-white focus:outline-none focus:border-blue-500"
                required
              />
            </label>

            <label className="block">
              <span className="font-space text-sm text-gray-300 mb-2 block">
                Email Address
              </span>
              <input
                type="email"
                value={applicationData.personalInfo.email}
                onChange={(e) => setApplicationData({
                  ...applicationData,
                  personalInfo: {
                    ...applicationData.personalInfo,
                    email: e.target.value
                  }
                })}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 font-exo text-white focus:outline-none focus:border-blue-500"
                required
              />
            </label>

            <label className="block">
              <span className="font-space text-sm text-gray-300 mb-2 block">
                Phone Number
              </span>
              <PhoneInput
                value={applicationData.personalInfo.phone}
                onChange={(value) => setApplicationData({
                  ...applicationData,
                  personalInfo: {
                    ...applicationData.personalInfo,
                    phone: value
                  }
                })}
                required
              />
            </label>

            <label className="block">
              <span className="font-space text-sm text-gray-300 mb-2 block">
                Nationality
              </span>
              <CountrySelect
                value={applicationData.personalInfo.nationality}
                onChange={(value) => setApplicationData({
                  ...applicationData,
                  personalInfo: {
                    ...applicationData.personalInfo,
                    nationality: value
                  }
                })}
                required
              />
            </label>

            <label className="block">
              <span className="font-space text-sm text-gray-300 mb-2 block">
                Date of Birth
              </span>
              <DateInput
                value={applicationData.personalInfo.dateOfBirth}
                onChange={(value) => setApplicationData({
                  ...applicationData,
                  personalInfo: {
                    ...applicationData.personalInfo,
                    dateOfBirth: value
                  }
                })}
                required
              />
            </label>
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div 
          className="flex justify-end gap-4 pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button
            type="submit"
            className="font-space bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue to Academic Background
          </button>
        </motion.div>
      </motion.form>
    </ApplyLayout>
  );
};

export default ApplyPage; 