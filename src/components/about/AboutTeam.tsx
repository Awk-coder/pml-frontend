import React from "react";
import { FiUser } from "react-icons/fi";

const AboutTeam: React.FC = () => {
  const teamMembers = [
    {
      name: "Saif Khan",
      role: "Founder & CEO",
      bio: "A seasoned entrepreneur with global experience managing multi-million-dollar technology businesses at leading firms such as Dell, Siemens, HCL Technologies, and Cognizant. Saif founded PML Academy to bridge the gap between education and industry.",
    },
    {
      name: "Abdul Wahid",
      role: "Chief Technology Officer",
      bio: "With over a decade of experience in educational technology and software development, Abdul leads our technical initiatives and digital transformation efforts. He oversees the development of our innovative digital platform, ensuring seamless integration of technology across all our educational services.",
    },
  ];

  return (
    <section className="py-24 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-16 text-center tracking-wider">
          Leadership Team
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-black/30 rounded-xl overflow-hidden border border-gray-800 flex flex-col"
            >
              <div className="bg-blue-900/20 p-8 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-blue-800/30 flex items-center justify-center">
                  <FiUser className="text-blue-400 w-12 h-12" />
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-orbitron text-2xl text-white mb-2 text-center">
                  {member.name}
                </h3>
                <p className="text-blue-400 font-space text-lg mb-4 text-center">
                  {member.role}
                </p>
                <p className="text-gray-300">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
