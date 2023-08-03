import { GridContainer, GridRow, GridItem } from "@shared/components/Grid";
import { BodySmallL, Heading1, Heading2 } from "@shared/components/Typography";
import { MainLayout } from "../layouts/MainLayout/MainLayout";
import { useAuthState } from "../AuthContext";

const HomePage = () => {
  const [{ user }, _dispatchAuthState] = useAuthState();
  const { username } = user || {};

  return (
    <MainLayout>
      <GridContainer>
        <GridRow>
          <GridItem>
            <Heading1>{username ? `Welcome ${username}!` : `Welcome!`}</Heading1>
            <Heading2>Demo App</Heading2>
            <BodySmallL>Hello world!</BodySmallL>
          </GridItem>
        </GridRow>
      </GridContainer>
    </MainLayout>
  );
};

export default HomePage;
