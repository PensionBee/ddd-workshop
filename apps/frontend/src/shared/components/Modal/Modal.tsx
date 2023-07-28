/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Box, type BoxProps } from "../Box/Box";
import { Portal } from "../Portal/Portal";
import { useClickOutside } from "@shared/hooks/useClickOutside/useClickOutside";
import { useToggleLockedBody } from "@shared/hooks/useToggleLockedBody/useToggleLockedBody";
import { useEffect, useRef, useState } from "react";
import {
  StyledModalWrapper,
  StyledCloseButton,
  type StyledModalWrapperProps,
} from "./Modal.styled";
import dialogPolyfill from "dialog-polyfill";
import { LargeSystemIcon } from "../Svg/Svg";

export type ModalProps = {
  children: React.ReactNode;
  /** If the modal is open */
  isOpen: boolean;
  /** The function to call when the modal is closed */
  handleClose: () => void;
  /** If the modal spans the full page */
  fullPage?: StyledModalWrapperProps["$fullPage"];
} & BoxProps;

export const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  handleClose,
  backgroundColor = "white",
  fullPage,
  ...props
}) => {
  // Use state to keep track of the dialog element
  const [dialog, setDialog] = useState<HTMLDialogElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useClickOutside(contentRef, handleClose);
  useToggleLockedBody(isOpen, { disabled: !fullPage });

  useEffect(() => {
    // Register polyfill on dialog element
    dialog && dialogPolyfill.registerDialog(dialog);
  }, [dialog]);

  useEffect(() => {
    // Handle open / close from isOpen state
    // Conditional functional calls - not supported in react-testing-library
    if (isOpen) return dialog?.showModal?.();
    if (!isOpen && dialog?.hasAttribute("open")) return dialog?.close?.();
  }, [dialog, isOpen]);

  useEffect(() => {
    // Listen for close event on dialog element - from pressing escape
    dialog?.addEventListener("close", handleClose);
    return () => dialog?.removeEventListener("close", handleClose);
  }, [dialog, handleClose]);

  return (
    <Portal wrapperId="modal-root">
      <StyledModalWrapper ref={setDialog} $fullPage={fullPage} role="dialog">
        {isOpen && (
          <Box
            ref={contentRef}
            p={80}
            position="absolute"
            borderRadius={fullPage ? undefined : { sm: 16 }}
            wMax={{ xs: "100%", sm: 618, lg: 875 }}
            backgroundColor={backgroundColor}
            {...props}
          >
            <StyledCloseButton onClick={handleClose} $fullPage={fullPage}>
              <LargeSystemIcon icon="Close" />
            </StyledCloseButton>
            {children}
          </Box>
        )}
      </StyledModalWrapper>
    </Portal>
  );
};
