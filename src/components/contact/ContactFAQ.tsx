import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const ContactFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: "How does PML Academy help students find their ideal programs?",
      answer: "PML Academy works as a bridge between students and educational institutions across multiple fields. We provide personalized guidance, program recommendations based on your goals and qualifications, application assistance, and ongoing support throughout your educational journey - whether you're interested in healthcare, technology, business, arts, or other disciplines."
    },
    {
      question: "Is there a fee for using PML Academy's services?",
      answer: "Most of our basic services are provided at no cost to students. We receive compensation from our partner universities when students enroll through our platform. For premium services like one-on-one counseling or application preparation, we offer affordable packages tailored to your needs."
    },
    {
      question: "Which universities do you partner with?",
      answer: "We partner with a diverse range of accredited institutions, including UCMI University, Westfield College, Northridge Sciences, Global Institute, and many others. Our network spans across multiple disciplines and continues to grow to provide students with comprehensive options for their education."
    },
    {
      question: "What types of programs can you help me find?",
      answer: "We connect students with programs across various fields including healthcare (nursing, medicine, pharmacy), technology (computer science, IT, cybersecurity), business (management, finance, marketing), arts (design, music, fine arts), engineering, law, education, and many other disciplines."
    },
    {
      question: "How long does the application process typically take?",
      answer: "The timeline varies depending on the program and institution. Generally, the process from initial consultation to acceptance can take anywhere from 2-6 months. We recommend starting your journey with us at least 6-12 months before your intended start date."
    },
    {
      question: "Can you help international students find programs?",
      answer: "Yes! We have extensive experience helping international students navigate the complexities of applying to programs abroad. We can provide guidance on visa requirements, language proficiency tests, credential evaluation, and finding programs that accept international applicants across all fields of study."
    },
    {
      question: "What information do I need to provide for an initial consultation?",
      answer: "For an initial consultation, it's helpful to have your academic transcripts, resume/CV, a brief statement about your career goals, and any standardized test scores (if applicable). However, you can start the process even without all these documents, and we'll guide you through what's needed."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-16 tracking-wider text-center">
          Frequently Asked Questions
        </h2>
        
        <div className="max-w-4xl mx-auto">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className="mb-6 border border-gray-800 rounded-lg overflow-hidden"
            >
              <button
                className="w-full text-left p-6 flex justify-between items-center bg-black/30 hover:bg-black/50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="font-space text-xl text-white">{item.question}</h3>
                <span className="text-blue-400 text-2xl">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="p-6 font-exo text-gray-300 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="font-exo text-xl text-gray-300 mb-8">
            Don't see your question? Reach out to us directly.
          </p>
          <a 
            href="#contact-form" 
            className="font-space text-lg bg-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-600 transition-colors inline-block"
          >
            Ask Us Anything
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactFAQ; 