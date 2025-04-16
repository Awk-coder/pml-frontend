import React from "react";
import SquaresBackground from "../layout/SquaresBackground";

const ContactHero: React.FC = () => {
  return (
    <div className="relative min-h-[50vh] bg-black overflow-hidden w-full">
      <SquaresBackground
        direction="diagonal"
        speed={0.3}
        squareSize={40}
        borderColor="rgba(255, 255, 255, 0.3)"
        hoverFillColor="#333"
        backgroundColor="#000000"
      />

      <div className="container mx-auto px-6 relative z-20 flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="font-orbitron text-4xl md:text-6xl font-bold text-center mb-8 animate-fade-in">
          Contact <span className="text-blue-400">Us</span>
        </h1>
        <p className="font-exo text-xl md:text-2xl text-center mb-12 max-w-3xl animate-slide-up delay-100 text-gray-300">
          Have questions about finding the right program? Our team is here to
          help you every step of the way.
        </p>
      </div>
    </div>
  );
};

export default ContactHero;
