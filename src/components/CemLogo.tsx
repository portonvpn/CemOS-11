import React from 'react';

interface Props {
  size?: number;
  color?: string;
  className?: string;
}

export const CemLogo: React.FC<Props> = ({ size = 24, color = 'currentColor', className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Hexagonal outer ring */}
    <path
      d="M50 5L90 27.5V72.5L50 95L10 72.5V27.5L50 5Z"
      stroke={color}
      strokeWidth="3"
      fill="none"
      opacity="0.6"
    />
    {/* Inner diamond */}
    <path
      d="M50 18L78 40V65L50 82L22 65V40L50 18Z"
      fill={color}
      opacity="0.15"
    />
    {/* C letter stylized */}
    <path
      d="M58 35C53 30 42 29 36 35C30 41 30 59 36 65C42 71 53 70 58 65"
      stroke={color}
      strokeWidth="4.5"
      strokeLinecap="round"
      fill="none"
    />
    {/* Tech accent lines */}
    <line x1="62" y1="42" x2="70" y2="42" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
    <line x1="62" y1="50" x2="74" y2="50" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
    <line x1="62" y1="58" x2="68" y2="58" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
  </svg>
);
