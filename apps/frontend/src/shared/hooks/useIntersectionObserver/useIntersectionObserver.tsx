import type { RefObject } from "react";
import { useEffect, useState, useRef } from "react";

export const useIntersectionObserver = (
  ref: RefObject<Element>,
  freeze?: boolean
) => {
  const [isOnScreen, setIsOnScreen] = useState(false);
  const observerRef = useRef<null | IntersectionObserver>(null);

  const cleanup = () => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    observerRef && observerRef.current && observerRef.current.disconnect();
  };

  useEffect(() => {
    const hasIOSupport = Boolean(window.IntersectionObserver);

    if (!hasIOSupport) return setIsOnScreen(true);

    observerRef.current = new IntersectionObserver(([entry]) => {
      setIsOnScreen(entry.isIntersecting);
      if (!freeze) return;
      // After observation, clear observer if freeze is true
      return cleanup();
    });
  }, [freeze]);

  useEffect(() => {
    ref.current &&
      observerRef.current &&
      observerRef.current.observe(ref.current);

    return () => cleanup();
  }, [ref]);

  return isOnScreen;
};
