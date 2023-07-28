import React, { useRef, useEffect, useState } from "react";
import type { NavMenuItem } from "../../Nav.types";
import { StyledContentList } from "../DropdownMenu.styled";
import { LargeSystemIcon } from "../../../Svg/Svg";
import {
  StyledListItem,
  StyledSubNav,
  StyledSubTriggerButton,
  StyledSubContent,
  StyledSubBackButton,
} from "../DropdownMenuItem/DropdownMenuItem.styled";
import { DropdownMenuSubList } from "../DropdownMenuSubList/DropdownMenuSubList";
import { useDropdownMenuMotion } from "../../hooks/useDropdownMenuMotion/useDropdownMenuMotion";
import { useArrowNavigation } from "../../hooks/useArrowNavigation/useArrowNavigation";
import { useFocusOutside } from "@shared/hooks/useFocusOutside/useFocusOutside";

type NavMenuItemProps = NavMenuItem & {
  setIsDropdownOpen?: (isOpen: boolean) => void;
};

export const DropdownMenuItemWithSubList: React.FC<NavMenuItemProps> = ({
  children,
  subList,
  setIsDropdownOpen,
  ...props
}) => {
  const itemRef = useRef<HTMLLIElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLUListElement | null>(null);
  const backButtonRef = useRef<HTMLButtonElement | null>(null);
  const { isVisible, motion, toggleOpen, setIsOpen } = useDropdownMenuMotion();
  const [isSubListOpen, setIsSubListOpen] = useState(false);

  useFocusOutside(contentRef, () => setIsOpen(false));

  const handleBackButtonClick = () => {
    toggleOpen();
    setIsDropdownOpen?.(false);
    if (!triggerRef.current) return;
    triggerRef.current.focus();
  };

  const handleTriggerButtonOnClick = () => {
    toggleOpen();
    setIsDropdownOpen?.(true);
  };

  const handleBackButtonKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      handleBackButtonClick();
    }
  };

  const handleTriggerKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      handleTriggerButtonOnClick();
    }
  };

  useArrowNavigation(contentRef, {
    disabled: isSubListOpen,
  });

  useEffect(() => {
    if (isVisible && backButtonRef.current) {
      backButtonRef.current.focus();
    }
  }, [isVisible]);

  return (
    <StyledListItem
      data-rc="DropdownMenuItemWithSubList"
      ref={itemRef}
      {...props}
    >
      <StyledSubNav>
        <StyledSubTriggerButton
          ref={triggerRef}
          onClick={handleTriggerButtonOnClick}
          tabIndex={0}
          onKeyDown={handleTriggerKeyDown}
        >
          {children}
          <LargeSystemIcon icon="ArrowRight" w={14} h={14} aria-hidden />
        </StyledSubTriggerButton>
        {isVisible && (
          <StyledSubContent data-motion={motion}>
            <StyledContentList ref={contentRef}>
              <StyledListItem>
                <StyledSubBackButton
                  onClick={handleBackButtonClick}
                  ref={backButtonRef}
                  tabIndex={0}
                  onKeyDown={handleBackButtonKeyDown}
                >
                  <LargeSystemIcon
                    icon="ArrowRight"
                    w={14}
                    h={14}
                    rotate={-180}
                    aria-hidden
                  />
                  {children}
                </StyledSubBackButton>
              </StyledListItem>
              <DropdownMenuSubList
                subList={subList}
                setIsDropdownOpen={setIsSubListOpen}
              />
            </StyledContentList>
          </StyledSubContent>
        )}
      </StyledSubNav>
    </StyledListItem>
  );
};
