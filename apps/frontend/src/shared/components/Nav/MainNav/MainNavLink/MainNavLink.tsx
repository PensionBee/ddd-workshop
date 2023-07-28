import { useRef } from "react";
import { useLocation } from "react-router-dom";
import type { MainNavItemProps } from "../MainNavItem/MainNavItem";
import { StyledItem, StyledLink } from "../MainNavItem/MainNavItem.styled";

export const MainNavLink: React.FC<MainNavItemProps> = ({
  href,
  children,
  $isTabMenu,
  ...props
}) => {
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const location = useLocation();

  return (
    <StyledItem data-rc="MainNavLink" {...props}>
      <StyledLink
        ref={linkRef}
        href={href}
        $isTabMenu={$isTabMenu}
        $isHighlighted={$isTabMenu && href === location.pathname}
        data-highlighted={$isTabMenu && href === location.pathname}
      >
        {children}
      </StyledLink>
    </StyledItem>
  );
};
