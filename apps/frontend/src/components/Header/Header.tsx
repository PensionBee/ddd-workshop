import { GridContainer, GridItem, GridRow } from "@shared/components/Grid";
import { MainNav } from "../../shared/components/Nav/MainNav/MainNav";
import { Button } from "../../shared/components/Button";
import { StyledHeader } from "./Header.styled";

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
  return (
    <StyledHeader>
      <GridContainer>
        <GridRow pb={8} pt={8} align="center">
          <GridItem span={{ md: 4 }}>[Logo]</GridItem>
          <GridItem span={{ md: 4 }} align="center">
            <MainNav list={mainMenu} />
          </GridItem>
          <GridItem span={{ md: 4 }} align="end">
            <Button onClick={() => alert("Clicked")}>Log In</Button>
          </GridItem>
        </GridRow>
      </GridContainer>
    </StyledHeader>
  );
};

export default Header;
