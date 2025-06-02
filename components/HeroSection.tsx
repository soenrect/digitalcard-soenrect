
import React from 'react';
import { StatInfo, FeatureInfo, CarouselMediaItem } from '../types';
import StatDisplay from './StatDisplay';
import FeatureItem from './FeatureItem';
import ClientLogos from './ClientLogos';
import VideoSlider from './VideoSlider';
import BannerSlider from './BannerSlider';
import HorizontalMediaScroller from './HorizontalMediaScroller'; // Import the new HorizontalMediaScroller component

const mainStats: StatInfo[] = [
  { value: '20+', label: 'Happy Clients' },
  { value: '6+', label: 'Years Experience' },
  { value: '120+', label: 'Projects Delivered' },
];

const features: FeatureInfo[] = [
  { id: 'mappingprojection', letter: 'M', title: 'Mapping Projection', description: 'Create visual representations to enhance your agenda.', colorClass: 'bg-blue-600' },
  { id: 'webdev', letter: 'W', title: 'Web Development', description: 'Developing engaging digital experiences that connect you with your audience and drive online growth.', colorClass: 'bg-blue-500' },
  { id: 'graphicdesign', letter: 'G', title: 'Graphic Design', description: 'Creating compelling visual identities, branding materials, and marketing collateral that resonate with your target audience.', colorClass: 'bg-blue-400' },
];

const communityAvatarsColors: string[] = ['bg-blue-700', 'bg-blue-600', 'bg-blue-500', 'bg-blue-400'];

// Updated media data for horizontal scrollers, ensuring 4-6 items each
const scroller1MediaData: CarouselMediaItem[] = [
  { id: 's1_vid1', type: 'video', src: './assets/video/backgroundvid.mp4', poster: '/', alt: 'Mapping Show Projection' },
  { id: 's1_img2', type: 'image', src: './assets/image/porto(11).jpg', alt: 'Imam Muda Salman' },
  { id: 's1_vid2', type: 'video', src: './assets/video/showvid3.mp4', poster: '/', alt: 'Mapping Show' },
  { id: 's1_img1', type: 'image', src: './assets/image/porto(7).jpg', alt: 'Calender' },
  { id: 's1_img4', type: 'image', src: './assets/image/porto(2).jpg', alt: '' },
];

const scroller2MediaData: CarouselMediaItem[] = [
  { id: 's2_img1', type: 'image', src: './assets/image/porto(9).jpg', alt: 'Presentation Design' },
  { id: 's2_vid2', type: 'video', src: './assets/video/showvid2.mp4', poster: '/', alt: 'Mapping Show Projection' },
  { id: 's2_img3', type: 'image', src: './assets/image/porto.jpg', alt: 'Bussines Development' },
  { id: 's2_vid1', type: 'video', src: './assets/video/showvid4.mp4', poster: '/', alt: 'Video Company Profile' },
  { id: 's2_img4', type: 'image', src: './assets/image/porto(5).jpg', alt: 'Brochure' },
  { id: 's2_img5', type: 'image', src: './assets/image/porto(12).jpg', alt: 'WebDev' },
];


// Placeholder SVG data URIs for social icons (neutral-400 color: #a3a3a3)
const instagramIconSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23a3a3a3'%3E%3Cpath d='M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2A5.8 5.8 0 0 1 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2M7.6 4A3.6 3.6 0 0 0 4 7.6V16.4C4 18.39 5.61 20 7.6 20H16.4A3.6 3.6 0 0 0 20 16.4V7.6C20 5.61 18.39 4 16.4 4H7.6M17.25 5.5A1.25 1.25 0 0 1 18.5 6.75A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75A1.25 1.25 0 0 1 17.25 5.5M12 7A5 5 0 0 1 17 12A5 5 0 0 1 12 17A5 5 0 0 1 7 12A5 5 0 0 1 12 7M12 9A3 3 0 0 0 9 12A3 3 0 0 0 12 15A3 3 0 0 0 15 12A3 3 0 0 0 12 9Z'/%3E%3C/svg%3E";
const tiktokIconSvg = "./assets/svg/tiktok.svg";
const websiteIconSvg = "./assets/svg/web.svg";


const HeroSection: React.FC = () => {
  return (
    <div className="w-full max-w-5xl xl:max-w-6xl mx-auto">
      <div className="bg-black rounded-2xl shadow-2xl overflow-hidden relative">
        {/* Banner Slider replaces the static image */}
        <BannerSlider />

        {/* Content Wrapper */}
        <div className="px-6 pb-6 sm:px-10 sm:pb-10 md:px-12 md:pb-12 lg:px-14 lg:pb-14 relative">

          {/* Logo and Socials Row */}
          <div className="flex justify-between items-center relative z-10
                          -mt-[48px] sm:-mt-[56px]">
            {/* Logo Section */}
            <div className="bg-black rounded-full">
              <img
                src="./assets/image/mainlogo.png"
                alt="Digital Agency Logo"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-black object-cover shadow-xl"
              />
            </div>

            {/* Social Icons Section - Unified Box */}
            <div className="flex items-center space-x-2 bg-neutral-800 rounded-lg p-1.5 sm:p-2">
              <a href="https://www.instagram.com/soenrect" aria-label="Follow us on Instagram" className="group w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-md hover:bg-neutral-700 transition-colors duration-200" target="_blank" >
                <img
                  src={instagramIconSvg}
                  alt="Instagram"
                  className="w-5 h-5 transition-all duration-200 group-hover:filter group-hover:brightness-0 group-hover:invert group-hover:scale-110"
                />
              </a>
              <a href="https://www.tiktok.com/@soenrect5" aria-label="Follow us on TikTok" className="group w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-md hover:bg-neutral-700 transition-colors duration-200" target="_blank">
                 <img
                  src={tiktokIconSvg}
                  alt="TikTok"
                  className="w-5 h-5 transition-all duration-200 group-hover:filter group-hover:brightness-0 group-hover:invert group-hover:scale-110"
                />
              </a>
              <a href="#" aria-label="Visit our Website" className="group w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-md cursor-not-allowed" disabled>
                <img
                  src={websiteIconSvg}
                  alt="Website"
                  className="w-5 h-5 transition-all duration-200 group-hover:filter group-hover:brightness-0 group-hover:invert group-hover:scale-110"
                />
              </a>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16
                          mt-6 sm:mt-8 md:mt-10">
            {/* Left Column */}
            <div className="flex flex-col justify-center space-y-6 md:space-y-8">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-tight">
                Soenrect | <br className="hidden xs:inline sm:hidden md:inline" />
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
                  Meet Your Visual Need
                </span>
              </h1>
              <p className="text-gray-300 text-base sm:text-lg max-w-md">
                Pasoendan Creative Project, build impactful digital experiences that drive growth for your agenda, brand, etc. Let's collaborate to create something amazing together.
              </p>

              {/* Video Slider Component */}
              <VideoSlider />

              <div className="flex flex-col xs:flex-row space-y-3 xs:space-y-0 xs:space-x-4 pt-2">
                <a
                  href="https://api.whatsapp.com/send/?phone=6281324959098&text=Hello+Soenrect%2C+I%27m+interested+in+your+services+and+would+like+to+know+more%21&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors duration-300 text-sm sm:text-base text-center"
                >
                  Connet With Us via WhatsApp
                </a>
                <a
                  href="https://drive.google.com/file/d/1FcXq7nxk5TVeDX_-lq4ew6uiReaapVQx/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white font-semibold py-[calc(0.625rem-2px)] px-[calc(1.5rem-2px)] rounded-lg transition-colors duration-300 text-sm sm:text-base text-center"
                >
                  Portfolio Mapping Projection
                </a>
                <a
                  href="https://drive.google.com/file/d/1mpz0Z7MaBJqsBvVCCs-IkaRgeaTqcHTa/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white font-semibold py-[calc(0.625rem-2px)] px-[calc(1.5rem-2px)] rounded-lg transition-colors duration-300 text-sm sm:text-base text-center"
                >
                  Portfolio Website
                </a>
                <a
                  href="https://drive.google.com/file/d/1IAkn5cIRjx0psmh9GZ_0UAzIu4M5afpS/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white font-semibold py-[calc(0.625rem-2px)] px-[calc(1.5rem-2px)] rounded-lg transition-colors duration-300 text-sm sm:text-base text-center"
                >
                  Portfolio Graphic Design, etc
                </a>
                <a
                  href="https://drive.google.com/file/d/1d9kQKqxg7e2BtcXzTBR1XQmRvk2OqpK2/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white font-semibold py-[calc(0.625rem-2px)] px-[calc(1.5rem-2px)] rounded-lg transition-colors duration-300 text-sm sm:text-base text-center"
                >
                  Portfolio Bussiness Development
                </a>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-6">
                {mainStats.map((stat) => (
                  <StatDisplay key={stat.label} stat={stat} valueClassName="text-xl sm:text-2xl text-white" labelClassName="text-xs text-gray-400"/>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6 md:space-y-8">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white">Our Core Services</h3>
                <div className="space-y-4 sm:space-y-5">
                  {features.map((feature) => (
                    <FeatureItem key={feature.id} {...feature} />
                  ))}
                </div>
              </div>
              
              {/* Horizontal Scrollers Section - Title Removed */}
              <div className="mt-4 sm:mt-6"> {/* Added some margin-top to compensate for removed title's spacing */}
                <div className="flex flex-col space-y-4 sm:space-y-6">
                  <HorizontalMediaScroller
                    mediaItems={scroller1MediaData}
                    itemHeightClassName="h-36 sm:h-40 md:h-44"
                    itemAspectRatioClassName="aspect-video"
                    slideDuration="25s" 
                  />
                  <HorizontalMediaScroller
                    mediaItems={scroller2MediaData}
                    itemHeightClassName="h-36 sm:h-40 md:h-44"
                    itemAspectRatioClassName="aspect-video"
                    slideDuration="40s" 
                  />
                </div>
              </div>

              <ClientLogos />

              <div className="bg-slate-800 p-5 sm:p-6 rounded-xl space-y-4 shadow-lg">
                <div className="flex items-center -space-x-2 sm:-space-x-1.5">
                  {communityAvatarsColors.map((color, index) => (
                    <div key={index} className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${color} border-2 border-slate-800 ring-1 ring-offset-0 ring-offset-slate-800 ring-gray-600`}></div>
                  ))}
                </div>
                <p className="text-white font-medium text-base sm:text-lg">More About Us?</p>
                <a
                  href="#"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-blue-100 to-blue-500 hover:from-blue-300 hover:to-blue-400 text-white font-bold py-3 px-5 sm:px-6 rounded-lg transition-all duration-300 shadow-md text-sm sm:text-base text-center cursor-not-allowed"
                >
                  Coming Soon, Our Full Website
                </a>
                <p className="text-center text-xs sm:text-sm text-gray-400">
                  Have a question? <a href="https://api.whatsapp.com/send/?phone=6281324959098&text=Hello+Soenrect%2C+I%27m+interested+in+your+services+and+would+like+to+know+more%21&type=phone_number&app_absent=0" className="text-blue-400 hover:underline" target="_blank">Lets Connet Via WhatsApp.</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
