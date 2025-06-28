import React from 'react';

interface CircularProgressProps {
  progress: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  isActive?: boolean;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ 
  progress, 
  size = 200, 
  strokeWidth = 8,
  isActive = false 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative">
      <svg
        width={size}
        height={size}
        className={`transform -rotate-90 ${isActive ? 'drop-shadow-lg' : ''}`}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={isActive ? "#24880C" : "#6B7280"}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className={`transition-all duration-300 ${isActive ? 'drop-shadow-sm' : ''}`}
        />
      </svg>
      
      {/* Breathing animation overlay */}
      {isActive && (
        <div 
          className="absolute inset-0 rounded-full bg-[#24880C]/10 animate-pulse"
          style={{
            animation: 'breathe 4s ease-in-out infinite'
          }}
        />
      )}
      
      <style jsx>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.05); opacity: 0.1; }
        }
      `}</style>
    </div>
  );
};

export default CircularProgress;