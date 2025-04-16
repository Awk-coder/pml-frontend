import React from "react";
import HeroSection from "../components/home/HeroSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import CampusGallerySection from "../components/home/CampusGallerySection";
import MasonryGallery from "../components/home/MasonryGallery";
import ProgramsSection from "../components/home/ProgramsSection";
import WhyChooseSection from "../components/home/WhyChooseSection";

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <MasonryGallery className="mt-0 mb-0" />
      <WhyChooseSection />
      <ProgramsSection />
      <CampusGallerySection />
      {/* <TestimonialsSection /> */}
    </div>
  );
};

export default HomePage;
