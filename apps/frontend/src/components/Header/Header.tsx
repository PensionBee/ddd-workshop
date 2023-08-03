import { GridContainer, GridItem, GridRow } from "@shared/components/Grid";
import { MainNav } from "../../shared/components/Nav/MainNav/MainNav";
import { Button } from "../../shared/components/Button";
import { StyledHeader } from "./Header.styled";
import { useMediaQueryMd } from "../../shared/hooks/useMediaQuery";
import { useAuthState } from "../../AuthContext";

const mainMenu = [
  {
    children: "Home",
    href: "/",
  },
  {
    children: "Profile",
    href: "/profile",
  },
  {
    children: "Settings",
    href: "/settings",
  },
];

const Header = () => {
  const isMd = useMediaQueryMd();
  const [{ user }, dispatchAuthState] = useAuthState();
  return (
    <StyledHeader>
      <GridContainer>
        <GridRow pb={8} pt={8} align="center">
          <GridItem span={{ xs: 6, md: 3 }}>[Logo]</GridItem>
          {isMd ? (
            <GridItem span={{ md: 6 }} align="center">
              <MainNav list={mainMenu} />
            </GridItem>
          ) : null}
          <GridItem span={{ xs: 6, md: 3 }} align="end">
            {!user ? (
              <Button href="/login">Log In</Button>
            ) : (
              <Button onClick={() => dispatchAuthState({ type: "LOG_OUT" })}>
                Log out
              </Button>
            )}
          </GridItem>
        </GridRow>
      </GridContainer>
    </StyledHeader>
  );
};

export default Header;
