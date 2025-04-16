import React from "react";
import { useParams, Link } from "react-router-dom";
import { FiMapPin, FiGlobe, FiCalendar, FiUsers, FiBook } from "react-icons/fi";

const UniversityPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Hard-coded university data (in a real app, you would fetch this based on the ID)
  const university = {
    id: "1",
    name: "University",
    location: "Kuala Lumpur, Malaysia",
    founded: "1993",
    students: "4000+",
    programs: "20+",
    isFeatured: true,
    image: "/images/ucmi_campus.jpg",
    description:
      "A premier institution offering world-class education in healthcare, business, and technology fields.",
    tags: ["Healthcare", "Business", "Technology"],
    about:
      "University is a leading institution in Malaysia, dedicated to providing high-quality education in healthcare, business, and technology fields. Established in 1993, we have grown to become one of the most respected educational institutions in the region.",
    facilities: [
      "Modern lecture halls",
      "State-of-the-art laboratories",
      "Extensive library",
      "Sports complex",
      "Student accommodation",
    ],
    website: "https://www.university.edu.my",
    email: "admissions@university.edu.my",
    phone: "+60 3 1234 5678",
  };

  // Sample programs offered by the university
  const programs = [
    {
      id: "p1",
      name: "Bachelor of Medicine and Surgery",
      level: "Bachelor's",
      duration: "5 years",
      description:
        "Comprehensive medical program covering all aspects of human health",
    },
    {
      id: "p2",
      name: "Diploma in Nursing",
      level: "Diploma",
      duration: "3 years",
      description:
        "Professional nursing program with hands-on clinical experience",
    },
    {
      id: "p3",
      name: "Master of Business Administration",
      level: "Master's",
      duration: "2 years",
      description:
        "Advanced business program focusing on leadership and management",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-96">
        <img
          src={university.image}
          alt={university.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-2 font-orbitron">
              {university.name}
            </h1>
            <div className="flex items-center text-gray-300">
              <FiMapPin className="mr-1" />
              <span>{university.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* University Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - About */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-xl p-8 mb-8 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4 font-orbitron">
                About
              </h2>
              <p className="text-gray-300 font-exo">{university.about}</p>
            </div>

            {/* Programs */}
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-6 font-orbitron">
                Programs Offered
              </h2>
              <div className="space-y-6">
                {programs.map((program) => (
                  <div
                    key={program.id}
                    className="border-b border-gray-800 pb-6 last:border-0 last:pb-0"
                  >
                    <h3 className="text-xl font-medium text-white mb-2">
                      {program.name}
                    </h3>
                    <div className="flex flex-wrap gap-4 mb-3">
                      <span className="px-3 py-1 bg-blue-900/30 text-blue-400 text-xs rounded-full border border-blue-800">
                        {program.level}
                      </span>
                      <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">
                        <FiCalendar className="inline mr-1" />{" "}
                        {program.duration}
                      </span>
                    </div>
                    <p className="text-gray-400">{program.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Info Card */}
          <div>
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 sticky top-8">
              <h3 className="text-xl font-bold text-white mb-4 font-orbitron">
                University Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="p-2 bg-blue-900/20 rounded-lg mr-3">
                    <FiCalendar className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Established</p>
                    <p className="text-white">{university.founded}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 bg-blue-900/20 rounded-lg mr-3">
                    <FiUsers className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Students</p>
                    <p className="text-white">{university.students}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 bg-blue-900/20 rounded-lg mr-3">
                    <FiBook className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Programs</p>
                    <p className="text-white">{university.programs}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 bg-blue-900/20 rounded-lg mr-3">
                    <FiGlobe className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Website</p>
                    <a
                      href={university.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      {university.website.replace("https://", "")}
                    </a>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-800">
                  <h4 className="text-lg font-medium text-white mb-3">
                    Facilities
                  </h4>
                  <ul className="space-y-2">
                    {university.facilities.map((facility, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-300"
                      >
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        {facility}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-800">
                  <Link
                    to="/apply"
                    className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white text-center rounded-lg transition-colors font-space"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityPage;
