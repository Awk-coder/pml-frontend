import React, { useEffect, useRef, useState } from "react";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

// Updated gallery images with direct Unsplash links - properly matched to content
const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    alt: "International Students",
    category: "Students",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1186&q=80",
    alt: "University Campus",
    category: "Campus",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    alt: "University Library",
    category: "Facilities",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    alt: "Student Orientation",
    category: "Events",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80",
    alt: "Student Collaboration",
    category: "Academics",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    alt: "Campus Tour",
    category: "Campus Life",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1491295314828-fb03946d9b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    alt: "Student Activities",
    category: "Campus Life",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    alt: "Graduation Ceremony",
    category: "Events",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    alt: "University Research",
    category: "Research",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80",
    alt: "Student Housing",
    category: "Housing",
  },
];

interface MasonryGalleryProps {
  className?: string;
}

const MasonryGallery: React.FC<MasonryGalleryProps> = ({ className = "" }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Auto-scroll effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // Adjust for faster/slower scrolling

    const scroll = () => {
      if (!isScrolling && scrollContainer) {
        scrollPosition += scrollSpeed;
        scrollContainer.scrollLeft = scrollPosition;

        // Reset scroll position when reaching the end for infinite scroll effect
        if (
          scrollPosition >=
          scrollContainer.scrollWidth - scrollContainer.clientWidth
        ) {
          scrollPosition = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    scroll();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isScrolling]);

  // Mouse interaction handlers for manual scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsScrolling(true);
    setStartX(e.pageX - scrollRef.current!.offsetLeft);
    setScrollLeft(scrollRef.current!.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsScrolling(false);
  };

  const handleMouseLeave = () => {
    setIsScrolling(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isScrolling) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current!.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollRef.current!.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className={`w-full overflow-hidden bg-black py-20 ${className}`}>
      <div className="container mx-auto px-6 mb-12">
        <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-4 tracking-wider text-center">
          University Campus Life
        </h2>
        <p className="font-exo text-xl text-gray-300 max-w-2xl mx-auto font-light text-center mb-12 leading-relaxed">
          Take a visual tour of our partner universities' facilities and vibrant
          campus life.
        </p>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide pb-8 pt-4 px-6 gap-6"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {/* First set of images */}
        {galleryImages.map((image) => (
          <div
            key={image.id}
            className="flex-shrink-0 relative group overflow-hidden rounded-lg shadow-lg border border-gray-800"
            style={{ width: "350px", height: "250px" }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                const target = e.currentTarget;
                target.onerror = null;
                target.src = `https://source.unsplash.com/350x250/?university,${image.category.toLowerCase()}&sig=${
                  image.id
                }`;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300 flex items-end">
              <div className="p-4 w-full">
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

        {/* Duplicate images for infinite scroll effect */}
        {galleryImages.map((image) => (
          <div
            key={`dup-${image.id}`}
            className="flex-shrink-0 relative group overflow-hidden rounded-lg shadow-lg border border-gray-800"
            style={{ width: "350px", height: "250px" }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                const target = e.currentTarget;
                target.onerror = null;
                target.src = `https://source.unsplash.com/350x250/?university,${image.category.toLowerCase()}&sig=${
                  image.id + 10
                }`;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300 flex items-end">
              <div className="p-4 w-full">
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
    </div>
  );
};

export default MasonryGallery;
