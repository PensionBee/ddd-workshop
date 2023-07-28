import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

export type PortalProps = {
  children: React.ReactNode;
  wrapperId?: string;
};

export const Portal: React.FC<PortalProps> = ({
  children,
  wrapperId = "portal-root",
}) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null
  );

  useLayoutEffect(() => {
    const wrapperElement = document.getElementById(wrapperId);
    if (wrapperElement) {
      setWrapperElement(wrapperElement);
    } else {
      const createdWrapperElement = createWrapperAndAppendToBody(wrapperId);
      setWrapperElement(createdWrapperElement);

      return () => {
        createdWrapperElement.parentNode &&
          createdWrapperElement.parentNode.removeChild(createdWrapperElement);
      };
    }
  }, [wrapperId]);

  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
};

const createWrapperAndAppendToBody = (wrapperId: string) => {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
};
