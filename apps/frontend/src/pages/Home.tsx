import { Box } from "@shared/components/Box";
import { Button } from "@shared/components/Button";
import { GridContainer, GridRow, GridItem } from "@shared/components/Grid";
import { LargeSystemIcon } from "@shared/components/Svg";
import { BodySmallL, Heading1, Heading2 } from "@shared/components/Typography";
import { MainLayout } from "../layouts/MainLayout/MainLayout";

const HomePage = () => {
  return (
    <MainLayout>
      <GridContainer>
        <GridRow>
          <GridItem>
            <Heading1>Welcome!</Heading1>
            <Heading2>Demo App</Heading2>
            <BodySmallL>Hello world!</BodySmallL>
            <Box w="100%" borderBottom={1} borderColor="black" />
            <LargeSystemIcon icon="Account" />
            <Button onClick={() => alert("Hello!")}>Click me!</Button>
          </GridItem>
        </GridRow>
      </GridContainer>
    </MainLayout>
  );
};

export default HomePage;
