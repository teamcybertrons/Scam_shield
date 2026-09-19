import React from 'react';

interface Card3DTiltProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  maxTilt?: number;
  perspective?: number;
  glare?: boolean;
  scale?: number;
}

export const Card3DTilt: React.FC<Card3DTiltProps> = ({
  children,
  className = '',
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative transition-all duration-200 ${className}`}
    >
      {children}
    </div>
  );
};
