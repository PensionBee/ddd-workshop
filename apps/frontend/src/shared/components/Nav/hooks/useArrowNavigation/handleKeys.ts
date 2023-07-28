type HandleArrowKeyProps = {
  event: KeyboardEvent;
  currentIndex: number;
  elements: NodeListOf<HTMLElement>;
  onExitTop?: () => void;
  onExitBottom?: () => void;
  onExitLeft?: () => void;
  onExitRight?: () => void;
};

export const handleHorizontalKeys = ({
  event,
  currentIndex,
  elements,
  onExitRight,
  onExitLeft,
}: HandleArrowKeyProps) => {
  if (currentIndex === -1) elements[0].focus();

  const nextElement = (() => {
    switch (event.key) {
      case "ArrowRight":
        if (currentIndex === elements.length - 1) {
          return onExitRight?.();
        }
        return elements[currentIndex + 1];
      case "ArrowLeft":
        if (currentIndex === 0) {
          return onExitLeft?.();
        }
        return elements[currentIndex - 1];
      default:
        return;
    }
  })();

  nextElement && nextElement.focus();
  event.preventDefault();
};

export const handleVerticalKeys = ({
  event,
  currentIndex,
  elements,
  onExitTop,
  onExitBottom,
}: HandleArrowKeyProps) => {
  if (currentIndex === -1) elements[0].focus();

  const nextElement = (() => {
    switch (event.key) {
      case "ArrowDown":
        if (currentIndex === elements.length - 1) {
          return onExitBottom?.();
        }
        return elements[currentIndex + 1];
      case "ArrowUp":
        if (currentIndex === 0) {
          return onExitTop?.();
        }
        return elements[currentIndex - 1];
      default:
        return;
    }
  })();

  nextElement && nextElement.focus();
  event.preventDefault();
};
