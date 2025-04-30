import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, profile } = useAuth();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // University images for the showcase - using local images
  const universityImages = [
    {
      name: "University Campus",
      image: "/images/1.png",
    },
    {
      name: "Student Life",
      image: "/images/2.png",
    },
    {
      name: "Graduation Ceremony",
      image: "/images/3.png",
    },
    {
      name: "Laboratory Research",
      image: "/images/4.png",
    },
    {
      name: "Campus Library",
      image: "/images/5.png",
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

  // Function to navigate to the appropriate dashboard based on user role
  const navigateToDashboard = () => {
    if (!isAuthenticated || !profile) return;

    switch (profile.role) {
      case "student":
        navigate("/dashboard/student");
        break;
      case "university":
        navigate("/dashboard/university");
        break;
      case "agent":
        navigate("/dashboard/agent");
        break;
      case "admin":
        navigate("/admin/dashboard");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        {universityImages.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeImageIndex ? "opacity-60" : "opacity-0"
            }`}
          >
            <img
              src={item.image}
              alt={item.name}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/0 to-black/60"></div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
          Your Gateway to{" "}
          <span className="text-blue-400">Global Education</span>
        </h1>
        <p className="font-exo text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl animate-slide-up delay-100">
          Connecting ambitious students with world-class universities for
          life-changing educational opportunities.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 animate-slide-up delay-200">
          {isAuthenticated ? (
            <button
              onClick={navigateToDashboard}
              className="font-space px-10 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium tracking-wider"
            >
              Go to Dashboard
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/programs")}
                className="font-space px-10 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium tracking-wider"
              >
                Explore Programs
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="font-space px-10 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors text-lg font-medium tracking-wider"
              >
                Contact Us
              </button>
            </>
          )}
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3">
          {universityImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === activeImageIndex ? "bg-white" : "bg-white/30"
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
