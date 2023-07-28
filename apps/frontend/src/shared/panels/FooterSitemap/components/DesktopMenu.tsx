import { GridContainer, GridItem, GridRow } from "@shared/components/Grid";
import { BodySmallL, Category } from "@shared/components/Typography";
import { Link } from "@shared/components/Link";
import { Box } from "@shared/components/Box";
import type { MenuLink, MenuList, Menu } from "../FooterSitemap.types";

export const DesktopListItem: React.FC<MenuLink> = ({
  linkText,
  href,
  target,
  ...props
}) => {
  return (
    <Box as="li" pt={5} pb={5} {...props}>
      <BodySmallL>
        <Link href={href} target={target} color="black" noUnderline>
          {linkText}
        </Link>
      </BodySmallL>
    </Box>
  );
};

export const DesktopList: React.FC<MenuList> = ({ title, list, ...props }) => {
  return (
    <Box w="20%" p={5} {...props}>
      <Category>{title}</Category>
      <Box as="ul" mt={20}>
        {list.map((props) => (
          <DesktopListItem key={props.linkText} {...props} />
        ))}
      </Box>
    </Box>
  );
};

export const DesktopMenu: React.FC<Menu> = ({ sections, ...props }) => {
  return (
    <GridContainer pt={{ xs: 40 }} pb={{ xs: 40 }} {...props}>
      <GridRow rowGap={20}>
        <GridItem>
          <Box d="flex">
            {Object.entries(sections).map(([key, value]) => (
              <DesktopList key={key} title={key} list={value} />
            ))}
          </Box>
        </GridItem>
      </GridRow>
    </GridContainer>
  );
};
