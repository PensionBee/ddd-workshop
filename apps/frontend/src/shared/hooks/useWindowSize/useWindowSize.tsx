import { useState, useEffect } from "react";

type WindowDimensions = {
  windowWidth?: number;
  windowHeight?: number;
};

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowDimensions>({
    windowWidth: undefined,
    windowHeight: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      return setWindowSize({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      return window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize satisfies WindowDimensions;
};
