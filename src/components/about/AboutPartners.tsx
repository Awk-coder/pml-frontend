import React from "react";
import { Link } from "react-router-dom";

const AboutPartners: React.FC = () => {
  const partners = [
    {
      name: "UCMI University",
      logo: "/images/ucmi_campus.jpg",
      description: "A premier institution in Malaysia offering world-class education in healthcare, business, and technology fields.",
      link: "/universities/1"
    }
  ];

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-16 text-center tracking-wider">
          University Partners
        </h2>
        
        <div className="max-w-4xl mx-auto">
          {partners.map((partner, index) => (
            <div key={index} className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="h-64 md:h-auto">
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 md:col-span-2">
                  <h3 className="font-orbitron text-2xl text-white mb-4">{partner.name}</h3>
                  <p className="text-gray-300 mb-6">{partner.description}</p>
                  <Link 
                    to={partner.link} 
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutPartners; 