import { GridContainer, GridItem, GridRow } from "@shared/components/Grid";
import { Heading1, Heading2 } from "@shared/components/Typography";

const FallbackPage = () => {
  return (
    <GridContainer>
      <GridRow pt={{ xs: 40, lg: 80 }} pb={{ xs: 20, lg: 40 }}>
        <GridItem align="center">
          <Heading1>404</Heading1>
          <Heading2>Page not found!</Heading2>
        </GridItem>
      </GridRow>
    </GridContainer>
  );
};

export default FallbackPage;
