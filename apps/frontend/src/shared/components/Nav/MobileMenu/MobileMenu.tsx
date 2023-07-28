import type { NavMenuItem } from "../Nav.types";
import { StyledContentList } from "./MobileMenu.styled";
import { MobileMenuSubList } from "./MobileMenuSubList/MobileMenuSubList";

export type MobileMenuProps = {
  subList: NavMenuItem["subList"];
};

export const MobileMenu: React.FC<MobileMenuProps> = ({ subList }) => {
  return (
    <StyledContentList>
      <MobileMenuSubList subList={subList} />
    </StyledContentList>
  );
};

export type MobileMainMenuProps = {
  list: NavMenuItem[];
};

export const MobileMainMenu: React.FC<MobileMainMenuProps> = ({ list }) => (
  <MobileMenu subList={list} />
);
