import { useEffect, useState } from "react";

type useDropdownMenuMotionProps = {
  defaultOpen?: boolean;
  delay?: number;
};

export const useDropdownMenuMotion = (props?: useDropdownMenuMotionProps) => {
  const { defaultOpen = false, delay = 200 } = props || {};
  const [isOpen, setIsOpen] = useState(defaultOpen || false);
  const [isVisible, setIsVisible] = useState(false);
  const [motion, setMotion] = useState<"from-end" | "to-end" | null>(null);

  const toggleOpen = () => setIsOpen((state) => !state);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setMotion("from-end");
    } else {
      if (isVisible) {
        setMotion("to-end");
        const timeout = setTimeout(() => setIsVisible(false), delay); // Wait for animation to finish
        return () => clearTimeout(timeout);
      }
    }
  }, [isVisible, isOpen, delay]);

  return { isVisible, motion, toggleOpen, setIsOpen };
};
