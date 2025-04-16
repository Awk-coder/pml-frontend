import React from "react";
import SquaresBackground from "../layout/SquaresBackground";

interface UniversitiesHeroProps {
  onExploreClick?: () => void;
}

const UniversitiesHero: React.FC<UniversitiesHeroProps> = ({
  onExploreClick = () => {},
}) => {
  return (
    <div className="relative min-h-[70vh] bg-black overflow-hidden w-full">
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
                src={`/images/university-${num}.jpg`}
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

      <div className="container mx-auto px-6 relative z-20 flex flex-col items-center justify-center min-h-[70vh]">
        <h1 className="font-orbitron text-4xl md:text-6xl font-bold text-center mb-8 animate-fade-in">
          Partner <span className="text-blue-400">Universities</span>
        </h1>
        <p className="font-exo text-xl md:text-2xl text-center mb-12 max-w-3xl animate-slide-up delay-100 text-gray-300">
          Discover our network of prestigious institutions offering world-class education and training programs.
        </p>

        <button
          onClick={onExploreClick}
          className="font-space px-10 py-4 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors text-lg font-medium tracking-wider animate-slide-up delay-200"
        >
          Explore Universities
        </button>
      </div>
    </div>
  );
};

export default UniversitiesHero; 