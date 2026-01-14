import React from 'react';

interface KickHRLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const KickHRLogo: React.FC<KickHRLogoProps> = ({ 
  className = '', 
  size = 'md',
  showText = true 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const textSizeClasses = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo Icon - HR-focused brain with people network */}
      <div className={`${sizeClasses[size]} relative`}>
        <svg 
          viewBox="0 0 48 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Outer circle - head silhouette inspired */}
          <circle 
            cx="24" 
            cy="24" 
            r="22" 
            stroke="hsl(195, 100%, 45%)" 
            strokeWidth="2.5"
            fill="none"
          />
          
          {/* Central K letter stylized */}
          <path
            d="M16 12V36M16 24L28 12M16 24L28 36"
            stroke="hsl(195, 100%, 45%)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* HR network nodes */}
          <circle cx="32" cy="16" r="3" fill="hsl(195, 100%, 45%)" />
          <circle cx="32" cy="32" r="3" fill="hsl(195, 100%, 45%)" />
          <circle cx="38" cy="24" r="2.5" fill="hsl(195, 100%, 55%)" />
          
          {/* Connection lines for network effect */}
          <path
            d="M32 16L38 24M32 32L38 24"
            stroke="hsl(195, 100%, 50%)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      
      {showText && (
        <div className={`font-display font-bold ${textSizeClasses[size]}`}>
          <span className="text-primary">Kick</span>
          <span className="text-foreground">HR</span>
        </div>
      )}
    </div>
  );
};

export default KickHRLogo;
