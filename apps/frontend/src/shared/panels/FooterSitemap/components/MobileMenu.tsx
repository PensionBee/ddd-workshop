import { GridContainer, GridItem, GridRow } from "@shared/components/Grid";
import { BodySmallL, Category } from "@shared/components/Typography";
import { useState } from "react";
import { Link } from "@shared/components/Link";
import { Box } from "@shared/components/Box";
import { StyledAccordionButton, StyledCaret } from "../FooterSitemap.styled";
import type { MenuLink, MobileMenuList, Menu } from "../FooterSitemap.types";

export const MobileLinkItem: React.FC<MenuLink> = ({
  linkText,
  href,
  target,
  ...props
}) => {
  return (
    <Box as="li" d="flex" pt={10} pb={10} justify="center" {...props}>
      <BodySmallL align="center">
        <Link href={href} target={target} color="black">
          {linkText}
        </Link>
      </BodySmallL>
    </Box>
  );
};

export const MobileAccordion: React.FC<MobileMenuList> = ({
  title,
  list,
  borderTop,
  onClick,
  open,
  ...props
}) => {
  return (
    <GridRow data-state={open ? "open" : "closed"} {...props}>
      <GridItem align="center">
        {borderTop && <Box borderColor="grey4" borderTop={1} w="100%" />}
        <StyledAccordionButton onClick={onClick}>
          <Category>{title}</Category>
          <StyledCaret icon="ChevronYellow" aria-hidden />
        </StyledAccordionButton>
        {open && (
          <Box as="ul" mb={24}>
            {list.map((props) => (
              <MobileLinkItem key={props.linkText} {...props} />
            ))}
          </Box>
        )}
        <Box borderColor="grey4" borderBottom={1} w="100%" />
      </GridItem>
    </GridRow>
  );
};

export const MobileMenu: React.FC<Menu> = ({ sections, ...props }) => {
  const [open, setOpen] = useState<string | null>(null);

  const handleSetOpen = (title: string) => {
    return setOpen((open) => {
      if (title === open) return null;
      return title;
    });
  };

  return (
    <GridContainer pt={{ xs: 40 }} {...props}>
      {Object.entries(sections).map(([key, value], index) => (
        <MobileAccordion
          key={key}
          title={key}
          list={value}
          onClick={() => handleSetOpen(key)}
          open={open === key}
          borderTop={index === 0}
        />
      ))}
    </GridContainer>
  );
};
