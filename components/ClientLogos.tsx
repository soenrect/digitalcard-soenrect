import React from 'react';

interface ClientLogo {
  id: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

const clientLogosData: ClientLogo[] = [
  { id: '1', src: './assets/svg/logoclient1.svg', alt: 'West Java Youth Innovation Platform', width: 120, height: 40 },
  { id: '2', src: './assets/svg/logoclient2.svg', alt: 'Jabar Innovation Fellowship', width: 130, height: 40 },
  { id: '3', src: './assets/image/icon/icon(1).png', alt: '', width: 110, height: 40 },
  { id: '4', src: './assets/image/icon/icon(2).png', alt: '', width: 120, height: 40 },
  { id: '5', src: './assets/image/icon/icon(3).png', alt: '', width: 100, height: 40 },
  { id: '6', src: './assets/image/icon/icon(4).png', alt: '', width: 110, height: 40 },
  { id: '7', src: './assets/image/icon/icon(5).png', alt: '', width: 130, height: 40 },
  { id: '8', src: './assets/image/icon/icon(6).png', alt: '', width: 120, height: 40 },
  { id: '9', src: './assets/image/icon/icon(7).png', alt: '', width: 120, height: 40 },
  { id: '10', src: './assets/image/icon/icon(8).png', alt: '', width: 120, height: 40 },
  { id: '11', src: './assets/image/icon/icon(9).png', alt: '', width: 120, height: 40 },
  { id: '12', src: './assets/image/icon/icon(10).png', alt: '', width: 120, height: 40 },
  { id: '13', src: './assets/image/icon/icon(11).png', alt: '', width: 120, height: 40 },
  { id: '14', src: './assets/image/icon/icon(12).png', alt: '', width: 120, height: 40 },
  { id: '15', src: './assets/image/icon/icon(13).png', alt: '', width: 120, height: 40 },
];

const ClientLogos: React.FC = () => {
  // Duplicate logos for seamless marquee effect
  const duplicatedLogos = [...clientLogosData, ...clientLogosData];

  return (
    <div className="pt-6 pb-8 sm:pt-8 sm:pb-10 w-full"> {/* Adjusted padding */}
      <h3 className="text-xl sm:text-2xl font-semibold text-center text-white mb-6 sm:mb-8"> {/* Adjusted margin */}
        Trusted by Industry Leaders
      </h3>
      {/* The 'group' class enables pause on hover via CSS if .animate-marquee-css is styled with group-hover:animation-play-state:paused */}
      <div className="relative w-full overflow-hidden group">
        <div className="flex animate-marquee-css whitespace-nowrap"> {/* Use animate-marquee-css for CSS animation */}
          {duplicatedLogos.map((logo, index) => (
            <div key={`${logo.id}-${index}`} className="flex-shrink-0 mx-2 sm:mx-8 md:mx-10 py-2">
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-8 sm:h-10 md:h-12 max-w-none object-contain filter grayscale hover:grayscale-[50%] transition-all duration-300"
                style={{ 
                  minWidth: `${logo.width ? logo.width * 0.8 : 100}px`, 
                  height: `${logo.height ? logo.height * 0.8 : 32}px` 
                }} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientLogos;