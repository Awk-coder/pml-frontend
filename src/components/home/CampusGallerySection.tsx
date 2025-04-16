import React, { useState } from "react";

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
  unsplashQuery: string;
}

const galleryImages: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",
    alt: "Modern Library",
    category: "Facilities",
    unsplashQuery: "university,library",
  },
  {
    src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d",
    alt: "Science Lab",
    category: "Academics",
    unsplashQuery: "laboratory,science",
  },
  {
    src: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b",
    alt: "Student Center",
    category: "Campus Life",
    unsplashQuery: "student,center,university",
  },
  {
    src: "https://images.unsplash.com/photo-1577223625816-7546f13df25d",
    alt: "Sports Complex",
    category: "Athletics",
    unsplashQuery: "sports,complex,gym",
  },
  {
    src: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5",
    alt: "Dormitories",
    category: "Housing",
    unsplashQuery: "dormitory,student,housing",
  },
  {
    src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
    alt: "Graduation Ceremony",
    category: "Events",
    unsplashQuery: "graduation,ceremony",
  },
  {
    src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12",
    alt: "Research Center",
    category: "Research",
    unsplashQuery: "research,laboratory,science",
  },
  {
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    alt: "Student Lounge",
    category: "Campus Life",
    unsplashQuery: "student,lounge,relaxation",
  },
];

const CampusGallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const categories = [
    "All",
    ...Array.from(new Set(galleryImages.map((img) => img.category))),
  ];

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-4 tracking-wider">
            Explore Our Campus
          </h2>
          <p className="font-exo text-xl text-gray-300 max-w-2xl mx-auto font-light">
            Take a visual journey through our state-of-the-art facilities and
            vibrant campus life.
          </p>
        </div>

        <div className="flex flex-wrap justify-center mb-8 gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`font-space px-4 py-2 rounded-full text-sm transition-colors ${
                activeCategory === category
                  ? "bg-white text-black"
                  : "bg-transparent text-white border border-white hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg shadow-lg border border-gray-800"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  const target = e.currentTarget;
                  target.onerror = null;
                  target.src = `https://source.unsplash.com/600x400/?${image.unsplashQuery}&sig=${index}`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-end transition-all duration-300 group-hover:bg-black/60">
                <div className="p-4 w-full transform transition-transform duration-300 group-hover:translate-y-0">
                  <span className="inline-block px-2 py-1 bg-white/20 text-white text-xs rounded mb-2 font-space">
                    {image.category}
                  </span>
                  <h3 className="font-orbitron text-white text-lg group-hover:text-xl transition-all duration-300">
                    {image.alt}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="font-space px-8 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors tracking-wider">
            View All Campus Facilities
          </button>
        </div>
      </div>
    </section>
  );
};

export default CampusGallerySection;
