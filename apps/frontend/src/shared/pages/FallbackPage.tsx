import { DashboardLayout } from "@shared/layouts/DashboardLayout";
import { GridContainer, GridItem, GridRow } from "@shared/components/Grid";
import { Heading1 } from "@shared/components/Typography";

const FallbackPage = () => {
  return (
    <DashboardLayout>
      <GridContainer>
        <GridRow pt={{ xs: 40, lg: 80 }} pb={{ xs: 20, lg: 40 }}>
          <GridItem align="center">
            <Heading1>Nothing here yet!</Heading1>
          </GridItem>
        </GridRow>
      </GridContainer>
    </DashboardLayout>
  );
};

export default FallbackPage;
