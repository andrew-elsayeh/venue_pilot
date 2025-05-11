
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-12 h-12 relative">
        <div className="absolute inset-0 rounded-full border-4 border-venuepilot opacity-30"></div>
        <div className="absolute inset-2 rounded-full border-4 border-venuepilot opacity-60"></div>
        <div className="absolute inset-4 rounded-full bg-venuepilot opacity-90"></div>
      </div>
      <span className="text-2xl font-bold text-venuepilot">VENUEPILOT</span>
    </div>
  );
};

export default Logo;
