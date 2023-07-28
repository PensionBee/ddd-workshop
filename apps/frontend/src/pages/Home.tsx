import { GridContainer, GridRow, GridItem } from "@shared/components/Grid";
import { BodySmallL } from "@shared/components/Typography";

export const HomePage = () => {
  return (
    <>
      <header></header>
      <main>
        <GridContainer>
          <GridRow>
            <GridItem>
              <BodySmallL>Hello world!</BodySmallL>
            </GridItem>
          </GridRow>
        </GridContainer>
      </main>
      <footer></footer>
    </>
  );
};
