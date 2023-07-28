import type { NavMenuItem } from "../../Nav.types";
import { StyledListItem, StyledNavLink } from "./MobileMenuItem.styled";

export const MobileMenuItem: React.FC<NavMenuItem> = ({
  href,
  children,
  ...props
}) => {
  return (
    <StyledListItem data-rc="MobileMenuItem" {...props}>
      <StyledNavLink href={href}>{children}</StyledNavLink>
    </StyledListItem>
  );
};
