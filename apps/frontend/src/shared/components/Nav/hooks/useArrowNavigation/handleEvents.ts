import { handleHorizontalKeys, handleVerticalKeys } from "./handleKeys";

export type HandleEventsProps = {
  event: KeyboardEvent;
  parentNode: HTMLElement;
  selectors?: string;
  direction?: "horizontal" | "vertical";
  onExitTop?: () => void;
  onExitBottom?: () => void;
  onExitLeft?: () => void;
  onExitRight?: () => void;
};

export const handleEvents = ({
  event,
  parentNode,
  selectors = "a,button,input",
  direction = "vertical",
  onExitTop,
  onExitBottom,
  onExitLeft,
  onExitRight,
}: HandleEventsProps) => {
  const { key } = event;
  if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key))
    return;

  const activeElement = document.activeElement as HTMLElement;
  if (!parentNode.contains(activeElement)) return;

  const elements = parentNode.querySelectorAll(
    selectors
  ) satisfies NodeListOf<HTMLElement>;
  if (!elements.length) return;

  const currentIndex = Array.from(elements).findIndex(
    (element) => element === activeElement
  );

  if (direction === "horizontal") {
    return handleHorizontalKeys({
      event,
      currentIndex,
      elements,
      onExitTop,
      onExitBottom,
      onExitLeft,
      onExitRight,
    });
  } else {
    return handleVerticalKeys({
      event,
      currentIndex,
      elements,
      onExitTop,
      onExitBottom,
      onExitLeft,
      onExitRight,
    });
  }
};
