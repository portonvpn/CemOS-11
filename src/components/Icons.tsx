import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const IconFiles: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 7C3 5.89543 3.89543 5 5 5H9.58579C9.851 5 10.1054 5.10536 10.2929 5.29289L12 7H19C20.1046 7 21 7.89543 21 9V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1"/>
    <path d="M3 7H21V9H3V7Z" fill="#FBBF24"/>
  </svg>
);

export const IconSettings: React.FC<IconProps> = ({ size = 24, color = '#64748B', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill={color}/>
    <path d="M19.4 15C19.1277 15.6171 19.2583 16.3378 19.73 16.82L19.79 16.88C20.1656 17.2551 20.3766 17.7642 20.3766 18.295C20.3766 18.8258 20.1656 19.3349 19.79 19.71C19.4149 20.0856 18.9058 20.2966 18.375 20.2966C17.8442 20.2966 17.3351 20.0856 16.96 19.71L16.9 19.65C16.4178 19.1783 15.6971 19.0477 15.08 19.32C14.4755 19.5791 14.0826 20.1724 14.08 20.83V21C14.08 22.1046 13.1846 23 12.08 23C10.9754 23 10.08 22.1046 10.08 21V20.91C10.0642 20.2327 9.63587 19.6339 9 19.4C8.38291 19.1277 7.66219 19.2583 7.18 19.73L7.12 19.79C6.74494 20.1656 6.23584 20.3766 5.705 20.3766C5.17416 20.3766 4.66506 20.1656 4.29 19.79C3.91445 19.4149 3.70343 18.9058 3.70343 18.375C3.70343 17.8442 3.91445 17.3351 4.29 16.96L4.35 16.9C4.82167 16.4178 4.95235 15.6971 4.68 15.08C4.42093 14.4755 3.82764 14.0826 3.17 14.08H3C1.89543 14.08 1 13.1846 1 12.08C1 10.9754 1.89543 10.08 3 10.08H3.09C3.76733 10.0642 4.36613 9.63587 4.6 9C4.87235 8.38291 4.74167 7.66219 4.27 7.18L4.21 7.12C3.83445 6.74494 3.62343 6.23584 3.62343 5.705C3.62343 5.17416 3.83445 4.66506 4.21 4.29C4.58506 3.91445 5.09416 3.70343 5.625 3.70343C6.15584 3.70343 6.66494 3.91445 7.04 4.29L7.1 4.35C7.58219 4.82167 8.30291 4.95235 8.92 4.68H9C9.60447 4.42093 9.99738 3.82764 10 3.17V3C10 1.89543 10.8954 1 12 1C13.1046 1 14 1.89543 14 3V3.09C14.0026 3.74764 14.3955 4.34093 15 4.6C15.6171 4.87235 16.3378 4.74167 16.82 4.27L16.88 4.21C17.2551 3.83445 17.7642 3.62343 18.295 3.62343C18.8258 3.62343 19.3349 3.83445 19.71 4.21C20.0856 4.58506 20.2966 5.09416 20.2966 5.625C20.2966 6.15584 20.0856 6.66494 19.71 7.04L19.65 7.1C19.1783 7.58219 19.0477 8.30291 19.32 8.92V9C19.5791 9.60447 20.1724 9.99738 20.83 10H21C22.1046 10 23 10.8954 23 12C23 13.1046 22.1046 14 21 14H20.91C20.2524 14.0026 19.6591 14.3955 19.4 15Z" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const IconBrowser: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" fill="#3B82F6"/>
    <ellipse cx="12" cy="12" rx="4" ry="10" stroke="white" strokeWidth="1.5" fill="none"/>
    <line x1="2" y1="12" x2="22" y2="12" stroke="white" strokeWidth="1.5"/>
    <path d="M4 7H20" stroke="white" strokeWidth="1" opacity="0.7"/>
    <path d="M4 17H20" stroke="white" strokeWidth="1" opacity="0.7"/>
  </svg>
);

export const IconMusic: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="11" fill="#1DB954"/>
    <path d="M8 11.5C6.5 12.5 6.5 14.5 8 15.5C9.5 16.5 11 15.5 11 14V7C11 6 13 5.5 15 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="8" cy="15" r="2" fill="white"/>
  </svg>
);

export const IconVideo: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="4" width="20" height="16" rx="3" fill="#FF0000"/>
    <path d="M10 8.5V15.5L16 12L10 8.5Z" fill="white"/>
  </svg>
);

export const IconGames: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="6" width="20" height="12" rx="4" fill="#8B5CF6"/>
    <circle cx="7" cy="12" r="2" fill="white"/>
    <circle cx="17" cy="10" r="1.5" fill="white"/>
    <circle cx="17" cy="14" r="1.5" fill="white"/>
    <rect x="11" y="10" width="2" height="4" rx="1" fill="white"/>
  </svg>
);

export const IconPhotos: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="3" fill="#EC4899"/>
    <circle cx="8.5" cy="8.5" r="2" fill="#FDE68A"/>
    <path d="M3 15L8 10L12 14L16 9L21 14V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V15Z" fill="#34D399"/>
  </svg>
);

export const IconTerminal: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="3" width="20" height="18" rx="2" fill="#1E293B"/>
    <path d="M6 8L10 12L6 16" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="12" y1="16" x2="18" y2="16" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const IconCalculator: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="4" y="2" width="16" height="20" rx="2" fill="#64748B"/>
    <rect x="6" y="4" width="12" height="4" rx="1" fill="#0EA5E9"/>
    <rect x="6" y="10" width="3" height="3" rx="0.5" fill="white"/>
    <rect x="10.5" y="10" width="3" height="3" rx="0.5" fill="white"/>
    <rect x="15" y="10" width="3" height="3" rx="0.5" fill="#F97316"/>
    <rect x="6" y="14.5" width="3" height="3" rx="0.5" fill="white"/>
    <rect x="10.5" y="14.5" width="3" height="3" rx="0.5" fill="white"/>
    <rect x="15" y="14.5" width="3" height="3" rx="0.5" fill="#F97316"/>
  </svg>
);

export const IconNotes: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="4" y="2" width="16" height="20" rx="2" fill="#EAB308"/>
    <line x1="7" y1="7" x2="17" y2="7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="7" y1="11" x2="17" y2="11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="7" y1="15" x2="13" y2="15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const IconWeather: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="10" cy="8" r="4" fill="#FBBF24"/>
    <path d="M6 14C4.34315 14 3 15.3431 3 17C3 18.6569 4.34315 20 6 20H17C19.2091 20 21 18.2091 21 16C21 13.7909 19.2091 12 17 12C16.2316 12 15.5308 12.2889 15 12.7639C14.1115 11.0927 12.3956 10 10.5 10C7.95163 10 5.86656 11.8044 6 14Z" fill="white"/>
  </svg>
);

export const IconClock: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" fill="#8B5CF6"/>
    <circle cx="12" cy="12" r="8" fill="white"/>
    <line x1="12" y1="12" x2="12" y2="7" stroke="#1E293B" strokeWidth="2" strokeLinecap="round"/>
    <line x1="12" y1="12" x2="16" y2="14" stroke="#1E293B" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="1" fill="#1E293B"/>
  </svg>
);

export const IconMovie: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2" fill="#E50914"/>
    <rect x="4" y="6" width="3" height="3" fill="white" opacity="0.3"/>
    <rect x="17" y="6" width="3" height="3" fill="white" opacity="0.3"/>
    <rect x="4" y="15" width="3" height="3" fill="white" opacity="0.3"/>
    <rect x="17" y="15" width="3" height="3" fill="white" opacity="0.3"/>
    <path d="M10 9V15L15 12L10 9Z" fill="white"/>
  </svg>
);

export const IconAI: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="4" fill="#06B6D4"/>
    <circle cx="9" cy="10" r="2" fill="white"/>
    <circle cx="15" cy="10" r="2" fill="white"/>
    <path d="M8 15C8 15 9.5 17 12 17C14.5 17 16 15 16 15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="9" cy="10" r="0.5" fill="#06B6D4"/>
    <circle cx="15" cy="10" r="0.5" fill="#06B6D4"/>
  </svg>
);

export const IconGrid: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" fill="#10B981"/>
    <line x1="3" y1="9" x2="21" y2="9" stroke="white" strokeWidth="1"/>
    <line x1="3" y1="15" x2="21" y2="15" stroke="white" strokeWidth="1"/>
    <line x1="9" y1="3" x2="9" y2="21" stroke="white" strokeWidth="1"/>
    <line x1="15" y1="3" x2="15" y2="21" stroke="white" strokeWidth="1"/>
  </svg>
);

export const IconShooter: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" fill="#EF4444"/>
    <circle cx="12" cy="12" r="6" stroke="white" strokeWidth="1.5" fill="none"/>
    <circle cx="12" cy="12" r="2" fill="white"/>
    <line x1="12" y1="2" x2="12" y2="6" stroke="white" strokeWidth="1.5"/>
    <line x1="12" y1="18" x2="12" y2="22" stroke="white" strokeWidth="1.5"/>
    <line x1="2" y1="12" x2="6" y2="12" stroke="white" strokeWidth="1.5"/>
    <line x1="18" y1="12" x2="22" y2="12" stroke="white" strokeWidth="1.5"/>
  </svg>
);

export const IconWave: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#1E40AF"/>
    <path d="M4 14C6 10 8 16 10 12C12 8 14 18 16 12C18 6 20 14 22 10" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M4 16C6 12 8 18 10 14C12 10 14 20 16 14C18 8 20 16 22 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5"/>
  </svg>
);

export const IconPhone: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="5" y="2" width="14" height="20" rx="3" fill="#6366F1"/>
    <rect x="7" y="4" width="10" height="14" rx="1" fill="#E0E7FF"/>
    <circle cx="12" cy="20" r="1" fill="white"/>
  </svg>
);

export const IconPackage: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" fill="#14B8A6"/>
    <path d="M12 2L21 7L12 12L3 7L12 2Z" fill="#5EEAD4"/>
    <line x1="12" y1="12" x2="12" y2="22" stroke="white" strokeWidth="1"/>
    <line x1="12" y1="12" x2="21" y2="7" stroke="white" strokeWidth="1" opacity="0.5"/>
  </svg>
);

export const IconStar: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L14.9 8.6L22 9.3L17 14.1L18.2 21L12 17.5L5.8 21L7 14.1L2 9.3L9.1 8.6L12 2Z" fill="#A855F7"/>
  </svg>
);

export const IconExplosion: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" fill="#F97316"/>
    <path d="M12 4L13.5 9L18 7L15 11L20 12L15 13L18 17L13.5 15L12 20L10.5 15L6 17L9 13L4 12L9 11L6 7L10.5 9L12 4Z" fill="#FDE68A"/>
  </svg>
);

// App icon mapping
export const getAppIcon = (appId: string, size = 24): React.ReactNode => {
  const icons: Record<string, React.ReactNode> = {
    explorer: <IconFiles size={size} />,
    settings: <IconSettings size={size} />,
    browser: <IconBrowser size={size} />,
    music: <IconMusic size={size} />,
    video: <IconVideo size={size} />,
    games: <IconGames size={size} />,
    photos: <IconPhotos size={size} />,
    terminal: <IconTerminal size={size} />,
    calculator: <IconCalculator size={size} />,
    notes: <IconNotes size={size} />,
    weather: <IconWeather size={size} />,
    clock: <IconClock size={size} />,
    zorflix: <IconMovie size={size} />,
    glacier: <IconAI size={size} />,
    cemgrid: <IconGrid size={size} />,
    aetheria: <IconStar size={size} />,
    diddyshot2: <IconShooter size={size} />,
    cemabyss: <IconWave size={size} />,
    diddyshot: <IconExplosion size={size} />,
    zoripas: <IconPhone size={size} />,
    zorapks: <IconPackage size={size} />,
  };
  return icons[appId] || <IconFiles size={size} />;
};
