
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CarouselMediaItem } from '../types';

interface HorizontalMediaScrollerProps {
  mediaItems: CarouselMediaItem[];
  itemHeightClassName?: string;
  itemWidthClassName?: string;
  itemAspectRatioClassName?: string;
  className?: string;
  slideDuration?: string; // e.g., "40s", "60s"
}

const HorizontalMediaScroller: React.FC<HorizontalMediaScrollerProps> = ({
  mediaItems,
  itemHeightClassName = 'h-40',
  itemWidthClassName,
  itemAspectRatioClassName = 'aspect-video',
  className = '',
  slideDuration = '100s',
}) => {
  const [translateX, setTranslateX] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [translateXAtDragStart, setTranslateXAtDragStart] = useState(0);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const singleSetWidthRef = useRef<number>(0);
  const lastTimestampRef = useRef<number>(0);

  const parseDuration = (durationStr: string): number => {
    const defaultDurationSeconds = 60;
    if (durationStr.endsWith('s')) {
      const seconds = parseFloat(durationStr.substring(0, durationStr.length - 1));
      return isNaN(seconds) || seconds <=0 ? defaultDurationSeconds : seconds;
    }
    return defaultDurationSeconds;
  };

  useEffect(() => {
    if (scrollerRef.current && mediaItems.length > 0) {
      // Calculate the width of a single set of items
      // This assumes the duplicated items correctly double the scrollWidth
      const totalWidth = scrollerRef.current.scrollWidth;
      singleSetWidthRef.current = totalWidth / 2;
    }
  }, [mediaItems]);

  const animateScroll = useCallback((timestamp: number) => {
    if (!singleSetWidthRef.current || singleSetWidthRef.current === 0) {
      animationFrameRef.current = requestAnimationFrame(animateScroll);
      return;
    }

    if (lastTimestampRef.current === 0) {
      lastTimestampRef.current = timestamp;
      animationFrameRef.current = requestAnimationFrame(animateScroll);
      return;
    }

    const deltaTime = (timestamp - lastTimestampRef.current) / 1000; // seconds
    lastTimestampRef.current = timestamp;

    if (!isHovering && !isDragging) {
      const durationInSeconds = parseDuration(slideDuration);
      const scrollSpeedPxPerSec = singleSetWidthRef.current / durationInSeconds;
      
      setTranslateX(prevTranslateX => {
        let newTranslateX = prevTranslateX - scrollSpeedPxPerSec * deltaTime;
        // Wrap around logic
        if (newTranslateX <= -singleSetWidthRef.current) {
          newTranslateX += singleSetWidthRef.current;
        }
        return newTranslateX;
      });
    }
    animationFrameRef.current = requestAnimationFrame(animateScroll);
  }, [isHovering, isDragging, slideDuration, mediaItems.length]);

  useEffect(() => {
    if (mediaItems.length > 0) {
      lastTimestampRef.current = 0; // Reset timestamp when animation restarts
      animationFrameRef.current = requestAnimationFrame(animateScroll);
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animateScroll, mediaItems.length]);

  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.style.transform = `translateX(${translateX}px)`;
    }
  }, [translateX]);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (mediaItems.length === 0) return;
    event.preventDefault(); // Prevent text selection/image drag
    setIsDragging(true);
    setDragStartX(event.clientX);
    setTranslateXAtDragStart(translateX);
    if (scrollerRef.current) {
        scrollerRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!isDragging || !singleSetWidthRef.current) return;
    const deltaX = event.clientX - dragStartX;
    let newTranslateX = translateXAtDragStart + deltaX;

    // Wrap around logic for dragging
    if (singleSetWidthRef.current > 0) {
        newTranslateX = newTranslateX % singleSetWidthRef.current;
        if (newTranslateX > 0) {
            newTranslateX -= singleSetWidthRef.current;
        }
    }
    setTranslateX(newTranslateX);
  }, [isDragging, dragStartX, translateXAtDragStart]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
     if (scrollerRef.current) {
        scrollerRef.current.style.cursor = 'grab';
    }
  }, [isDragging]);
  
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      // Add touch events if desired
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);


  if (!mediaItems || mediaItems.length === 0) {
    return (
      <div className={`${className} ${itemHeightClassName} flex items-center justify-center bg-slate-800 rounded-lg`}>
        <p className="text-gray-400 text-sm">No media available.</p>
      </div>
    );
  }

  const duplicatedMediaItems = [...mediaItems, ...mediaItems];

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      onMouseEnter={() => { if(mediaItems.length > 0) setIsHovering(true); }}
      onMouseLeave={() => { if(mediaItems.length > 0) setIsHovering(false); }}
      aria-label="Interactive scrolling media highlights"
    >
      <div
        ref={scrollerRef}
        className="flex whitespace-nowrap"
        style={{ 
            cursor: mediaItems.length > 0 ? (isDragging ? 'grabbing' : 'grab') : 'default',
            willChange: 'transform', // Optimization hint
            backfaceVisibility: 'hidden' // Helps prevent rendering glitches
        }}
        onMouseDown={handleMouseDown}
      >
        {duplicatedMediaItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className={`flex-shrink-0 rounded-lg overflow-hidden shadow-md bg-slate-700 
                        mx-1.5 sm:mx-2
                        ${itemHeightClassName} 
                        ${itemWidthClassName ? itemWidthClassName : ''} 
                        ${itemAspectRatioClassName ? itemAspectRatioClassName : ''}`}
            // Prevent individual item drag for images/videos
            onDragStart={(e) => e.preventDefault()}
          >
            {item.type === 'image' ? (
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover pointer-events-none" // pointer-events-none for child to let parent handle drag
                loading="lazy"
              />
            ) : (
              <video
                className="w-full h-full object-cover pointer-events-none" // pointer-events-none for child
                src={item.src}
                poster={item.poster}
                autoPlay // Added autoPlay attribute
                muted 
                loop
                playsInline // Important for iOS
                aria-label={item.alt}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalMediaScroller;
