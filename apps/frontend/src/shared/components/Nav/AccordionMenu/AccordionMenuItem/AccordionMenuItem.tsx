import { useState } from "react";
import type { NavMenuItem } from "../../Nav.types";
import { Link } from "../../../Link/Link";
import {
  StyledMenuItem,
  StyledAccordionButton,
  StyledCaret,
  StyledMenuList,
} from "../AccordionMenu.styled";
import { LargeSystemIcon } from "@shared/components/Svg";
import { Box } from "@shared/components/Box";

export const AccordionMenuItem: React.FC<NavMenuItem> = ({
  children,
  href,
  subList,
  hidden,
  icon,
  ...props
}) => {
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const handleToggleSubMenuOpen = () => {
    return setSubMenuOpen((subMenuOpen) => !subMenuOpen);
  };

  if (hidden) return null;

  return (
    <StyledMenuItem data-rc="AccordionMenuItem" {...props}>
      {!subList ? (
        <Link href={href} color="black" noUnderline>
          <Box d="flex" colGap={16} align="center">
            {icon ? <LargeSystemIcon w={24} h={24} icon={icon} /> : null}
            {children}
          </Box>
        </Link>
      ) : (
        <>
          <StyledAccordionButton
            onClick={handleToggleSubMenuOpen}
            data-state={subMenuOpen ? "open" : "closed"}
          >
            {children}
            <StyledCaret icon="ChevronYellow" aria-hidden />
          </StyledAccordionButton>
          {subMenuOpen && (
            <StyledMenuList>
              {subList.map((item) => (
                <AccordionMenuItem key={item.children} {...item} />
              ))}
            </StyledMenuList>
          )}
        </>
      )}
    </StyledMenuItem>
  );
};
