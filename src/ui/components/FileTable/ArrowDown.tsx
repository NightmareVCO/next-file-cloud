import type { IconSvgProperties } from "./Types";

export const ArrowDownIcon = (properties: IconSvgProperties) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 12 12"
    width="1em"
    {...properties}
  >
    <path
      d="M3 4.5L6 7.5L9 4.5"
      stroke="#71717A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);