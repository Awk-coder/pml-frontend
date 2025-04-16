import React from "react";

const AboutMission: React.FC = () => {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-8 tracking-wider">
              Our Mission
            </h2>
            <div className="space-y-6 text-gray-300">
              <p className="font-medium text-lg">
                PML Academy is the educational arm of iWealthX Pte Ltd, Singapore, committed to delivering transformative learning experiences that bridge the gap between education and industry. As a dynamic education and training provider, we specialize in future-ready programs that empower individuals to thrive in the digital economy.
              </p>
              <p className="font-medium text-lg">
                Under the leadership of Mr. Saif Khan, a seasoned entrepreneur with global experience managing multi-million-dollar technology businesses at leading firms such as Dell, Siemens, HCL Technologies, and Cognizant, PML Academy offers high-impact, industry-aligned training.
              </p>
              <p className="font-medium text-lg">
                Our flagship programs include the Certified Fintech Product Manager—a comprehensive course designed to equip professionals with the skills to ideate, build, and manage financial technology products—and Design Thinking Training Programs that foster innovation and user-centric problem-solving across industries.
              </p>
              <p>
                In collaboration with UCMI University, Malaysia, we are developing innovative academic offerings including upcoming programs on the Use of Artificial Intelligence in Healthcare Services, among other cutting-edge fields. These forward-looking initiatives aim to address critical global skills gaps and prepare students for emerging career pathways.
              </p>
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden h-[500px]">
            <img
              src="/images/about-mission.jpg"
              alt="PML Academy Mission"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
          </div>
        </div>
        
        <div className="mt-16 text-gray-300">
          <h3 className="font-orbitron text-2xl md:text-3xl font-bold text-white mb-6 tracking-wider">
            Student Recruitment Services
          </h3>
          <p className="mb-6">
            In addition to professional training, PML Academy offers a full-suite Student Recruitment Service for international students aspiring to study at UCMI. Our end-to-end support includes personalized course selection, career counseling, application assistance, and a range of value-added services such as ticketing, airport pickup, accommodation, meal planning, and even post-enrollment services like local SIM card setup, student club integration, and community engagement—delivered seamlessly through trusted local partners.
          </p>
          <p className="mb-6">
            Our digital platform enhances the experience for both students and universities, streamlining the application process, enabling real-time support, and offering data-driven insights that add measurable value to institutional partners.
          </p>
          <p className="font-medium text-lg">
            At PML Academy, we are not just shaping careers—we are creating global learning ecosystems where students, educators, and industries converge to build a smarter future.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMission; 