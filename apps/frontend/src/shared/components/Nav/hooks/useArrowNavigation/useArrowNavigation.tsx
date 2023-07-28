import { useEffect, useCallback } from "react";
import type { HandleEventsProps } from "./handleEvents";
import { handleEvents } from "./handleEvents";

type UseArrowNavigationOptions = {
  direction?: HandleEventsProps["direction"];
  disabled?: boolean;
  selectors?: HandleEventsProps["selectors"];
  onExitTop?: HandleEventsProps["onExitTop"];
  onExitBottom?: HandleEventsProps["onExitBottom"];
  onExitLeft?: HandleEventsProps["onExitLeft"];
  onExitRight?: HandleEventsProps["onExitRight"];
};

export const useArrowNavigation = (
  parentNode: React.MutableRefObject<HTMLElement | null>,
  options: UseArrowNavigationOptions
) => {
  const {
    disabled,
    direction,
    selectors,
    onExitTop,
    onExitBottom,
    onExitLeft,
    onExitRight,
  } = options;

  const handleEvent = useCallback(
    (event: KeyboardEvent) => {
      if (!parentNode.current) return;
      handleEvents({
        event,
        parentNode: parentNode.current,
        direction,
        selectors,
        onExitTop,
        onExitBottom,
        onExitLeft,
        onExitRight,
      });
    },
    [
      selectors,
      direction,
      onExitTop,
      onExitBottom,
      onExitLeft,
      onExitRight,
      parentNode,
    ]
  );

  useEffect(() => {
    if (disabled) return;
    document.addEventListener("keydown", handleEvent);
    return () => document.removeEventListener("keydown", handleEvent);
  }, [handleEvent, disabled]);
};
