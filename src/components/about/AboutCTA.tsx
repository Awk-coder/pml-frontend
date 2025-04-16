import React from "react";
import { Link } from "react-router-dom";

const AboutCTA: React.FC = () => {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
        <img
          src="/images/students-group.jpg"
          alt="Students"
          className="object-cover w-full h-full"
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-8 tracking-wider">
            Join Our Global Learning Ecosystem
          </h2>
          <p className="text-xl text-gray-300 mb-12 font-exo">
            At PML Academy, we are not just shaping careers—we are creating global learning ecosystems where students, educators, and industries converge to build a smarter future.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/programs" className="font-space text-lg bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors">
              Explore Our Programs
            </Link>
            <Link to="/contact" className="font-space text-lg border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors">
              Get Personalized Advice
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA; 