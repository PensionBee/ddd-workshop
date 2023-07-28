import type { NavMenuItem } from "../../Nav.types";
import { DropdownMenu } from "../../DropdownMenu/DropdownMenu";
import {
  StyledCaret,
  StyledContent,
  StyledItem,
  StyledTrigger,
} from "./MainNavItem.styled";
import { useRef } from "react";

export type MainNavItemProps = NavMenuItem & {
  $isTabMenu?: boolean;
  $isOpen?: boolean;
  toggleMenu?: (key: NavMenuItem["children"]) => void;
  handleCloseMenu?: () => void;
};

export const MainNavItem: React.FC<MainNavItemProps> = ({
  children,
  subList,
  $isTabMenu,
  $isOpen,
  toggleMenu,
  handleCloseMenu,
  ...props
}) => {
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handleTriggerClick = () => {
    toggleMenu?.(children);
  };

  const handleCloseDropdown = () => {
    handleCloseMenu?.();
    triggerRef.current?.focus();
  };

  const handleArrowDownOpenMenu = (
    event: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      handleTriggerClick();
    }
  };

  return (
    <StyledItem
      data-rc="MainNavItem"
      data-state={$isOpen ? "open" : "closed"}
      {...props}
    >
      <StyledTrigger
        ref={triggerRef}
        $isTabMenu={$isTabMenu}
        onClick={handleTriggerClick}
        onKeyUp={handleArrowDownOpenMenu}
      >
        {children}
        <StyledCaret icon="ChevronYellow" aria-hidden />
      </StyledTrigger>
      <StyledContent ref={contentRef}>
        {$isOpen && subList && (
          <DropdownMenu
            subList={subList}
            handleCloseDropdown={handleCloseDropdown}
          />
        )}
      </StyledContent>
    </StyledItem>
  );
};
