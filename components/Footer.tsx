import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const companyName = "Pasoendan Creative Project | Digital Visual Solutions"; // Or your preferred company name

  return (
    <footer className="w-full py-6 sm:py-8 text-center mt-auto">
      <p className="text-xs sm:text-sm text-gray-400">
        &copy; {currentYear} {companyName}. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;