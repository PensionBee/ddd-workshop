import { useEffect, useState } from "react";

export const useWindowScroll = () => {
  const [scrollPosition, setScrollPosition] = useState(window.scrollY);
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return scrollPosition;
};
