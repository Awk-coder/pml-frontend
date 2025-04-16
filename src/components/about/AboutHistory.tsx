import React from "react";

const AboutHistory: React.FC = () => {
  const timelineEvents = [
    {
      year: "2025",
      title: "Foundation",
      description: "PML Academy was founded as the educational arm of iWealthX Pte Ltd, Singapore, to bridge the gap between education and industry."
    },
    {
      year: "2025",
      title: "First University Partnership",
      description: "Established collaboration with UCMI University, Malaysia to develop innovative academic offerings."
    },
    {
      year: "2025",
      title: "Launch of Flagship Programs",
      description: "Introduced the Certified Fintech Product Manager course and Design Thinking Training Programs."
    },
    {
      year: "2026",
      title: "International Student Services",
      description: "Expanded services to include comprehensive student recruitment and support for international students."
    },
    {
      year: "2026",
      title: "AI in Healthcare Program",
      description: "Launched innovative program on the Use of Artificial Intelligence in Healthcare Services in partnership with UCMI."
    }
  ];

  return (
    <section className="py-24 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-16 text-center tracking-wider">
          Our Journey
        </h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-900"></div>
          
          <div className="relative z-10">
            {timelineEvents.map((event, index) => (
              <div key={index} className="mb-16 relative">
                {/* Year marker */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-12 h-12 rounded-full bg-blue-600 border-4 border-gray-900 flex items-center justify-center text-white font-bold z-20">
                  {event.year.slice(2)}
                </div>
                
                {/* Content */}
                <div className={`flex w-full items-center justify-between ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <h3 className="text-xl font-bold text-white mb-2 font-orbitron">{event.title}</h3>
                    <p className="text-gray-400">{event.description}</p>
                  </div>
                  
                  {/* Year display */}
                  <div className="w-2/12 flex justify-center">
                    <span className="text-blue-400 font-bold">{event.year}</span>
                  </div>
                  
                  {/* Empty space for the other side */}
                  <div className="w-5/12"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHistory; 