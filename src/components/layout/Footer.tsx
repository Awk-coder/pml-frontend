import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About", path: "/about" },
      { name: "Programs", path: "/programs" },
      { name: "Contact", path: "/contact" },
      { name: "Admissions", path: "/admissions" },
    ],
    legal: [
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/terms" },
      { name: "Cookie Policy", path: "/cookies" },
    ],
    resources: [
      { name: "Blog", path: "/blog" },
      { name: "FAQs", path: "/faqs" },
      { name: "Student Resources", path: "/resources" },
    ],
  };

  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <Link to="/" className="inline-block">
              <h2 className="text-2xl font-orbitron font-bold text-white">
                PML <span className="text-blue-400">Academy</span>
              </h2>
            </Link>
            <p className="mt-4 text-gray-400 font-exo">
              Connecting ambitious students with world-class education
              institutions.
            </p>

            {/* Contact Information */}
            <div className="mt-6">
              <p className="text-gray-400 mb-2">
                <span className="font-medium text-white">Phone:</span> +60 (12) 352-4656
              </p>
              <p className="text-gray-400 mb-2">
                <span className="font-medium text-white">Email:</span> info@pmlacademy.com
              </p>
              <p className="text-gray-400">
                <span className="font-medium text-white">Location:</span> Kuala Lumpur, Malaysia
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-orbitron font-medium text-white mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-blue-400 transition-colors font-exo"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-orbitron font-medium text-white mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-blue-400 transition-colors font-exo"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-orbitron font-medium text-white mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-blue-400 transition-colors font-exo"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {currentYear} PML Academy. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link
                to="/privacy"
                className="font-space text-sm text-gray-400 hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="font-space text-sm text-gray-400 hover:text-blue-400 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
