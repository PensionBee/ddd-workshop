import { LargeSystemIcon } from "@shared/components/Svg";
import { useRef } from "react";
import type { NavMenuItem } from "../../Nav.types";
import { StyledContentList } from "../../MobileMenu/MobileMenu.styled";
import {
  StyledListItem,
  StyledSubNav,
  StyledSubTriggerButton,
  StyledSubContent,
  StyledSubBackButton,
} from "../MobileMenuItem/MobileMenuItem.styled";
import { MobileMenuSubList } from "../MobileMenuSubList/MobileMenuSubList";
import { useDropdownMenuMotion } from "../../hooks/useDropdownMenuMotion/useDropdownMenuMotion";

export const MobileMenuItemWithSubList: React.FC<NavMenuItem> = ({
  children,
  subList,
}) => {
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const { isVisible, motion, toggleOpen } = useDropdownMenuMotion();

  return (
    <StyledListItem>
      <StyledSubNav>
        <StyledSubTriggerButton ref={triggerRef} onClick={toggleOpen}>
          {children}
          <LargeSystemIcon icon="ArrowRight" w={16} h={16} aria-hidden />
        </StyledSubTriggerButton>
        {isVisible && (
          <StyledSubContent data-motion={motion}>
            <StyledContentList>
              <StyledListItem>
                <StyledSubBackButton
                  onClick={() =>
                    triggerRef.current && triggerRef.current.click()
                  }
                >
                  <LargeSystemIcon
                    icon="ArrowRight"
                    w={16}
                    h={16}
                    rotate={180}
                    aria-hidden
                  />
                  {children}
                </StyledSubBackButton>
              </StyledListItem>
              <MobileMenuSubList subList={subList} />
            </StyledContentList>
          </StyledSubContent>
        )}
      </StyledSubNav>
    </StyledListItem>
  );
};
