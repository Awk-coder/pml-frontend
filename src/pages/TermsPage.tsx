import React from "react";
import SquaresBackground from "../components/layout/SquaresBackground";

const TermsPage: React.FC = () => {
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
            Terms & Conditions
          </h1>
          <p className="font-exo text-xl text-gray-300 max-w-3xl mx-auto">
            Please read these terms carefully before using our services
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="font-orbitron text-2xl text-white mb-6">1. Introduction</h2>
            <p className="text-gray-300 mb-4">
              These Terms and Conditions govern your use of PML Academy's website and services. By accessing or using 
              our platform, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, 
              you may not access the service.
            </p>
            <p className="text-gray-300">
              PML Academy provides educational placement services, connecting students with educational institutions. 
              Our platform is designed to facilitate the discovery, application, and enrollment processes.
            </p>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="font-orbitron text-2xl text-white mb-6">2. User Accounts</h2>
            <p className="text-gray-300 mb-4">
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. 
              Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
            </p>
            <p className="text-gray-300 mb-4">
              You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password. 
              You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
            </p>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="font-orbitron text-2xl text-white mb-6">3. Services and Fees</h2>
            <p className="text-gray-300 mb-4">
              PML Academy offers various services to connect students with educational institutions. Basic services, including 
              browsing programs and institutions, are provided free of charge. However, certain premium services may require payment.
            </p>
            <p className="text-gray-300 mb-4">
              All fees are clearly indicated before you complete any transaction. By proceeding with a paid service, 
              you agree to pay all fees associated with such service. We reserve the right to modify our fees at any time.
            </p>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="font-orbitron text-2xl text-white mb-6">4. Content and Intellectual Property</h2>
            <p className="text-gray-300 mb-4">
              Our service allows you to post, link, store, share and otherwise make available certain information, text, graphics, 
              videos, or other material. You retain any rights that you may have in such content.
            </p>
            <p className="text-gray-300 mb-4">
              By posting content, you grant us the right to use, modify, publicly perform, publicly display, reproduce, and distribute 
              such content on and through our service. You agree that this license includes the right for us to make your content available 
              to other users of the service, who may also use your content subject to these Terms.
            </p>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 mb-8">
            <h2 className="font-orbitron text-2xl text-white mb-6">5. Termination</h2>
            <p className="text-gray-300 mb-4">
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, 
              including without limitation if you breach the Terms.
            </p>
            <p className="text-gray-300 mb-4">
              Upon termination, your right to use the service will immediately cease. If you wish to terminate your account, 
              you may simply discontinue using the service or contact us to request account deletion.
            </p>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
            <h2 className="font-orbitron text-2xl text-white mb-6">6. Contact Us</h2>
            <p className="text-gray-300 mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="text-blue-400">legal@pmlacademy.edu.my</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage; 