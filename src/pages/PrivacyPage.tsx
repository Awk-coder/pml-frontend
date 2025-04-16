import React from "react";
import SquaresBackground from "../components/layout/SquaresBackground";

const PrivacyPage: React.FC = () => {
  return (
    <div className="bg-black min-h-screen">
      <div className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <SquaresBackground
          direction="diagonal"
          speed={0.3}
          squareSize={40}
          borderColor="rgba(255, 255, 255, 0.3)"
          hoverFillColor="#333"
          backgroundColor="#000000"
        />
        
        <div className="container mx-auto px-6 relative z-20 text-center">
          <h1 className="font-orbitron text-4xl md:text-6xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="font-exo text-xl text-gray-300 max-w-3xl mx-auto">
            How we collect, use, and protect your personal information
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="font-orbitron text-2xl text-white mb-6">1. Information We Collect</h2>
            <p className="text-gray-300 mb-4">
              PML Academy collects several types of information from and about users of our platform, including:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
              <li>Personal identifiable information such as name, email address, phone number, and educational background.</li>
              <li>Non-personal information such as browser type, IP address, device information, and usage data.</li>
              <li>Information related to your educational preferences, applications, and interactions with educational institutions.</li>
            </ul>
            <p className="text-gray-300">
              We collect this information directly from you when you provide it to us, automatically as you navigate through the site, 
              and from third parties such as our business partners and other trusted sources.
            </p>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="font-orbitron text-2xl text-white mb-6">2. How We Use Your Information</h2>
            <p className="text-gray-300 mb-4">
              We use information that we collect about you or that you provide to us:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
              <li>To present our platform and its contents to you.</li>
              <li>To provide you with information, products, or services that you request from us.</li>
              <li>To match you with appropriate educational institutions and programs.</li>
              <li>To fulfill any other purpose for which you provide it.</li>
              <li>To provide you with notices about your account.</li>
              <li>To improve our platform and user experience.</li>
              <li>To communicate with you about products, services, and events offered by PML Academy and others.</li>
            </ul>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="font-orbitron text-2xl text-white mb-6">3. Information Sharing</h2>
            <p className="text-gray-300 mb-4">
              We may disclose personal information that we collect or you provide:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
              <li>To educational institutions when you express interest or apply to their programs.</li>
              <li>To contractors, service providers, and other third parties we use to support our business.</li>
              <li>To fulfill the purpose for which you provide it.</li>
              <li>With your consent.</li>
              <li>To comply with any court order, law, or legal process.</li>
              <li>To protect the rights, property, or safety of PML Academy, our users, or others.</li>
            </ul>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="font-orbitron text-2xl text-white mb-6">4. Data Security</h2>
            <p className="text-gray-300 mb-4">
              We have implemented measures designed to secure your personal information from accidental loss and from 
              unauthorized access, use, alteration, and disclosure. All information you provide to us is stored on secure servers.
            </p>
            <p className="text-gray-300 mb-4">
              The safety and security of your information also depends on you. Where we have given you a password for 
              access to certain parts of our platform, you are responsible for keeping this password confidential.
            </p>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="font-orbitron text-2xl text-white mb-6">5. Your Rights</h2>
            <p className="text-gray-300 mb-4">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-4">
              <li>Right to access and receive a copy of your personal data.</li>
              <li>Right to rectify or update your personal data.</li>
              <li>Right to erasure (the "right to be forgotten").</li>
              <li>Right to restrict processing of your personal data.</li>
              <li>Right to data portability.</li>
              <li>Right to object to processing of your personal data.</li>
            </ul>
            <p className="text-gray-300">
              To exercise any of these rights, please contact us using the information provided below.
            </p>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
            <h2 className="font-orbitron text-2xl text-white mb-6">6. Contact Us</h2>
            <p className="text-gray-300 mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-blue-400">privacy@pmlacademy.edu.my</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage; 