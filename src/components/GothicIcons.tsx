import React from 'react';

// Ornate Gothic Cathedral Crucifix with barbed floriated ends and halos
export const GothicCross: React.FC<{ className?: string; size?: number }> = ({
  className = 'w-6 h-6 text-zinc-400',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 120"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Central Gothic Cross */}
    <path
      d="M47 8 L53 8 L53 38 L82 38 L82 44 L53 44 L53 95 L62 104 L62 108 L38 108 L38 104 L47 95 L47 44 L18 44 L18 38 L47 38 Z"
    />
    {/* Floriated / Trefoil Tips Top */}
    <circle cx="50" cy="5" r="3.5" />
    <circle cx="45" cy="8" r="2.5" />
    <circle cx="55" cy="8" r="2.5" />
    {/* Left Trefoil */}
    <circle cx="14" cy="41" r="3.5" />
    <circle cx="17" cy="36" r="2.5" />
    <circle cx="17" cy="46" r="2.5" />
    {/* Right Trefoil */}
    <circle cx="86" cy="41" r="3.5" />
    <circle cx="83" cy="36" r="2.5" />
    <circle cx="83" cy="46" r="2.5" />
    {/* Halo ring intersecting cross */}
    <circle
      cx="50"
      cy="41"
      r="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeDasharray="2 2"
      opacity="0.85"
    />
    {/* Central gemstone / diamond */}
    <polygon points="50,37 54,41 50,45 46,41" fill="#9f1239" opacity="0.9" />
  </svg>
);

// Slender Gothic Iron Cross / Stiletto
export const GothicStilettoCross: React.FC<{ className?: string }> = ({
  className = 'w-4 h-4 text-zinc-500',
}) => (
  <svg
    viewBox="0 0 40 50"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19 2 H21 V16 H35 V18 H21 V44 L20 48 L19 44 V18 H5 V16 H19 Z" />
    <circle cx="20" cy="17" r="1.8" fill="#f43f5e" />
  </svg>
);

// Gothic Cathedral Window Tracery / Arch
export const GothicArchTracery: React.FC<{ className?: string }> = ({
  className = 'w-full h-8 text-zinc-700/60',
}) => (
  <svg
    viewBox="0 0 200 40"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10 38 C 40 10, 70 5, 100 2 C 130 5, 160 10, 190 38" />
    <path d="M40 38 C 65 18, 85 12, 100 10 C 115 12, 135 18, 160 38" />
    <circle cx="100" cy="18" r="6" />
    <circle cx="82" cy="26" r="4" />
    <circle cx="118" cy="26" r="4" />
    <path d="M100 2 V 38" strokeDasharray="1 2" opacity="0.5" />
  </svg>
);

// Gothic Corner Flourish / Filigree
export const GothicFiligreeCorner: React.FC<{
  position: 'tl' | 'tr' | 'bl' | 'br';
  className?: string;
}> = ({ position, className = 'w-6 h-6 text-zinc-600' }) => {
  const transforms = {
    tl: '',
    tr: 'scale-x-[-1]',
    bl: 'scale-y-[-1]',
    br: 'scale-x-[-1] scale-y-[-1]',
  };

  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      className={`${className} ${transforms[position]}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 2 H14 C10 6 6 10 2 14 V2 Z" opacity="0.3" />
      <path
        d="M2 2 V24 C4 18 10 12 18 10 C24 8 28 4 30 2 H16 C12 6 8 10 2 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="6" cy="6" r="1.5" />
      <path d="M12 2 L2 12" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
};

// Ornate Divider with Gothic Cross and Thorns
export const GothicDivider: React.FC<{
  text?: string;
  className?: string;
}> = ({ text, className = 'my-6' }) => (
  <div className={`flex items-center justify-center gap-3 w-full ${className}`}>
    <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-zinc-600" />
    <div className="flex items-center gap-2 text-zinc-500 font-cinzel text-xs tracking-[0.3em]">
      <span className="text-[10px] text-zinc-600">⫘⫘</span>
      <GothicStilettoCross className="w-4 h-4 text-rose-500/80 animate-pulse" />
      {text && <span className="text-zinc-400 font-gothic tracking-widest">{text}</span>}
      <GothicStilettoCross className="w-4 h-4 text-rose-500/80 animate-pulse" />
      <span className="text-[10px] text-zinc-600">⫘⫘</span>
    </div>
    <span className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-zinc-800 to-zinc-600" />
  </div>
);

// Raven Gothic Feather Icon
export const GothicFeatherSVG: React.FC<{ className?: string }> = ({
  className = 'w-4 h-4 text-zinc-400',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" opacity="0.3" />
    <path
      d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5zM16 8L2 22M17.5 15H9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
