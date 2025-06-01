
import React from 'react';
import { CarouselMediaItem } from '../types';

interface HorizontalMediaScrollerProps {
  mediaItems: CarouselMediaItem[];
  itemHeightClassName?: string;
  itemWidthClassName?: string;
  itemAspectRatioClassName?: string;
  className?: string; // For the main scroller container
  slideDuration?: string; // e.g., "40s", "60s"
}

const HorizontalMediaScroller: React.FC<HorizontalMediaScrollerProps> = ({
  mediaItems,
  itemHeightClassName = 'h-40',
  itemWidthClassName,
  itemAspectRatioClassName = 'aspect-video',
  className = '',
  slideDuration = '60s', // Default slide duration
}) => {
  if (!mediaItems || mediaItems.length === 0) {
    return (
      <div className={`${className} ${itemHeightClassName} flex items-center justify-center bg-slate-800 rounded-lg`}>
        <p className="text-gray-400 text-sm">No media available.</p>
      </div>
    );
  }

  // Duplicate items for a seamless marquee effect
  const duplicatedMediaItems = [...mediaItems, ...mediaItems];

  return (
    <div
      className={`relative w-full overflow-hidden group ${className}`}
      aria-label="Automatically scrolling media highlights"
    >
      <div
        className="flex whitespace-nowrap animate-marquee group-hover:pause-animation"
        style={{ animationDuration: slideDuration }}
      >
        {duplicatedMediaItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`} // Ensure unique keys for duplicated items
            className={`flex-shrink-0 rounded-lg overflow-hidden shadow-md bg-slate-700 
                        mx-1.5 sm:mx-2  // Margin for spacing between items
                        ${itemHeightClassName} 
                        ${itemWidthClassName ? itemWidthClassName : ''} 
                        ${itemAspectRatioClassName ? itemAspectRatioClassName : ''}`}
          >
            {item.type === 'image' ? (
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <video
                className="w-full h-full object-cover"
                src={item.src}
                poster={item.poster}
                autoPlay
                muted
                loop
                playsInline
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
