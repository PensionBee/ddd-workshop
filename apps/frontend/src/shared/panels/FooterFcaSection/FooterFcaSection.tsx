import { GridContainer, GridItem, GridRow } from "@shared/components/Grid";
import { BodySmallL } from "@shared/components/Typography";

export const FooterFcaSection: React.FC = (props) => (
  <GridContainer
    data-rc="FooterFcaSection"
    pt={{ xs: 40, lg: 80 }}
    pb={{ xs: 40 }}
    {...props}
  >
    <GridRow pb={10}>
      <GridItem>
        <BodySmallL align="center" as="p">
          PensionBee is authorised and regulated by the Financial Conduct
          Authority.
        </BodySmallL>
        <BodySmallL align="center" as="p">
          With pensions, your capital is at risk.
        </BodySmallL>
      </GridItem>
    </GridRow>
  </GridContainer>
);
