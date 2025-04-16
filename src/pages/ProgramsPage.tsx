import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProgramsHero from "../components/programs/ProgramsHero";
import { FiClock, FiDollarSign, FiAward } from "react-icons/fi";
import { programs } from "../data/programs";

const ProgramsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredPrograms, setFilteredPrograms] = useState(programs);

  // Filter programs based on category and search query
  useEffect(() => {
    let result = programs;
    
    // Filter by category
    if (activeCategory !== "All") {
      result = result.filter(program => program.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(program => 
        program.title.toLowerCase().includes(query) || 
        program.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredPrograms(result);
  }, [activeCategory, searchQuery]);

  // Get unique categories from programs
  const categories = ["All", ...Array.from(new Set(programs.map(p => p.category)))];

  return (
    <div className="min-h-screen bg-black">
      <ProgramsHero 
        onCategorySelect={setActiveCategory} 
        activeCategory={activeCategory}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        searchValue={searchQuery}
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((program) => (
            <div key={program.id} className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="p-6">
                <div className="mb-4">
                  <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    {program.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{program.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-2">{program.description}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center">
                    <FiClock className="mr-1 text-blue-500" />
                    <span>{program.duration}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <FiAward className="mr-1 text-blue-500" />
                    <span>{program.level}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <FiDollarSign className="mr-1 text-blue-500" />
                    <span>RM {typeof program.tuitionFee === 'number' 
                      ? program.tuitionFee.toLocaleString() 
                      : program.tuitionFee.replace('$', '')}</span>
                  </div>
                </div>
                
                <Link 
                  to={`/programs/${program.id}`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {filteredPrograms.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl text-white mb-2">No programs found</h3>
            <p className="text-gray-400">Try adjusting your search or category filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgramsPage;
