import React, { useState } from "react";
import {
  FiBookOpen,
  FiGlobe,
  FiLayers,
  FiTrendingUp,
  FiUsers,
  FiAward,
} from "react-icons/fi";

interface Program {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
}

const programs: Program[] = [
  {
    id: 1,
    title: "Business & Management",
    description:
      "Explore top business programs from leading universities worldwide, including MBA, finance, marketing, and entrepreneurship.",
    category: "Business",
    icon: <FiTrendingUp className="w-10 h-10 text-blue-400" />,
  },
  {
    id: 2,
    title: "Engineering & Technology",
    description:
      "Discover engineering programs in mechanical, electrical, civil, and computer science from prestigious technical institutions.",
    category: "Engineering",
    icon: <FiLayers className="w-10 h-10 text-green-400" />,
  },
  {
    id: 3,
    title: "Healthcare & Medicine",
    description:
      "Find healthcare programs in nursing, pharmacy, medical technology, and more from accredited medical institutions.",
    category: "Healthcare",
    icon: <FiUsers className="w-10 h-10 text-red-400" />,
  },
  {
    id: 4,
    title: "Arts & Humanities",
    description:
      "Browse programs in design, fine arts, literature, and cultural studies from renowned arts institutions worldwide.",
    category: "Arts",
    icon: <FiBookOpen className="w-10 h-10 text-purple-400" />,
  },
  {
    id: 5,
    title: "Science & Research",
    description:
      "Access programs in biology, chemistry, physics, and environmental science from leading research universities.",
    category: "Science",
    icon: <FiGlobe className="w-10 h-10 text-yellow-400" />,
  },
  {
    id: 6,
    title: "Education & Teaching",
    description:
      "Discover education programs preparing future teachers, administrators, and education specialists.",
    category: "Education",
    icon: <FiAward className="w-10 h-10 text-blue-500" />,
  },
];

const categories = [
  "All",
  ...new Set(programs.map((program) => program.category)),
];

const ProgramsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [expandedProgram, setExpandedProgram] = useState<number | null>(null);

  const filteredPrograms =
    activeCategory === "All"
      ? programs
      : programs.filter((program) => program.category === activeCategory);

  const toggleExpand = (id: number) => {
    setExpandedProgram(expandedProgram === id ? null : id);
  };

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold text-white mb-6 tracking-wider">
            Program Categories
          </h2>
          <p className="font-exo text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            PML Academy connects you with a diverse range of educational
            programs from universities around the world, tailored to your career
            goals.
          </p>
        </div>

        <div className="flex flex-wrap justify-center mb-16 gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`font-space px-6 py-3 rounded-full text-sm transition-colors ${
                activeCategory === category
                  ? "bg-white text-black"
                  : "bg-transparent text-white border border-white hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className={`bg-black border border-gray-800 rounded-xl overflow-hidden transition-all duration-300 ${
                expandedProgram === program.id
                  ? "transform scale-105 shadow-xl z-10"
                  : "hover:shadow-lg"
              }`}
            >
              <div
                className="p-8 cursor-pointer"
                onClick={() => toggleExpand(program.id)}
              >
                <div className="flex items-start mb-6">
                  <div className="p-4 bg-gray-900 rounded-lg mr-4 flex-shrink-0">
                    {program.icon}
                  </div>
                  <div>
                    <h3 className="font-orbitron text-xl text-white mb-2">
                      {program.title}
                    </h3>
                    <div className="inline-block px-3 py-1 bg-blue-900/30 text-blue-400 text-xs rounded-full font-space">
                      {program.category}
                    </div>
                  </div>
                </div>

                <p className="font-exo text-gray-300 mb-6 leading-relaxed">
                  {program.description}
                </p>

                {expandedProgram === program.id && (
                  <div className="mt-4 animate-fade-in">
                    <div className="border-t border-gray-800 pt-6 mb-6"></div>
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                      <button className="font-space text-sm text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors w-full sm:w-auto">
                        Explore Programs
                      </button>
                      <button className="font-space text-sm text-blue-400 hover:text-blue-300 transition-colors w-full sm:w-auto text-center">
                        Compare Options
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <button className="font-space px-10 py-4 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors tracking-wider text-lg">
            Explore All Programs
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
