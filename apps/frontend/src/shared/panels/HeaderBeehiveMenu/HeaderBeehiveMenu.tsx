import { usePermissionsQuery } from "@modules/_app/api/appQueries";
import { GridContainer } from "@shared/components/Grid";
import { AccordionMenu } from "@shared/components/Nav/AccordionMenu/AccordionMenu";
import { MainNav } from "@shared/components/Nav/MainNav/MainNav";
import { useMediaQueryLg } from "@shared/hooks/useMediaQuery/useMediaQuery";
import { Box } from "@shared/components/Box";
import { getDynamicHeaderBeehiveMenuContent } from "./HeaderBeehiveMenu.content";

export const HeaderBeehiveMenu: React.FC = (props) => {
  const isDesktop = useMediaQueryLg();
  const { isLoading, data: permissions } = usePermissionsQuery();

  const dynamicBeehiveMenuList = getDynamicHeaderBeehiveMenuContent(
    permissions || {}
  );

  if (isLoading)
    return <Box h={{ xs: 55, lg: 47 }} mt={{ xs: 65, lg: 100 }}></Box>;

  return (
    <GridContainer
      data-rc="HeaderBeehiveMenu"
      {...props}
      data-state={isDesktop ? "desktop" : "mobile"}
      pt={16}
    >
      {isDesktop ? (
        <MainNav
          list={dynamicBeehiveMenuList}
          colGapLarge={25}
          borderBottom
          isTabMenu
        />
      ) : (
        <AccordionMenu list={dynamicBeehiveMenuList} />
      )}
    </GridContainer>
  );
};
