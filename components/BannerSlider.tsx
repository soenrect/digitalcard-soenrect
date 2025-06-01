import React, { useState, useEffect, useRef } from 'react';
import { CarouselMediaItem } from '../types'; // Updated import

// --- IMPORTANT ---
// USER ACTION REQUIRED:
// 1. Place your banner media (images, videos, video posters) in the 'public/banner-media/' directory.
// 2. Update this 'bannerMediaData' array with your actual file names and types.
const bannerMediaData: CarouselMediaItem[] = [ // Updated type
  // { id: 'banner1', type: 'image', src: 'https://picsum.photos/seed/agencyBanner1/1600/900', alt: 'Showcase of Stunning Web Designs' },
  { id: 'banner1', type: 'video', src: './assets/video/backgroundvid.mp4', poster: '/', alt: 'Dynamic Digital Marketing Animation' },
  // { id: 'banner3', type: 'image', src: 'https://picsum.photos/seed/agencyBanner2/1600/900', alt: 'Creative Branding Concepts Collage' },
  // { id: 'banner4', type: 'video', src: '/banner-media/video2.mp4', poster: 'https://picsum.photos/seed/agencyVideoPoster2/1600/900', alt: 'Client Success Story Montage' },
  // { id: 'banner5', type: 'image', src: 'https://picsum.photos/seed/agencyBanner3/1600/900', alt: 'Our Team Crafting Digital Solutions' },
  // Add or remove items as needed
];

const FADE_TRANSITION_DURATION_MS = 500; // Duration of the fade effect (e.g., 0.5 seconds)
const SLIDE_INTERVAL_MS = 5000;         // How long each slide stays visible (5 seconds)

const BannerSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // activeItem holds the item currently being rendered (even during fade-out/in)
  const [activeItem, setActiveItem] = useState<CarouselMediaItem>(bannerMediaData.length > 0 ? bannerMediaData[0] : {} as CarouselMediaItem); // Updated type and initial state
  // isTransitioning controls the opacity for the fade effect
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slideIntervalRef = useRef<number | null>(null);
  const transitionTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (bannerMediaData.length === 0) {
        setActiveItem({} as CarouselMediaItem); // Clear active item if no data
        return;
    }
    if (!activeItem.id && bannerMediaData.length > 0) { // Initialize if not already
        setActiveItem(bannerMediaData[0]);
    }
    
    // Function to handle the slide change logic
    const changeSlide = () => {
      if (bannerMediaData.length <= 1) return; // No need to slide if 0 or 1 item
      setIsTransitioning(true); // Start fade-out by setting opacity to 0

      // After fade-out duration, change the content and start fade-in
      transitionTimeoutRef.current = window.setTimeout(() => {
        setCurrentIndex(prevIndex => {
          const nextIndex = (prevIndex + 1) % bannerMediaData.length;
          setActiveItem(bannerMediaData[nextIndex]); // Update the item to be displayed
          setIsTransitioning(false); // Start fade-in by setting opacity to 1
          return nextIndex;
        });
      }, FADE_TRANSITION_DURATION_MS);
    };
    
    if (bannerMediaData.length > 1) {
        slideIntervalRef.current = window.setInterval(changeSlide, SLIDE_INTERVAL_MS);
    }

    // Clear timeouts and interval on component unmount
    return () => {
      if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    };
  }, [activeItem, currentIndex]); // Rerun if activeItem or currentIndex changes, or on mount

  if (bannerMediaData.length === 0 || !activeItem.id) {
    return <div className="relative w-full h-48 sm:h-56 md:h-64 bg-black overflow-hidden flex items-center justify-center"><p className="text-gray-400">No banner media available.</p></div>;
  }

  return (
    <div className="relative w-full h-48 sm:h-56 md:h-64 bg-black overflow-hidden">
      <div
        className={`w-full h-full transition-opacity ease-in-out ${ // Using Tailwind's duration-500 for the 500ms fade
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ transitionDuration: `${FADE_TRANSITION_DURATION_MS}ms`}}
      >
        {activeItem.type === 'image' ? (
          <img
            src={activeItem.src}
            alt={activeItem.alt}
            className="w-full h-full object-cover"
            key={activeItem.id} // Key helps React efficiently update/replace the element
          />
        ) : (
          <video
            key={activeItem.id} // Important for video re-mount to ensure autoplay works correctly
            className="w-full h-full object-cover"
            src={activeItem.src}
            poster={activeItem.poster}
            autoPlay
            muted
            loop // Videos will loop if their duration is shorter than the slide interval
            playsInline
            aria-label={activeItem.alt}
          />
        )}
      </div>
    </div>
  );
};

export default BannerSlider;
