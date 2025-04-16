import React from "react";
import SquaresBackground from "../layout/SquaresBackground";

interface ProgramsHeroProps {
  onCategorySelect?: (category: string) => void;
  activeCategory?: string;
  onExploreClick?: () => void;
}

const ProgramsHero: React.FC<ProgramsHeroProps> = ({
  onExploreClick = () => {},
}) => {
  const heroStyle = {
    position: "relative" as const,
    minHeight: "70vh",
    background: "black",
    overflow: "hidden",
    width: "100%",
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1.5rem",
    position: "relative" as const,
    zIndex: 10,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "70vh",
  };

  const headingStyle = {
    fontFamily: "Orbitron, sans-serif",
    fontSize: "3rem",
    fontWeight: "bold",
    color: "white",
    marginBottom: "1.5rem",
    textAlign: "center" as const,
    letterSpacing: "0.05em",
  };

  const subheadingStyle = {
    fontFamily: "Exo 2, sans-serif",
    fontSize: "1.5rem",
    color: "#bfdbfe",
    maxWidth: "48rem",
    margin: "0 auto 2.5rem",
    textAlign: "center" as const,
    fontWeight: 300,
    lineHeight: "1.6",
  };

  return (
    <div
      style={heroStyle}
      className="relative min-h-[70vh] bg-black overflow-hidden w-full"
    >
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
                src={`/images/healthcare-${num}.jpg`}
                alt="Healthcare Education"
                className="object-cover w-full h-full"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  const target = e.currentTarget;
                  target.onerror = null;
                  target.src = `https://source.unsplash.com/800x600/?healthcare,education,medical,university&sig=${num}`;
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        style={containerStyle}
        className="container mx-auto px-6 relative z-20 flex flex-col items-center justify-center min-h-[70vh]"
      >
        <h1
          style={headingStyle}
          className="text-4xl md:text-6xl font-bold text-center mb-8 animate-fade-in"
        >
          Academic <span className="text-blue-400">Programs</span>
        </h1>
        <p
          style={subheadingStyle}
          className="text-xl md:text-2xl text-center mb-12 max-w-3xl animate-slide-up delay-100"
        >
          Discover our comprehensive range of academic programs designed to
          prepare you for a successful career in your chosen field.
        </p>

        <button
          onClick={onExploreClick}
          className="font-space px-10 py-4 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors text-lg font-medium tracking-wider animate-slide-up delay-200"
        >
          Explore Programs
        </button>
      </div>
    </div>
  );
};

export default ProgramsHero;
