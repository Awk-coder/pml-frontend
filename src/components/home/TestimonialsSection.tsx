import React from 'react';

interface Testimonial {
  quote: string;
  name: string;
  program: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "EduConnect helped me find the perfect nursing program at UCMI. The faculty are incredible and the clinical placements gave me real-world experience.",
    name: "Sarah Tan",
    program: "Nursing, UCMI University",
    image: "/images/student-1.jpg"
  },
  {
    quote: "Thanks to EduConnect, I discovered UCMI's pharmacy program. The state-of-the-art labs and industry connections have been invaluable for my career.",
    name: "Raj Patel",
    program: "Pharmacy, UCMI University",
    image: "/images/student-2.jpg"
  },
  {
    quote: "EduConnect made it easy to compare healthcare programs and UCMI was clearly the best fit. Their physiotherapy program has exceeded my expectations.",
    name: "Li Wei",
    program: "Physiotherapy, UCMI University",
    image: "/images/student-3.jpg"
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-black text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold mb-6 tracking-wider">
            Student Success Stories
          </h2>
          <p className="font-exo text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            Hear from students we've connected with UCMI University's healthcare programs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-black p-8 rounded-lg border border-gray-800">
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full object-cover mr-5"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = `https://source.unsplash.com/100x100/?portrait,student&sig=${index}`;
                  }}
                />
                <div>
                  <h3 className="font-space text-xl font-medium mb-1">{testimonial.name}</h3>
                  <p className="font-exo text-sm text-gray-400">{testimonial.program}</p>
                </div>
              </div>
              <p className="font-exo italic text-gray-300 text-lg leading-relaxed">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 