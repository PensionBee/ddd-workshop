import { mediaQueriesByBreakpoint } from "@shared/styling/mediaQueries";
import { useEffect, useState } from "react";

const getMatches = (query: string) => {
  // Prevents SSR issues
  if (typeof window !== "undefined") {
    return window.matchMedia(query).matches;
  }
  return false;
};

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(getMatches(query));

  useEffect(() => {
    const handleChange = () => setMatches(getMatches(query));
    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    matchMedia.addEventListener("change", handleChange);

    return () => matchMedia.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
};

export const useMediaQuerySm = () => {
  return useMediaQuery(mediaQueriesByBreakpoint.sm);
};
export const useMediaQueryMd = () => {
  return useMediaQuery(mediaQueriesByBreakpoint.md);
};
export const useMediaQueryLg = () => {
  return useMediaQuery(mediaQueriesByBreakpoint.lg);
};
export const useMediaQueryXl = () => {
  return useMediaQuery(mediaQueriesByBreakpoint.xl);
};
