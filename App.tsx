import React from 'react';
import HeroSection from './components/HeroSection';
import ScrollToTopButton from './components/ScrollToTopButton';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center text-white p-4 sm:p-6 lg:p-8 overflow-x-hidden selection:bg-blue-600 selection:text-white pt-12 sm:pt-16 md:pt-20">
      <HeroSection />
      <ScrollToTopButton />
    </div>
  );
};

export default App;