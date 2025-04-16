import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import SquaresBackground from '../../components/layout/SquaresBackground';

const ApplyAsUniversity: React.FC = () => {
  const [formData, setFormData] = useState({
    universityName: '',
    location: '',
    country: '',
    accreditationNumber: '',
    website: '',
    contactPersonName: '',
    contactPersonRole: '',
    contactEmail: '',
    contactPhone: '',
    yearEstablished: '',
    description: '',
    programs: '',
    reasonToJoin: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Here we would send the data to backend
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    
    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="relative min-h-screen bg-black pt-24">
          <SquaresBackground
            direction="diagonal"
            speed={0.3}
            squareSize={40}
            borderColor="rgba(255, 255, 255, 0.3)"
            hoverFillColor="#333"
            backgroundColor="#000000"
          />
          
          <div className="container mx-auto px-6 relative z-20 py-32">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="font-orbitron text-4xl font-bold text-white mb-6">
                Application Submitted
              </h1>
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-8 mb-8">
                <p className="font-space text-green-400 mb-4">
                  Thank you for your interest in joining PML!
                </p>
                <p className="font-space text-gray-400">
                  We have received your application and our team will review it shortly. 
                  We'll contact you at {formData.contactEmail} with next steps.
                </p>
              </div>
              <p className="font-space text-sm text-gray-400">
                Reference number: {Math.random().toString(36).substring(7).toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="relative min-h-screen bg-black pt-24">
        <SquaresBackground
          direction="diagonal"
          speed={0.3}
          squareSize={40}
          borderColor="rgba(255, 255, 255, 0.3)"
          hoverFillColor="#333"
          backgroundColor="#000000"
        />
        
        <div className="container mx-auto px-6 relative z-20 py-32">
          <div className="max-w-2xl mx-auto">
            <h1 className="font-orbitron text-4xl font-bold text-white mb-4">
              Partner with PML
            </h1>
            <p className="font-space text-gray-400 mb-8">
              Join our platform to streamline your international student admissions process
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
                <h2 className="font-space text-xl text-white mb-6">University Information</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block font-space text-sm text-gray-300 mb-2">
                      University Name
                    </label>
                    <input
                      type="text"
                      name="universityName"
                      value={formData.universityName}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-space text-sm text-gray-300 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-space text-sm text-gray-300 mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-space text-sm text-gray-300 mb-2">
                        Accreditation Number
                      </label>
                      <input
                        type="text"
                        name="accreditationNumber"
                        value={formData.accreditationNumber}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-space text-sm text-gray-300 mb-2">
                        Year Established
                      </label>
                      <input
                        type="text"
                        name="yearEstablished"
                        value={formData.yearEstablished}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-space text-sm text-gray-300 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
                <h2 className="font-space text-xl text-white mb-6">Contact Person</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-space text-sm text-gray-300 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="contactPersonName"
                        value={formData.contactPersonName}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-space text-sm text-gray-300 mb-2">
                        Role
                      </label>
                      <input
                        type="text"
                        name="contactPersonRole"
                        value={formData.contactPersonRole}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-space text-sm text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-space text-sm text-gray-300 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
                <h2 className="font-space text-xl text-white mb-6">Additional Information</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block font-space text-sm text-gray-300 mb-2">
                      Brief Description of University
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-space text-sm text-gray-300 mb-2">
                      Programs Offered
                    </label>
                    <textarea
                      name="programs"
                      value={formData.programs}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      required
                      placeholder="List your key programs..."
                    />
                  </div>

                  <div>
                    <label className="block font-space text-sm text-gray-300 mb-2">
                      Why do you want to join PML?
                    </label>
                    <textarea
                      name="reasonToJoin"
                      value={formData.reasonToJoin}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white font-space text-lg py-4 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyAsUniversity; 