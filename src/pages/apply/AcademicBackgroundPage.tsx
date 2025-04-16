import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ApplyLayout from "../../components/apply/ApplyLayout";
import { motion } from "framer-motion";
import { FiPlus, FiX, FiUpload } from "react-icons/fi";

interface Education {
  id: string;
  institution: string;
  qualification: string;
  fieldOfStudy: string;
  graduationYear: string;
  grade: string;
}

interface AcademicData {
  educationHistory: Education[];
  englishQualification: {
    type: string;
    score: string;
    testDate: string;
  };
  documents: {
    transcript: File | null;
    certificate: File | null;
    englishCert: File | null;
  };
}

const AcademicBackgroundPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const previousData = location.state?.applicationData || {};

  const [academicData, setAcademicData] = useState<AcademicData>({
    educationHistory: [
      {
        id: "1",
        institution: "",
        qualification: "",
        fieldOfStudy: "",
        graduationYear: "",
        grade: "",
      },
    ],
    englishQualification: {
      type: "",
      score: "",
      testDate: "",
    },
    documents: {
      transcript: null,
      certificate: null,
      englishCert: null,
    },
  });

  const handleAddEducation = () => {
    setAcademicData({
      ...academicData,
      educationHistory: [
        ...academicData.educationHistory,
        {
          id: Date.now().toString(),
          institution: "",
          qualification: "",
          fieldOfStudy: "",
          graduationYear: "",
          grade: "",
        },
      ],
    });
  };

  const handleRemoveEducation = (id: string) => {
    setAcademicData({
      ...academicData,
      educationHistory: academicData.educationHistory.filter((edu) => edu.id !== id),
    });
  };

  const handleEducationChange = (id: string, field: keyof Education, value: string) => {
    setAcademicData({
      ...academicData,
      educationHistory: academicData.educationHistory.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const handleFileUpload = (type: keyof AcademicData["documents"]) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAcademicData({
        ...academicData,
        documents: {
          ...academicData.documents,
          [type]: file,
        },
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/apply/requirements", {
      state: {
        applicationData: {
          ...previousData,
          academicBackground: academicData,
        },
      },
    });
  };

  return (
    <ApplyLayout step={2} title="Academic Background">
      <motion.form 
        onSubmit={handleSubmit} 
        className="max-w-3xl w-full space-y-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Education History */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-space text-2xl text-blue-400">Education History</h2>
          
          {academicData.educationHistory.map((education, index) => (
            <div key={education.id} className="border border-gray-700 rounded-lg p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-space text-lg text-white">
                  Education #{index + 1}
                </h3>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveEducation(education.id)}
                    className="text-gray-400 hover:text-red-400"
                  >
                    <FiX size={20} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="block">
                  <span className="font-space text-sm text-gray-300 mb-2 block">
                    Institution
                  </span>
                  <input
                    type="text"
                    value={education.institution}
                    onChange={(e) => handleEducationChange(education.id, "institution", e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 font-exo text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </label>

                <label className="block">
                  <span className="font-space text-sm text-gray-300 mb-2 block">
                    Qualification
                  </span>
                  <input
                    type="text"
                    value={education.qualification}
                    onChange={(e) => handleEducationChange(education.id, "qualification", e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 font-exo text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </label>

                <label className="block">
                  <span className="font-space text-sm text-gray-300 mb-2 block">
                    Field of Study
                  </span>
                  <input
                    type="text"
                    value={education.fieldOfStudy}
                    onChange={(e) => handleEducationChange(education.id, "fieldOfStudy", e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 font-exo text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </label>

                <label className="block">
                  <span className="font-space text-sm text-gray-300 mb-2 block">
                    Graduation Year
                  </span>
                  <input
                    type="text"
                    value={education.graduationYear}
                    onChange={(e) => handleEducationChange(education.id, "graduationYear", e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 font-exo text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </label>

                <label className="block">
                  <span className="font-space text-sm text-gray-300 mb-2 block">
                    Grade/CGPA
                  </span>
                  <input
                    type="text"
                    value={education.grade}
                    onChange={(e) => handleEducationChange(education.id, "grade", e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 font-exo text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </label>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddEducation}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-space"
          >
            <FiPlus /> Add Another Education
          </button>
        </motion.div>

        {/* English Qualification */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="font-space text-2xl text-blue-400">English Qualification</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="block">
              <span className="font-space text-sm text-gray-300 mb-2 block">
                Type of Test
              </span>
              <select
                value={academicData.englishQualification.type}
                onChange={(e) => setAcademicData({
                  ...academicData,
                  englishQualification: {
                    ...academicData.englishQualification,
                    type: e.target.value,
                  },
                })}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 font-exo text-white focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">Select test type</option>
                <option value="IELTS">IELTS</option>
                <option value="TOEFL">TOEFL</option>
                <option value="MUET">MUET</option>
              </select>
            </label>

            <label className="block">
              <span className="font-space text-sm text-gray-300 mb-2 block">
                Score
              </span>
              <input
                type="text"
                value={academicData.englishQualification.score}
                onChange={(e) => setAcademicData({
                  ...academicData,
                  englishQualification: {
                    ...academicData.englishQualification,
                    score: e.target.value,
                  },
                })}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 font-exo text-white focus:outline-none focus:border-blue-500"
                required
              />
            </label>

            <label className="block">
              <span className="font-space text-sm text-gray-300 mb-2 block">
                Test Date
              </span>
              <input
                type="date"
                value={academicData.englishQualification.testDate}
                onChange={(e) => setAcademicData({
                  ...academicData,
                  englishQualification: {
                    ...academicData.englishQualification,
                    testDate: e.target.value,
                  },
                })}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 font-exo text-white focus:outline-none focus:border-blue-500"
                required
              />
            </label>
          </div>
        </motion.div>

        {/* Document Uploads */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="font-space text-2xl text-blue-400">Document Uploads</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <span className="font-space text-sm text-gray-300 block">
                Academic Transcript
              </span>
              <label className="block w-full border-2 border-dashed border-gray-700 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                <input
                  type="file"
                  onChange={handleFileUpload("transcript")}
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                />
                <div className="flex flex-col items-center text-gray-400">
                  <FiUpload size={24} />
                  <span className="mt-2 text-sm">
                    {academicData.documents.transcript?.name || "Upload Transcript"}
                  </span>
                </div>
              </label>
            </div>

            <div className="space-y-2">
              <span className="font-space text-sm text-gray-300 block">
                Academic Certificate
              </span>
              <label className="block w-full border-2 border-dashed border-gray-700 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                <input
                  type="file"
                  onChange={handleFileUpload("certificate")}
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                />
                <div className="flex flex-col items-center text-gray-400">
                  <FiUpload size={24} />
                  <span className="mt-2 text-sm">
                    {academicData.documents.certificate?.name || "Upload Certificate"}
                  </span>
                </div>
              </label>
            </div>

            <div className="space-y-2">
              <span className="font-space text-sm text-gray-300 block">
                English Qualification Certificate
              </span>
              <label className="block w-full border-2 border-dashed border-gray-700 rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                <input
                  type="file"
                  onChange={handleFileUpload("englishCert")}
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                />
                <div className="flex flex-col items-center text-gray-400">
                  <FiUpload size={24} />
                  <span className="mt-2 text-sm">
                    {academicData.documents.englishCert?.name || "Upload English Certificate"}
                  </span>
                </div>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div 
          className="flex justify-between gap-4 pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="font-space px-8 py-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="font-space bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue to Requirements
          </button>
        </motion.div>
      </motion.form>
    </ApplyLayout>
  );
};

export default AcademicBackgroundPage; 