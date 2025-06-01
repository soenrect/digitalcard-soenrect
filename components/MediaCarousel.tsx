
import React, { useState, useEffect, useRef } from 'react';
import { CarouselMediaItem } from '../types';

interface MediaCarouselProps {
  mediaItems: CarouselMediaItem[];
  slideIntervalMs: number;
  className?: string; // For the main container of the carousel
  itemClassName?: string; // For the div wrapping the media item itself (image/video) to control size
}

const FADE_TRANSITION_DURATION_MS = 500; // Duration of the fade effect

const MediaCarousel: React.FC<MediaCarouselProps> = ({
  mediaItems,
  slideIntervalMs,
  className = '',
  itemClassName = 'w-full h-full', // Default to fill container
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeItem, setActiveItem] = useState<CarouselMediaItem | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slideIntervalRef = useRef<number | null>(null);
  const transitionTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Initialize or update activeItem when mediaItems array changes
    if (mediaItems && mediaItems.length > 0) {
      // If current activeItem is no longer valid or not set, reset to the first item
      const currentActiveIsValid = activeItem && mediaItems.some(item => item.id === activeItem.id);
      if (!currentActiveIsValid) {
        setActiveItem(mediaItems[0]);
        setCurrentIndex(0);
      } else {
        // If current active item is still in the list, ensure currentIndex matches
        const newIndex = mediaItems.findIndex(item => item.id === activeItem.id);
        if (newIndex !== -1 && newIndex !== currentIndex) {
            setCurrentIndex(newIndex);
        }
      }
    } else {
      setActiveItem(null); // No items, so no active item
      setCurrentIndex(0);
    }
  }, [mediaItems, activeItem]); // activeItem added to dep array to handle external changes to mediaItems


  useEffect(() => {
    // Effect for handling the slide transitions
    if (!activeItem || !mediaItems || mediaItems.length <= 1) {
        if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
        setIsTransitioning(false); // Ensure not stuck in transitioning state
        return;
    }

    const changeSlide = () => {
      setIsTransitioning(true);

      transitionTimeoutRef.current = window.setTimeout(() => {
        setCurrentIndex(prevIndex => {
          const nextIndex = (prevIndex + 1) % mediaItems.length;
          setActiveItem(mediaItems[nextIndex]);
          setIsTransitioning(false);
          return nextIndex;
        });
      }, FADE_TRANSITION_DURATION_MS);
    };

    // Clear existing interval before setting a new one
    if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    slideIntervalRef.current = window.setInterval(changeSlide, slideIntervalMs);

    return () => {
      if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    };
  }, [activeItem, mediaItems, slideIntervalMs, currentIndex]);


  if (!activeItem || !mediaItems || mediaItems.length === 0) {
    return (
      <div className={`${className} ${itemClassName} flex items-center justify-center bg-slate-800 rounded-lg`}>
        <p className="text-gray-400 text-sm">No media available.</p>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className={`${itemClassName} transition-opacity ease-in-out ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ transitionDuration: `${FADE_TRANSITION_DURATION_MS}ms` }}
      >
        {activeItem.type === 'image' ? (
          <img
            src={activeItem.src}
            alt={activeItem.alt}
            className="w-full h-full object-cover"
            key={activeItem.id} // Key ensures re-render if src changes for same type
          />
        ) : (
          <video
            key={activeItem.id} // Key ensures re-mount for video, important for autoplay
            className="w-full h-full object-cover"
            src={activeItem.src}
            poster={activeItem.poster}
            autoPlay
            muted
            loop
            playsInline
            aria-label={activeItem.alt}
          />
        )}
      </div>
    </div>
  );
};

export default MediaCarousel;
