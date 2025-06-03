import React, { useState, useRef, useEffect } from 'react';

interface VideoData {
  id: string;
  src: string;
  poster: string;
  title: string;
}

const videosData: VideoData[] = [
  { id: '1', src: './assets/video/displayvid(3).mp4', poster: '/assets/video/poster/poster(1).jpg', title: 'Wait the Media' },
  { id: '2', src: './assets/video/displayvid(1).mp4', poster: '/assets/video/poster/poster(2).jpg', title: 'Wait the Media' },
  { id: '3', src: './assets/video/displayvid(2).mp4', poster: '/assets/video/poster/poster(4).jpg', title: 'Wait the Media' },
  { id: '4', src: './assets/video/displayvid(4).mp4', poster: '/assets/video/poster/poster(5).jpg', title: 'Wait the Media' },
  { id: '5', src: './assets/video/displayvid(5).mp4', poster: '/assets/video/poster/poster(3).jpg', title: 'Wait the Media' },
];

const VideoSlider: React.FC = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnded = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videosData.length);
  };

  const handlePreviewClick = (index: number) => {
    setCurrentVideoIndex(index);
  };
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); 
      videoRef.current.play().catch(error => {
        // Autoplay was prevented.
        // console.warn("Autoplay prevented:", error);
      });
    }
  }, [currentVideoIndex]);


  const currentVideo = videosData[currentVideoIndex];
  const nextVideoPreview1Index = (currentVideoIndex + 1) % videosData.length;
  const nextVideoPreview2Index = (currentVideoIndex + 2) % videosData.length;
  
  const previewsToDisplay = [
    videosData[nextVideoPreview1Index],
    videosData[nextVideoPreview2Index],
  ];


  return (
    <div className="w-full my-4 md:my-6 flex flex-row items-start space-x-2 sm:space-x-3"> {/* Adjusted max-width and spacing */}
      {/* Left Column: Previews */}
      <div className="w-1/4 flex flex-col space-y-1.5 sm:space-y-2"> {/* Adjusted spacing */}
        <p className="text-xs text-gray-400 mb-0.5 sm:mb-1 text-center sm:text-left">Up Next:</p> {/* Adjusted margin */}
        {previewsToDisplay.map((previewVideo, index) => (
          <div
            key={previewVideo.id}
            className="w-full rounded-md shadow-md overflow-hidden cursor-pointer aspect-[9/16] bg-slate-700 hover:opacity-80 transition-opacity duration-200"
            onClick={() => handlePreviewClick((currentVideoIndex + 1 + index) % videosData.length)}
            role="button"
            aria-label={`Play ${previewVideo.title}`}
            tabIndex={0}
            onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') handlePreviewClick((currentVideoIndex + 1 + index) % videosData.length);}}
          >
            <img
              src={previewVideo.poster}
              alt={previewVideo.title + " preview"}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Right Column: Main Video Player */}
      <div className="w-3/4">
        <div className="aspect-[9/16] w-full bg-black rounded-lg shadow-xl overflow-hidden relative">
          <video
            ref={videoRef}
            key={currentVideo.src} 
            className="w-full h-full object-cover"
            src={currentVideo.src}
            poster={currentVideo.poster}
            controls
            autoPlay
            muted 
            playsInline 
            onEnded={handleVideoEnded}
            aria-label={currentVideo.title}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoSlider;