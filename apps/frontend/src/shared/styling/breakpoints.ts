export const BREAKPOINTS = {
  xs: 0, // Mobile
  sm: 350, // Large Mobile - Only use this if you really have to
  md: 600, // Tablet
  lg: 1025, // Laptop
  xl: 1272, // Desktop - Only use this if you really have to
} as const;

export type Breakpoints = keyof typeof BREAKPOINTS;
