import { GridContainer, GridItem, GridRow } from "@shared/components/Grid";
import { LargeSystemIcon, SmallSystemIcon } from "@shared/components/Svg";
import { CaptionL } from "@shared/components/Typography";
import { Link } from "@shared/components/Link";
import { Box } from "@shared/components/Box";

export const FooterContactSection: React.FC = (props) => (
  <GridContainer
    data-rc="FooterContactSection"
    pt={{ xs: 40, lg: 60 }}
    pb={{ xs: 40, lg: 60 }}
    borderTop={{ xs: 0, lg: 1 }}
    borderBottom={{ xs: 0, lg: 1 }}
    borderColor="grey4"
    {...props}
  >
    <GridRow rowGap={35}>
      <GridItem span={{ lg: 4 }} align={{ xs: "center", lg: "start" }}>
        <Box d="flex" pb={10}>
          <LargeSystemIcon icon="Telephone" w={36} h={36} />
        </Box>
        <CaptionL align="center">
          General enquiries:{" "}
          <Link href="tel:+442034578444" nowrap>
            020 3457 8444
          </Link>
        </CaptionL>
        <CaptionL align="center">
          Press enquiries:{" "}
          <Link href="tel:+442038595788" nowrap>
            020 3859 5788
          </Link>
        </CaptionL>
      </GridItem>
      <GridItem span={{ lg: 4 }} align={{ xs: "center", lg: "start" }}>
        <Box d="flex" pb={10}>
          <LargeSystemIcon icon="Email2" w={36} h={36} />
        </Box>
        <CaptionL align="center">
          General enquiries:{" "}
          <Link href="mailto:contact@pensionbee.com">
            contact@pensionbee.com
          </Link>
        </CaptionL>
        <CaptionL align="center">
          Press:{" "}
          <Link href="mailto:press@pensionbee.com">press@pensionbee.com</Link>
        </CaptionL>
        <CaptionL align="center">
          Partners:{" "}
          <Link href="mailto:partnership@pensionbee.com">
            partnership@pensionbee.com
          </Link>
        </CaptionL>
      </GridItem>
      <GridItem span={{ lg: 4 }} align={{ xs: "center", lg: "start" }}>
        <Box d="flex" pb={10}>
          <SmallSystemIcon icon="Location" w={36} h={36} />
        </Box>
        <CaptionL align="center">
          <Link href="https://goo.gl/maps/kX1Ui8LtRSRcg2XQ6">
            PensionBee, 209 Blackfriars Road, London, SE1 8NL
          </Link>
        </CaptionL>
      </GridItem>
    </GridRow>
  </GridContainer>
);
