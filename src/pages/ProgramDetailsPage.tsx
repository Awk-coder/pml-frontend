import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import {
  FiCalendar,
  FiMapPin,
  FiDollarSign,
  FiBriefcase,
  FiBook,
  FiArrowLeft,
} from "react-icons/fi";
import { programs } from "../data/programs";

const ProgramDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [program, setProgram] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Find the program with the matching ID
    const foundProgram = programs.find((p) => p.id === id);

    if (foundProgram) {
      setProgram(foundProgram);
    } else {
      // If program not found, you could redirect to a 404 page
      console.error(`Program with ID ${id} not found`);
    }

    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-4">Program Not Found</h1>
        <p className="mb-6">
          The program you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate("/programs")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Programs
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        <button
          onClick={() => navigate("/programs")}
          className="flex items-center text-blue-500 hover:text-blue-400 mb-6 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Back to Programs
        </button>

        <div className="bg-gray-900 rounded-xl overflow-hidden shadow-xl">
          <div className="p-8">
            <div className="mb-6">
              <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded">
                {program.category}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-white mb-4">
              {program.title}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-gray-400 mb-6">{program.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <FiCalendar className="text-blue-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="text-white">{program.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <FiBook className="text-blue-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Level</p>
                      <p className="text-white">{program.level}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <FiDollarSign className="text-blue-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Tuition Fee</p>
                      <p className="text-white">
                        RM{" "}
                        {typeof program.tuitionFee === "number"
                          ? program.tuitionFee.toLocaleString()
                          : program.tuitionFee.replace("$", "")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <FiBriefcase className="text-blue-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Career Paths</p>
                      <p className="text-white">{program.career}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Accreditation
                  </h3>
                  <p className="text-gray-400">{program.accreditation}</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Program Overview
                </h3>
                <p className="text-gray-400 whitespace-pre-line">
                  {program.overview}
                </p>

                <div className="mt-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Available Intakes
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {program.intakes?.map((intake: string, index: number) => (
                      <span
                        key={index}
                        className="bg-gray-800 text-white px-3 py-1 rounded"
                      >
                        {intake}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Available Campuses
                  </h3>
                  <div className="space-y-2">
                    {program.campuses?.map((campus: string, index: number) => (
                      <div key={index} className="flex items-center">
                        <FiMapPin className="text-blue-500 mr-2" />
                        <span className="text-gray-400">{campus}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <h3 className="text-2xl font-bold text-white mb-6">Curriculum</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {program.curriculum?.map((year: any, index: number) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-6">
                    <h4 className="text-lg font-bold text-white mb-2">
                      {year.year}
                    </h4>
                    <p className="text-gray-400 mb-4">{year.description}</p>

                    <h5 className="text-sm font-medium text-gray-300 mb-2">
                      Subjects:
                    </h5>
                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                      {year.subjects.map((subject: string, idx: number) => (
                        <li key={idx}>{subject}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={() => navigate("/programs")}
                className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Back to Programs
              </button>
              <button
                onClick={() => navigate("/apply")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetailsPage;
