import React from 'react';
import { FeatureInfo } from '../types';

const FeatureItem: React.FC<FeatureInfo> = ({ letter, title, description, colorClass, letterColorClass = 'text-white' }) => {
  return (
    <div className="flex items-start space-x-3 sm:space-x-4">
      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${colorClass} flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1`}>
        <span className={`font-bold text-xs sm:text-sm ${letterColorClass}`}>{letter}</span>
      </div>
      <div>
        <h4 className="font-semibold text-base text-white">{title}</h4>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default FeatureItem;