import React from 'react';
import { StatInfo } from '../types';

interface StatDisplayProps {
  stat: StatInfo;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
}

const StatDisplay: React.FC<StatDisplayProps> = ({ stat, className = '', valueClassName = '', labelClassName = '' }) => {
  return (
    <div className={`text-center ${className}`}>
      <p className={`font-bold ${valueClassName || 'text-2xl sm:text-3xl text-white'}`}>{stat.value}</p>
      <p className={`text-xs sm:text-sm ${labelClassName || 'text-gray-400'}`}>{stat.label}</p>
    </div>
  );
};

export default StatDisplay;