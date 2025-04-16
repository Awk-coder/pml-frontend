import React from "react";
import {
  FiGlobe,
  FiAward,
  FiUsers,
  FiTrendingUp,
  FiShield,
  FiHeadphones,
} from "react-icons/fi";

const WhyChooseSection: React.FC = () => {
  const features = [
    {
      icon: <FiGlobe className="text-blue-400 text-4xl mb-4" />,
      title: "Global Network",
      description:
        "Connect with top universities and educational institutions worldwide through our extensive partner network.",
    },
    {
      icon: <FiAward className="text-blue-400 text-4xl mb-4" />,
      title: "Accredited Programs",
      description:
        "Access only verified, accredited educational programs that meet international quality standards.",
    },
    {
      icon: <FiUsers className="text-blue-400 text-4xl mb-4" />,
      title: "Personalized Guidance",
      description:
        "Receive tailored recommendations and support throughout your educational journey.",
    },
    {
      icon: <FiTrendingUp className="text-blue-400 text-4xl mb-4" />,
      title: "Career Advancement",
      description:
        "Enhance your career prospects with programs designed to meet industry demands and future trends.",
    },
    {
      icon: <FiShield className="text-blue-400 text-4xl mb-4" />,
      title: "Secure Application",
      description:
        "Apply with confidence through our secure, streamlined application process with real-time status updates.",
    },
    {
      icon: <FiHeadphones className="text-blue-400 text-4xl mb-4" />,
      title: "Dedicated Support",
      description:
        "Access 24/7 support from our team of education experts to help you make informed decisions.",
    },
  ];

  return (
    <section className="bg-black py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-4 tracking-wider">
            Why Choose PML Academy
          </h2>
          <p className="font-exo text-xl text-gray-300 max-w-2xl mx-auto font-light">
            We connect ambitious students with world-class educational
            institutions to help them achieve their academic and career goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900 p-8 rounded-lg border border-gray-800 hover:border-blue-500 transition-all duration-300 hover:shadow-blue-900/20 hover:shadow-lg"
            >
              {feature.icon}
              <h3 className="font-space text-xl text-white mb-3">
                {feature.title}
              </h3>
              <p className="font-exo text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
