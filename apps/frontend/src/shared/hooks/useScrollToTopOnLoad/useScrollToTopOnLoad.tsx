import { useEffect } from "react";

export const useScrollToTopOnLoad = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
};
