import React from "react";
import Navbar from "../components/layout/Navbar";
import AboutHero from "../components/about/AboutHero";
import AboutMission from "../components/about/AboutMission";
import AboutHistory from "../components/about/AboutHistory";
import AboutValues from "../components/about/AboutValues";
import AboutTeam from "../components/about/AboutTeam";
import AboutPartners from "../components/about/AboutPartners";
import AboutCTA from "../components/about/AboutCTA";

const AboutPage: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <AboutHero />
      <AboutMission />
      <AboutHistory />
      <AboutValues />
      <AboutTeam />
      <AboutPartners />
      <AboutCTA />
    </div>
  );
};

export default AboutPage; 