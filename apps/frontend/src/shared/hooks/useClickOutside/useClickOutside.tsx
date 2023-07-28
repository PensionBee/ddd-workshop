import { useEffect } from "react";

export const useClickOutside = <E extends HTMLElement>(
  ref: React.RefObject<E>,
  callback: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current) return;
      if (event.target && ref.current.contains(event.target as Node)) return;
      return callback(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};
