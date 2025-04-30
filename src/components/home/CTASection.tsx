import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiBookOpen, FiGlobe, FiUsers } from "react-icons/fi";
import { motion } from "framer-motion";

const CTASection: React.FC = () => {
  return (
    <section className="py-24 px-4 relative bg-black">
      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.h2
            className="font-orbitron text-3xl md:text-4xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Your Global Education Partner
          </motion.h2>

          <motion.p
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            PML Academy connects you with a diverse range of educational
            programs from universities around the world, tailored to your career
            goals.
          </motion.p>
        </div>

        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/images/global-education.png"
              alt="Global Education"
              className="w-full max-w-md mx-auto"
            />
          </motion.div>

          <div>
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Begin Your Journey?
              </h3>
              <p className="text-gray-400 mb-6">
                Whether you're a student looking to study abroad, a university
                seeking to attract international talent, or an agent connecting
                students with opportunities, PML Academy has the tools and
                resources you need.
              </p>
            </motion.div>

            <div className="space-y-4 mb-8">
              <motion.div
                className="flex items-center space-x-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <div className="w-10 h-10 flex items-center justify-center border border-blue-500 rounded-full">
                  <FiBookOpen className="text-blue-500" />
                </div>
                <p className="text-gray-300">
                  Access to elite universities worldwide
                </p>
              </motion.div>

              <motion.div
                className="flex items-center space-x-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <div className="w-10 h-10 flex items-center justify-center border border-blue-500 rounded-full">
                  <FiGlobe className="text-blue-500" />
                </div>
                <p className="text-gray-300">
                  Connections across 50+ countries
                </p>
              </motion.div>

              <motion.div
                className="flex items-center space-x-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <div className="w-10 h-10 flex items-center justify-center border border-blue-500 rounded-full">
                  <FiUsers className="text-blue-500" />
                </div>
                <p className="text-gray-300">
                  Personalized support at every step
                </p>
              </motion.div>
            </div>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center transition-all duration-300"
              >
                Log In <FiArrowRight className="ml-2" />
              </Link>
              <Link
                to="/register"
                className="bg-transparent hover:bg-blue-900/20 border border-blue-500 text-blue-500 hover:text-blue-400 px-6 py-3 rounded-lg font-medium transition-all duration-300"
              >
                Create Account
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
