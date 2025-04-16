import React from "react";

const AboutValues: React.FC = () => {
  const values = [
    {
      icon: "🔍",
      title: "Innovation",
      description: "We constantly seek new ways to enhance education and training through cutting-edge technologies and methodologies."
    },
    {
      icon: "🤝",
      title: "Partnership",
      description: "We believe in collaborative relationships with universities, industries, and students to create meaningful educational experiences."
    },
    {
      icon: "🌍",
      title: "Global Perspective",
      description: "We embrace diversity and foster international connections that enrich the learning journey."
    },
    {
      icon: "💡",
      title: "Future-Readiness",
      description: "We prepare individuals for emerging careers and technologies that will shape tomorrow's world."
    },
    {
      icon: "🎯",
      title: "Student-Centered",
      description: "We place students at the heart of everything we do, providing personalized support throughout their educational journey."
    },
    {
      icon: "⚖️",
      title: "Integrity",
      description: "We uphold the highest standards of honesty, transparency, and ethical conduct in all our operations."
    }
  ];

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-16 text-center tracking-wider">
          Our Values
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-blue-500 transition-colors">
              <div className="text-4xl mb-6">{value.icon}</div>
              <h3 className="font-orbitron text-2xl text-white mb-4">{value.title}</h3>
              <p className="font-exo text-gray-300">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues; 