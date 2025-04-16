import React from "react";
import SquaresBackground from "../layout/SquaresBackground";

const AboutHero: React.FC = () => {
  return (
    <div className="relative min-h-[60vh] bg-black overflow-hidden w-full">
      <SquaresBackground
        direction="diagonal"
        speed={0.3}
        squareSize={40}
        borderColor="rgba(255, 255, 255, 0.3)"
        hoverFillColor="#333"
        backgroundColor="#000000"
      />
      
      <div className="absolute inset-0 z-[1] opacity-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-full">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="relative overflow-hidden">
              <img
                src={`/images/campus-${num}.jpg`}
                alt="University Campus"
                className="object-cover w-full h-full"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  const target = e.currentTarget;
                  target.onerror = null;
                  target.src = `https://source.unsplash.com/800x600/?university,campus,education&sig=${num}`;
                }}
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-6 relative z-20 flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="font-orbitron text-4xl md:text-6xl font-bold text-center mb-8 animate-fade-in">
          About <span className="text-blue-400">PML Academy</span>
        </h1>
        <p className="font-exo text-xl md:text-2xl text-center mb-12 max-w-3xl animate-slide-up delay-100 text-gray-300">
          Connecting ambitious students with world-class healthcare education institutions since 2015.
        </p>
      </div>
    </div>
  );
};

export default AboutHero; 