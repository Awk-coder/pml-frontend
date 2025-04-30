import React from "react";
import HeroSection from "../components/home/HeroSection";
import CampusGallerySection from "../components/home/CampusGallerySection";
import MasonryGallery from "../components/home/MasonryGallery";
import ProgramsSection from "../components/home/ProgramsSection";
import CTASection from "../components/home/CTASection";

const HomePage: React.FC = () => {
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Masonry Gallery */}
      <MasonryGallery />

      {/* Programs Section */}
      <ProgramsSection />

      {/* Campus Gallery Section */}
      <CampusGallerySection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};

export default HomePage;
