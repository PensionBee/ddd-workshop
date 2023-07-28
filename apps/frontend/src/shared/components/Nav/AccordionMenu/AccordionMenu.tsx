import React, { useState } from "react";
import {
  StyledAccordionButton,
  StyledMenuList,
  StyledCaret,
} from "./AccordionMenu.styled";
import type { NavMenuItem } from "../Nav.types";
import { Box } from "../../Box/Box";
import { AccordionMenuItem } from "./AccordionMenuItem/AccordionMenuItem";

export type AccordionMenuProps = {
  list: NavMenuItem[];
};

export const AccordionMenu: React.FC<AccordionMenuProps> = ({
  list,
  ...props
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenuOpen = () => {
    return setMenuOpen((menuOpen) => !menuOpen);
  };

  return (
    <Box
      d="flex"
      w="100%"
      justify="center"
      align="center"
      data-rc="AccordionMenu"
      {...props}
    >
      <StyledAccordionButton
        onClick={handleToggleMenuOpen}
        data-state={menuOpen ? "open" : "closed"}
      >
        <Box d="flex" align="center" justify="center" colGap={10} py={14}>
          Menu
          <StyledCaret icon="ChevronYellow" aria-hidden />
        </Box>
      </StyledAccordionButton>
      <Box borderBottom={1} borderColor="grey4" w="100%" />
      {menuOpen ? (
        <StyledMenuList>
          {list.map((item) => (
            <AccordionMenuItem key={item.children} {...item} />
          ))}
        </StyledMenuList>
      ) : null}
    </Box>
  );
};
