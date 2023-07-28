import { GridContainer, GridItem, GridRow } from "@shared/components/Grid";
import { Heading2El, BodySmallL } from "@shared/components/Typography";
import { Link } from "@shared/components/Link";

export const FooterQuestionSection: React.FC = (props) => (
  <GridContainer
    data-rc="FooterQuestionSection"
    backgroundColor="grey5"
    pt={{ xs: 36, md: 48, lg: 56 }}
    pb={{ xs: 36, md: 48, lg: 56 }}
    {...props}
  >
    <GridRow pb={10}>
      <GridItem>
        <Heading2El align="center">
          Have a question? Call our UK team{" "}
          <Link href="tel:+442034578444" nowrap>
            020 3457 8444
          </Link>
        </Heading2El>
      </GridItem>
    </GridRow>
    <GridRow>
      <GridItem>
        <BodySmallL align="center">
          <BodySmallL nowrap>Monday-Wednesday</BodySmallL>{" "}
          <BodySmallL nowrap>9:30am-6pm,</BodySmallL>{" "}
          <BodySmallL nowrap>Thursday-Friday</BodySmallL>{" "}
          <BodySmallL nowrap>9:30am-5pm</BodySmallL>
        </BodySmallL>
      </GridItem>
    </GridRow>
  </GridContainer>
);
