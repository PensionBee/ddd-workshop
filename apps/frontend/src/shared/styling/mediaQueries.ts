import { BREAKPOINTS } from "./breakpoints";

export const mediaQueriesByBreakpoint = {
  sm: `(min-width: ${BREAKPOINTS.sm}px)`,
  md: `(min-width: ${BREAKPOINTS.md}px)`,
  lg: `(min-width: ${BREAKPOINTS.lg}px)`,
  xl: `(min-width: ${BREAKPOINTS.xl}px)`,
};

// To use in CSS-in-JS:
export const mediaFrom = {
  sm: `@media ${mediaQueriesByBreakpoint.sm}`,
  md: `@media ${mediaQueriesByBreakpoint.md}`,
  lg: `@media ${mediaQueriesByBreakpoint.lg}`,
  xl: `@media ${mediaQueriesByBreakpoint.xl}`,
};
