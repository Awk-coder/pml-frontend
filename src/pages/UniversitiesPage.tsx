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
      name: "UCMI University",
      location: "Kuala Lumpur, Malaysia",
      description:
        "A premier institution offering world-class education in healthcare, business, and technology fields.",
      logo: "/images/ucmi_logo.jpg",
      featured: true,
      established: "1993",
      programCount: 20,
      studentCount: "4,000+",
    },
  ];

  // Filter universities based on search term and filter
  const filteredUniversities = universities.filter((university) => {
    const matchesSearch = university.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all" || (filter === "featured" && university.featured);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative py-24 bg-gradient-to-b from-blue-900/30 to-black">
        <div className="container mx-auto px-6">
          <h1 className="font-orbitron text-4xl md:text-6xl font-bold text-center mb-6 text-blue-400">
            Partner Universities
          </h1>
          <p className="font-exo text-xl text-center max-w-3xl mx-auto mb-12 text-gray-300">
            Explore our network of prestigious partner universities offering
            world-class education and exceptional student experiences.
          </p>

          {/* Search and Filter */}
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search universities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-3 font-exo text-white focus:outline-none focus:border-blue-500"
                />
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded-lg font-space ${
                    filter === "all"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  All Universities
                </button>
                <button
                  onClick={() => setFilter("featured")}
                  className={`px-4 py-2 rounded-lg font-space ${
                    filter === "featured"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  Featured Partners
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Universities List */}
      <div className="container mx-auto px-6 py-16">
        {filteredUniversities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">
              No universities found matching your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {filteredUniversities.map((university) => (
              <div
                key={university.id}
                className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-blue-900/20 transition-shadow"
              >
                <div className="grid md:grid-cols-3 gap-6">
                  {/* University Image */}
                  <div className="h-64 md:h-auto bg-gray-800 relative">
                    <img
                      src="/images/ucmi_campus.jpg"
                      alt={university.name}
                      className="w-full h-full object-cover"
                    />
                    {university.featured && (
                      <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-space">
                        Featured Partner
                      </div>
                    )}
                  </div>

                  {/* University Info */}
                  <div className="p-6 md:col-span-2">
                    <h2 className="font-orbitron text-2xl font-bold mb-2">
                      {university.name}
                    </h2>
                    <div className="flex items-center text-gray-400 mb-4">
                      <FiMapPin className="mr-2" />
                      <span>{university.location}</span>
                    </div>
                    <p className="text-gray-300 mb-6">
                      {university.description}
                    </p>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-3 bg-gray-800 rounded-lg">
                        <FiAward className="mx-auto mb-2 text-blue-400" />
                        <p className="text-sm text-gray-400">Established</p>
                        <p className="font-space font-medium">
                          {university.established}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-gray-800 rounded-lg">
                        <FiBook className="mx-auto mb-2 text-blue-400" />
                        <p className="text-sm text-gray-400">Programs</p>
                        <p className="font-space font-medium">
                          {university.programCount}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-gray-800 rounded-lg">
                        <FiUsers className="mx-auto mb-2 text-blue-400" />
                        <p className="text-sm text-gray-400">Students</p>
                        <p className="font-space font-medium">
                          {university.studentCount}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        to={`/universities/${university.id}`}
                        className="font-space px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
                      >
                        View Details
                      </Link>
                      <Link
                        to={`/apply?university=${university.id}`}
                        className="font-space px-6 py-3 bg-transparent border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-900/20 transition-colors text-center"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversitiesPage;
