import { useClickOutside } from "@shared/hooks/useClickOutside/useClickOutside";
import { useFocusOutside } from "@shared/hooks/useFocusOutside/useFocusOutside";
import { useRef, useState } from "react";
import { useArrowNavigation } from "../hooks/useArrowNavigation/useArrowNavigation";
import type { NavMenuItem } from "../Nav.types";
import type { StyledMenuProps, StyledListProps } from "./MainNav.styled";
import { StyledMenu, StyledList } from "./MainNav.styled";
import { MainNavItem } from "./MainNavItem/MainNavItem";
import { MainNavLink } from "./MainNavLink/MainNavLink";

export type MainNavProps = {
  list: NavMenuItem[];
  borderBottom?: StyledMenuProps["$borderBottom"];
  colGapLarge?: StyledListProps["$colGapLarge"];
  isTabMenu?: boolean;
};

export const MainNav: React.FC<MainNavProps> = ({
  borderBottom,
  colGapLarge = 40,
  isTabMenu,
  list,
  ...props
}) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  useClickOutside(menuRef, () => setMenuOpen(null));
  useFocusOutside(menuRef, () => setMenuOpen(null));

  const handleToggleSubMenu = (key: NavMenuItem["children"]) => {
    return setMenuOpen((menuOpen) => (menuOpen !== key ? key : null));
  };

  const handleCloseMenu = () => {
    return setMenuOpen(null);
  };

  useArrowNavigation(menuRef, {
    direction: "horizontal",
    disabled: Boolean(menuOpen),
  });

  return (
    <StyledMenu
      data-rc="MainNav"
      ref={menuRef}
      $borderBottom={borderBottom}
      {...props}
    >
      <StyledList $colGapLarge={colGapLarge}>
        {list.map((item) => {
          if (item.hidden) return null;
          if (item.subList?.length) {
            return (
              <MainNavItem
                key={item.children}
                $isTabMenu={isTabMenu}
                $isOpen={menuOpen === item.children}
                toggleMenu={handleToggleSubMenu}
                handleCloseMenu={handleCloseMenu}
                {...item}
              />
            );
          }
          return (
            <MainNavLink
              key={item.children}
              href={item.href || ""}
              $isTabMenu={isTabMenu}
              {...item}
            >
              {item.children}
            </MainNavLink>
          );
        })}
      </StyledList>
    </StyledMenu>
  );
};
