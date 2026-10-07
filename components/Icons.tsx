type P = { size?: number; className?: string };

const base = (size = 18) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const ArrowRight = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const ArrowLeft = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);
export const ArrowUpRight = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);
export const ChevronDown = ({ size = 14, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);
export const ChevronUp = ({ size = 14, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="m6 15 6-6 6 6" />
  </svg>
);
export const ChevronLeft = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="m15 6-6 6 6 6" />
  </svg>
);
export const ChevronRight = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);
export const Mic = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
  </svg>
);
export const Close = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const SearchIcon = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.2-4.2" />
  </svg>
);
export const Plus = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const Minus = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M5 12h14" />
  </svg>
);
export const Copy = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="8" y="8" width="12" height="12" rx="1.5" />
    <path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8" />
  </svg>
);
export const Download = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
  </svg>
);
export const Menu = ({ size = 20, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </svg>
);
export const PanelRight = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="3.5" y="4.5" width="17" height="15" rx="1.5" />
    <path d="M15 4.5v15" />
  </svg>
);
export const SignOut = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M10 5H6.5A1.5 1.5 0 0 0 5 6.5v11A1.5 1.5 0 0 0 6.5 19H10M14 8l4 4-4 4M18 12H9" />
  </svg>
);
export const Check = ({ size = 14, className }: P) => (
  <svg {...base(size)} className={className} strokeWidth={2}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);
