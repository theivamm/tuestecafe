import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

/* ---------------------------------------------------------------- Brand -- */

export function LogoMark(props: IconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden {...props}>
      <defs>
        <linearGradient id="tm-a" x1="6" y1="4" x2="34" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e9dcc6" />
          <stop offset="0.55" stopColor="#b98a4e" />
          <stop offset="1" stopColor="#885e2e" />
        </linearGradient>
      </defs>
      <path
        d="M20 3.6c8.1 0 13.6 6.7 13.6 16.4S28.1 36.4 20 36.4 6.4 29.7 6.4 20 11.9 3.6 20 3.6Z"
        stroke="url(#tm-a)"
        strokeWidth="1.6"
      />
      <path
        d="M20 4.2c-3.6 5.2-3.6 26.4 0 31.6"
        stroke="url(#tm-a)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M20 12.4c2.6-1.9 5.4-1.6 6.6.6 1.2 2.3-.3 5-3 5.9"
        stroke="url(#tm-a)"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M19.9 21.2c-2.6 1.9-5.4 1.6-6.6-.6-1.2-2.3.3-5 3-5.9"
        stroke="url(#tm-a)"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}

export function LogoWordmark(props: IconProps) {
  return (
    <svg viewBox="0 0 188 34" fill="none" aria-hidden {...props}>
      <path
        d="M2 24.4 10.4 9.6l8.4 14.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5.9 20.2h9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <text
        x="27"
        y="25"
        fill="currentColor"
        fontFamily="var(--font-display), Georgia, serif"
        fontSize="24"
        letterSpacing="0.5"
      >
        ueste
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------- Interface -- */

export const IconSearch = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="6.4" />
    <path d="m20 20-4.6-4.6" />
  </svg>
);

export const IconGrid = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.6" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.6" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.6" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.6" />
  </svg>
);

export const IconRows = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3.5" y="4.5" width="17" height="5.4" rx="1.6" />
    <rect x="3.5" y="14.1" width="17" height="5.4" rx="1.6" />
  </svg>
);

export const IconClose = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const IconPlus = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconMinus = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14" />
  </svg>
);

export const IconChevron = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m6 9.5 6 5.5 6-5.5" />
  </svg>
);

export const IconArrowRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 12h15.5M13.5 6l6 6-6 6" />
  </svg>
);

export const IconCheck = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m4.5 12.5 4.8 4.8L19.5 7" />
  </svg>
);

export const IconSliders = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 7.5h16M4 16.5h16" />
    <circle cx="9" cy="7.5" r="2.3" />
    <circle cx="15.5" cy="16.5" r="2.3" />
  </svg>
);

export const IconBag = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5.4 8.2h13.2l-1 11.2a1.6 1.6 0 0 1-1.6 1.4H8a1.6 1.6 0 0 1-1.6-1.4l-1-11.2Z" />
    <path d="M9 8.2V6.8a3 3 0 0 1 6 0v1.4" />
  </svg>
);

/* ----------------------------------------------------------------- Tags -- */

export const IconWheatOff = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 20.5V7.2" />
    <path d="M12 10.4c0-2 1.7-3.6 3.6-3.6 0 2-1.6 3.6-3.6 3.6ZM12 10.4c0-2-1.7-3.6-3.6-3.6 0 2 1.6 3.6 3.6 3.6Z" />
    <path d="M12 14.6c0-2 1.7-3.6 3.6-3.6 0 2-1.6 3.6-3.6 3.6ZM12 14.6c0-2-1.7-3.6-3.6-3.6 0 2 1.6 3.6 3.6 3.6Z" />
    <path d="M4 4.5 20 19.5" />
  </svg>
);

export const IconLeaf = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 4.2c0 8.3-4.4 12.6-9.4 12.6a5.4 5.4 0 0 1-3.9-1.6C4.2 12.8 4 8 4 4.2c4 0 8.6.6 11.8 3.1C18.9 9.3 20 12.2 20 4.2Z" />
    <path d="M4.6 19.9c2.4-4.2 5.6-6.9 10-8.8" />
  </svg>
);

export const IconDropletOff = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3.2s6 6.3 6 10.1a6 6 0 0 1-3.4 5.4" />
    <path d="M8.7 6.5C7.2 8.2 6 10.6 6 13.3a6 6 0 0 0 6 6c1 0 2-.3 2.8-.7" />
    <path d="M4 4 20 20" />
  </svg>
);

export const IconGlass = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M7 3.5h10l-.5 5.2a4.5 4.5 0 0 1-9 0L7 3.5Z" />
    <path d="M12 13.2v6.1" />
    <path d="M8.6 20.5h6.8" />
  </svg>
);

export const IconSpark = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3.2 13.7 9l5.8 1.7-5.8 1.7L12 18.2 10.3 12.4 4.5 10.7 10.3 9 12 3.2Z" />
    <path d="M18.4 15.6 19.2 18l2.4.8-2.4.8-.8 2.4-.8-2.4-2.4-.8 2.4-.8.8-2.4Z" />
  </svg>
);

/* ------------------------------------------------------------- Contacto -- */

export const IconPin = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 21.2s6.8-5.6 6.8-10.4a6.8 6.8 0 1 0-13.6 0C5.2 15.6 12 21.2 12 21.2Z" />
    <circle cx="12" cy="10.6" r="2.5" />
  </svg>
);

export const IconClock = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.2V12l3.2 2" />
  </svg>
);

export const IconInstagram = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3.6" y="3.6" width="16.8" height="16.8" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17.1 6.9h.01" strokeWidth="2" />
  </svg>
);

export const IconWhatsApp = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20.2 11.7a8.2 8.2 0 0 1-12 7.3L3.8 20.2l1.2-4.3a8.2 8.2 0 1 1 15.2-4.2Z" />
    <path d="M9.1 8.6c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .5.4l.7 1.7c.1.3 0 .5-.1.7l-.5.6c-.1.2-.2.3 0 .6.4.7.9 1.2 1.6 1.6.3.2.5.2.7 0l.6-.6c.2-.2.4-.2.7-.1l1.6.8c.3.1.4.3.4.5 0 .5-.2 1.5-1.1 1.9-.8.3-1.7.4-4.6-1.4-2.4-1.5-3.4-3.6-3.5-4.3-.1-.6 0-1.3.4-1.5Z" />
  </svg>
);

export const IconMap = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m3.6 6.6 5.4-2.4 6 2.4 5.4-2.4v13.2l-5.4 2.4-6-2.4-5.4 2.4V6.6Z" />
    <path d="M9 4.2v13.2M15 6.6v13.2" />
  </svg>
);

export const IconRoute = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="6" cy="6" r="2.6" />
    <path d="M6 8.6v3.9a3.5 3.5 0 0 0 3.5 3.5h5a3.5 3.5 0 0 1 3.5 3.5" />
    <circle cx="18" cy="20" r="2.2" />
  </svg>
);

export const IconTruck = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M2.8 6.8h9.4v9.6H2.8V6.8Z" />
    <path d="M12.2 10.2h3.9l2.7 2.9v3.3h-6.6" />
    <circle cx="6.6" cy="17.6" r="1.9" />
    <circle cx="16.4" cy="17.6" r="1.9" />
  </svg>
);

export const IconPaw = (p: IconProps) => (
  <svg {...base(p)}>
    <ellipse cx="7.2" cy="8.4" rx="1.9" ry="2.4" />
    <ellipse cx="12" cy="6.6" rx="1.9" ry="2.5" />
    <ellipse cx="16.8" cy="8.4" rx="1.9" ry="2.4" />
    <path d="M12 11.4c3 0 5.2 2 5.2 4.2 0 1.9-1.5 3-3.3 3-1 0-1.4-.3-1.9-.3s-.9.3-1.9.3c-1.8 0-3.3-1.1-3.3-3 0-2.2 2.2-4.2 5.2-4.2Z" />
  </svg>
);

export const IconCup = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4.4 6.6h12.2v6.9a5.4 5.4 0 0 1-5.4 5.4h-1.4a5.4 5.4 0 0 1-5.4-5.4V6.6Z" />
    <path d="M16.6 8.8h1.9a2.6 2.6 0 0 1 0 5.2h-1.9" />
    <path d="M8.2 3.2v1.2M11.6 2.6v1.8" />
  </svg>
);
