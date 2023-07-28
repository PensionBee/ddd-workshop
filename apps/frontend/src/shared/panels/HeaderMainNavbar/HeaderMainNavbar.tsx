import { useState } from "react";
import { StyledMenuButton, StyledMenuDrawer } from "./HeaderMainNavbar.styled";
import { LogoSvg, LargeSystemIcon } from "@shared/components/Svg";
import { Button } from "@shared/components/Button";
import { GridContainer } from "@shared/components/Grid";
import { MainNav } from "@shared/components/Nav/MainNav/MainNav";
import { MobileMainMenu } from "@shared/components/Nav/MobileMenu/MobileMenu";
import { Link } from "@shared/components/Link";
import { Box } from "@shared/components/Box";
import { NAV_MENU_CONTENT } from "./HeaderMainNavbar.content";
import { useWindowScroll } from "@shared/hooks/useWindowScroll/useWindowScroll";
import {
  useMediaQueryMd,
  useMediaQueryLg,
} from "@shared/hooks/useMediaQuery/useMediaQuery";

export const HeaderMainNavbar: React.FC = (props) => {
  const windowScroll = useWindowScroll();

  const hasScrolled0 = windowScroll >= 0;
  const hasScrolled100 = windowScroll >= 100;
  const hasScrolled200 = windowScroll >= 200;

  return (
    <>
      <HeaderMainNavbarInner
        data-rc="HeaderMainNavbar"
        isVisible={
          hasScrolled200 || !(hasScrolled0 && hasScrolled100) || !hasScrolled100
        }
        isFixed={hasScrolled200}
        {...props}
      />
      <Box mt={{ xs: 45, lg: 82 }} />
    </>
  );
};

type HeaderMainNavbarProps = {
  isFixed?: boolean;
  isVisible?: boolean;
};

const HeaderMainNavbarInner: React.FC<HeaderMainNavbarProps> = ({
  isFixed = false,
  isVisible = true,
  ...props
}) => {
  const isTablet = useMediaQueryMd();
  const isDesktop = useMediaQueryLg();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Box
      position={isFixed ? "fixed" : "absolute"}
      backgroundColor="white"
      z={2}
      w="100vw"
      top={0}
      boxShadow={isFixed ? "0px 0px 20px rgb(197 225 240 / 40%)" : undefined}
      transition={isVisible ? "opacity 300ms" : undefined}
      opacity={isVisible ? 1 : 0}
      {...props}
    >
      <GridContainer>
        <Box
          d="flex"
          justify="space-between"
          align="center"
          py={{ xs: 5, lg: 15 }}
          w="100%"
        >
          <Box d="flex">
            <Link href="/">
              <LogoSvg
                icon="PensionBeeLogo"
                h={isTablet ? 52 : 37}
                w={isTablet ? 172 : 122}
              />
            </Link>
          </Box>
          {isDesktop ? (
            // Desktop Menu Items
            <>
              <Box ml="auto" mr={{ xs: 20, md: 40 }}>
                <MainNav list={NAV_MENU_CONTENT} />
              </Box>
              <Box d="flex" align="center" colGap={20}>
                <Link href="/logout" color="black" noUnderline>
                  Log Out
                </Link>
                <Button href="/dashboard" w="unset">
                  BeeHive
                </Button>
              </Box>
            </>
          ) : (
            // Mobile Menu Items
            <Box d="flex">
              <StyledMenuButton onClick={() => setMenuOpen(true)}>
                <LargeSystemIcon icon="Menu" />
              </StyledMenuButton>
            </Box>
          )}
        </Box>
      </GridContainer>
      {!isDesktop && (
        // Mobile Menu Drawer
        <Box z={3}>
          <StyledMenuDrawer data-open={menuOpen}>
            <StyledMenuButton onClick={() => setMenuOpen(false)} data-close>
              <LargeSystemIcon icon="Close" w={24} h={24} />
            </StyledMenuButton>
            <MobileMainMenu list={NAV_MENU_CONTENT} />
            <Box p={20} d="flex" rowGap={20} colGap={20}>
              <Box d="flex" flex="1">
                <Button href="/logout" variant="secondary" w="100%">
                  Log Out
                </Button>
              </Box>
              <Box d="flex" flex="1">
                <Button href="/dashboard" w="100%">
                  BeeHive
                </Button>
              </Box>
            </Box>
          </StyledMenuDrawer>
        </Box>
      )}
    </Box>
  );
};
