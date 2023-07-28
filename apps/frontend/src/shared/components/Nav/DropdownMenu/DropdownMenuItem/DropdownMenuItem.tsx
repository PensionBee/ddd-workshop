import { LargeSystemIcon } from "@shared/components/Svg";
import { useLocation } from "react-router-dom";
import { Box } from "@shared/components/Box";
import type { NavMenuItem } from "../../Nav.types";
import { StyledListItem, StyledNavLink } from "./DropdownMenuItem.styled";

export const DropdownMenuItem: React.FC<NavMenuItem> = ({
  href,
  children,
  icon,
  ...props
}) => {
  const location = useLocation();

  return (
    <StyledListItem
      $isHighlighted={href === location.pathname}
      data-rc="DropdownMenuItem"
      data-highlighted={href === location.pathname}
      {...props}
    >
      <StyledNavLink href={href} tabIndex={0}>
        <Box d="flex" colGap={16} align="center">
          {icon ? <LargeSystemIcon w={24} h={24} icon={icon} /> : null}
          {children}
        </Box>
      </StyledNavLink>
    </StyledListItem>
  );
};
