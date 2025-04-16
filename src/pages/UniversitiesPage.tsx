import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiMapPin, FiAward, FiUsers, FiBook } from "react-icons/fi";

const UniversitiesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "featured">("all");

  // Hard-coded university data for UCMI (just one for now, but structured as an array for future expansion)
  const universities = [
    {
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
    },
  ];

  // Filter universities based on search term and featured filter
  const filteredUniversities = universities.filter((university) => {
    const nameMatch = university.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const locationMatch = university.location
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    if (filter === "featured") {
      return (nameMatch || locationMatch) && university.isFeatured;
    }

    return nameMatch || locationMatch;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Squares Background */}
      <div className="relative bg-black overflow-hidden">
        {/* Squares Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 grid grid-cols-10 gap-2">
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={i}
                className="bg-blue-500 opacity-30"
                style={{
                  width: "100%",
                  height: "100%",
                  transform: `rotate(${Math.random() * 10}deg)`,
                  opacity: Math.random() * 0.5 + 0.1,
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="University campus"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>
        </div>

        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-extrabold tracking-tight text-blue-400 font-orbitron sm:text-6xl lg:text-7xl">
            Partner Universities
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            Explore our network of prestigious partner universities offering
            world-class education and exceptional student experiences.
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search universities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-900 block w-full pl-10 pr-3 py-3 border border-gray-800 rounded-lg leading-5 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-900 text-gray-300 border border-gray-800 hover:bg-gray-800"
              }`}
            >
              All Universities
            </button>
            <button
              onClick={() => setFilter("featured")}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                filter === "featured"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-900 text-gray-300 border border-gray-800 hover:bg-gray-800"
              }`}
            >
              Featured Partners
            </button>
          </div>
        </div>
      </div>

      {/* Universities List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {filteredUniversities.length === 0 ? (
          <div className="bg-gray-900 rounded-xl p-12 text-center border border-gray-800">
            <p className="text-gray-400 text-xl">
              No universities match your search criteria.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredUniversities.map((university) => (
              <Link
                key={university.id}
                to={`/universities/${university.id}`}
                className="block"
              >
                <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="grid grid-cols-1 md:grid-cols-3 h-full">
                    {/* University Image */}
                    <div className="md:col-span-1 h-64 md:h-auto">
                      <img
                        src={university.image}
                        alt={university.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* University Info */}
                    <div className="md:col-span-2 p-8 flex flex-col">
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h2 className="text-2xl font-bold text-white mb-2 font-orbitron">
                              {university.name}
                            </h2>
                            <div className="flex items-center text-gray-400 mb-4">
                              <FiMapPin className="mr-1" />
                              <span>{university.location}</span>
                            </div>
                          </div>

                          {university.isFeatured && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-900/30 text-blue-400 border border-blue-800">
                              <FiAward className="mr-1" /> Featured
                            </span>
                          )}
                        </div>

                        <p className="text-gray-300 mb-6 font-exo">
                          {university.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {university.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-auto">
                        <div className="flex items-center">
                          <div className="p-2 bg-blue-900/20 rounded-lg mr-3">
                            <FiBook className="text-blue-400" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Programs</p>
                            <p className="text-white font-medium">
                              {university.programs}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <div className="p-2 bg-blue-900/20 rounded-lg mr-3">
                            <FiUsers className="text-blue-400" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Students</p>
                            <p className="text-white font-medium">
                              {university.students}
                            </p>
                          </div>
                        </div>

                        <div className="hidden md:flex items-center">
                          <div className="p-2 bg-blue-900/20 rounded-lg mr-3">
                            <svg
                              className="text-blue-400 w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Established</p>
                            <p className="text-white font-medium">
                              {university.founded}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl font-orbitron">
              Ready to Start Your Academic Journey?
            </h2>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto font-exo">
              Apply now to join our partner universities and take the first step
              toward your future career.
            </p>
            <div className="mt-8">
              <Link
                to="/apply"
                className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-lg shadow-sm text-black bg-white hover:bg-gray-200 transition-colors"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversitiesPage;
