import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10', 
    lg: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const iconSizes = {
    sm: { width: 32, height: 32 },
    md: { width: 40, height: 40 },
    lg: { width: 48, height: 48 }
  };

  const currentSize = iconSizes[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo Container with location pin and teardrop */}
      <div className={`${sizeClasses[size]} relative flex items-center justify-center rounded-xl shadow-lg overflow-hidden`}>
        <svg 
          width={currentSize.width} 
          height={currentSize.height} 
          viewBox="0 0 48 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm"
        >
          {/* Background gradient circle */}
          <defs>
            <radialGradient id="bgGradient" cx="0.5" cy="0.3" r="0.8">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#7c3aed" />
            </radialGradient>
            <linearGradient id="pinGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
          </defs>
          
          {/* Background circle */}
          <circle cx="24" cy="24" r="22" fill="url(#bgGradient)" stroke="#ffffff" strokeWidth="2" />
          
          {/* Location pin base */}
          <path 
            d="M24 8C18.477 8 14 12.477 14 18C14 25 24 38 24 38S34 25 34 18C34 12.477 29.523 8 24 8Z" 
            fill="url(#pinGradient)" 
            stroke="#64748b" 
            strokeWidth="1"
          />
          
          {/* Red teardrop in center of pin */}
          <path 
            d="M24 14C24 14 28 16.5 28 19.5C28 21.433 26.433 23 24 23C21.567 23 20 21.433 20 19.5C20 16.5 24 14 24 14Z" 
            fill="#ef4444"
          />
          
          {/* Inner teardrop detail */}
          <path 
            d="M24 15.5C24 15.5 26.5 17.2 26.5 19.2C26.5 20.3 25.6 21.2 24.5 21.2C23.4 21.2 22.5 20.3 22.5 19.2C22.5 17.2 24 15.5 24 15.5Z" 
            fill="#dc2626"
          />
          
          {/* Teardrop highlight */}
          <ellipse 
            cx="23.2" 
            cy="18" 
            rx="0.8" 
            ry="1.2" 
            fill="#f87171" 
            opacity="0.7"
          />
          
          {/* Location pin shine */}
          <ellipse 
            cx="21" 
            cy="15" 
            rx="2" 
            ry="3" 
            fill="#ffffff" 
            opacity="0.3"
          />
        </svg>
      </div>
      
      {/* Text beside logo */}
      {showText && (
        <div>
          <h1 className={`${textSizeClasses[size]} font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-purple-700 bg-clip-text text-transparent`}>
            ReUse+
          </h1>
        </div>
      )}
    </div>
  );
}