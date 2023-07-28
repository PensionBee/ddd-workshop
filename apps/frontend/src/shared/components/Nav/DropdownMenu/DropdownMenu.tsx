import { useFocusOutside } from "@shared/hooks/useFocusOutside/useFocusOutside";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useArrowNavigation } from "../hooks/useArrowNavigation/useArrowNavigation";
import type { NavMenuItem } from "../Nav.types";
import { StyledContentList } from "./DropdownMenu.styled";
import { DropdownMenuSubList } from "./DropdownMenuSubList/DropdownMenuSubList";

export type DropdownMenuProps = {
  subList: NavMenuItem["subList"];
  handleCloseDropdown?: () => void;
};

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  subList,
  handleCloseDropdown,
  ...props
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement | null>(null);

  useFocusOutside(dropdownRef, () => handleCloseDropdown?.());

  useArrowNavigation(dropdownRef, {
    direction: "vertical",
    disabled: isDropdownOpen,
    onExitTop: handleCloseDropdown,
  });

  useEffect(() => {
    const firstChild = dropdownRef.current?.querySelector(
      "a,button"
    ) as HTMLElement | null;
    firstChild?.focus();
  }, []);

  return (
    <StyledContentList
      data-rc="DropdownMenu"
      ref={dropdownRef}
      data-state={isDropdownOpen ? "open" : "closed"}
      {...props}
    >
      <DropdownMenuSubList
        subList={subList}
        setIsDropdownOpen={setIsDropdownOpen}
      />
    </StyledContentList>
  );
};
