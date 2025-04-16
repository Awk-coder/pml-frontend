import React, { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        interest: "",
        message: ""
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };
  
  const programInterests = [
    "Nursing Programs",
    "Medical Programs",
    "Pharmacy Programs",
    "Physiotherapy Programs",
    "Medical Lab Programs",
    "Public Health Programs",
    "Healthcare Administration",
    "Other Healthcare Programs"
  ];

  return (
    <section id="contact-form" className="py-24 bg-black/50">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-8 tracking-wider">
                Get In Touch
              </h2>
              
              <p className="font-exo text-xl text-gray-300 mb-12 leading-relaxed">
                Ready to take the next step in your healthcare education journey? Fill out the form and one of our advisors will contact you within 24 hours.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="text-blue-400 text-2xl mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-space text-xl text-white mb-2">Phone</h3>
                    <p className="font-exo text-gray-300">+60 (12) 352-4656</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="text-blue-400 text-2xl mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-space text-xl text-white mb-2">Email</h3>
                    <p className="font-exo text-gray-300">saifespoo@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="text-blue-400 text-2xl mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-space text-xl text-white mb-2">Location</h3>
                    <p className="font-exo text-gray-300">Kuala Lumpur, Malaysia</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-black/30 border border-gray-800 rounded-xl p-8">
              <h3 className="font-orbitron text-2xl text-white mb-6">Send Us a Message</h3>
              
              {submitSuccess && (
                <div className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-3 rounded mb-6">
                  Thank you for reaching out! We'll be in touch with you shortly.
                </div>
              )}
              
              {submitError && (
                <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded mb-6">
                  {submitError}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block font-space text-sm text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="email" className="block font-space text-sm text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Your email"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block font-space text-sm text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Your phone (optional)"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="interest" className="block font-space text-sm text-gray-300 mb-2">
                    Program Interest
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select your area of interest</option>
                    {programInterests.map((program, index) => (
                      <option key={index} value={program}>
                        {program}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block font-space text-sm text-gray-300 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-space text-lg bg-blue-500 text-white px-6 py-3 rounded-lg transition-colors ${
                    isSubmitting ? 'bg-blue-700 cursor-not-allowed' : 'hover:bg-blue-600'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm; 