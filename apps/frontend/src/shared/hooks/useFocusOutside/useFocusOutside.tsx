import { useEffect } from "react";

export const useFocusOutside = <E extends HTMLElement>(
  ref: React.RefObject<E>,
  callback: (event: FocusEvent) => void
) => {
  useEffect(() => {
    const listener = (event: FocusEvent) => {
      if (!ref.current) return;
      if (event.target && ref.current.contains(event.target as Node)) return;
      return callback(event);
    };
    document.addEventListener("focusin", listener);
    return () => {
      document.removeEventListener("focusin", listener);
    };
  }, [ref, callback]);
};
