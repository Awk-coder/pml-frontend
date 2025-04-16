import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // University images for the showcase - updated with more recruitment-focused images
  const universityImages = [
    {
      name: "University Campus",
      image:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    },
    {
      name: "Student Orientation",
      image:
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    },
    {
      name: "International Students",
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    },
    {
      name: "University Fair",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    },
    {
      name: "Campus Tour",
      image:
        "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    },
    {
      name: "Student Recruitment",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    },
  ];

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex((prevIndex) =>
        prevIndex === universityImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [universityImages.length]);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Hero content */}
      <div className="container mx-auto px-6 relative z-20 flex flex-col items-center justify-center min-h-screen">
        <h1 className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-8 animate-fade-in">
          Find Your Path to <br />
          <span className="text-white">Higher Education</span>
        </h1>
        <p className="font-exo text-xl md:text-2xl text-white text-center mb-12 max-w-3xl animate-slide-up delay-100">
          Your gateway to a global education and career
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-200">
          <button
            onClick={() => navigate("/programs")}
            className="font-space px-10 py-4 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors text-lg font-medium tracking-wider"
          >
            Find Programs
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="font-space px-10 py-4 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors text-lg font-medium tracking-wider"
          >
            Connect With Us
          </button>
        </div>
      </div>

      {/* University showcase */}
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <div className="absolute inset-0 z-0">
          {universityImages.map((uni, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === activeImageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={uni.image}
                alt={uni.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Image navigation dots */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
          {universityImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === activeImageIndex
                  ? "bg-white scale-110"
                  : "bg-white/30"
              }`}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
