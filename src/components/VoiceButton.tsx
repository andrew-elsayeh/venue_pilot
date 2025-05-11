
import React from 'react';

interface VoiceButtonProps {
  isListening: boolean;
  onClick: () => void;
}

const VoiceButton: React.FC<VoiceButtonProps> = ({ isListening, onClick }) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-venuepilot to-blue-600 rounded-full animate-rotate-gradient" />
      
      <button 
        className={`relative z-10 m-2 w-32 h-32 rounded-full bg-white text-venuepilot hover:bg-gray-100 
                  flex items-center justify-center transition-all duration-300 shadow-lg
                  ${isListening ? 'scale-110 bg-venuepilot text-white' : ''}`}
        onClick={onClick}
      >
        <div className="flex flex-col items-center">
          {isListening ? (
            <>
              <span className="block w-6 h-6">
                <span className="animate-pulse flex h-full w-full items-center justify-center">
                  <span className="h-5 w-1 bg-white mx-0.5 rounded-full"></span>
                  <span className="h-3 w-1 bg-white mx-0.5 rounded-full"></span>
                  <span className="h-6 w-1 bg-white mx-0.5 rounded-full"></span>
                </span>
              </span>
              <span className="mt-1 font-medium">Listening...</span>
            </>
          ) : (
            <>
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" 
                />
              </svg>
              <span className="mt-1 font-medium">Start</span>
            </>
          )}
        </div>
      </button>
    </div>
  );
};

export default VoiceButton;
