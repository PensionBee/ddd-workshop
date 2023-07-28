import { GridContainer, GridItem, GridRow } from "@shared/components/Grid";
import { FooterSystemIcon } from "@shared/components/Svg";
import { DisclaimerL } from "@shared/components/Typography";
import { Link } from "@shared/components/Link";

export const FooterCredentialsSection: React.FC = (props) => {
  return (
    <GridContainer
      data-rc="FooterCredentialsSection"
      pt={{ xs: 40, lg: 60 }}
      pb={{ xs: 40, lg: 60 }}
      {...props}
    >
      <GridRow rowGap={{ xs: 40 }}>
        <GridItem span={{ lg: 4 }} align="center">
          <FooterSystemIconLink
            icon="FscsLogo"
            href="https://www.fscs.org.uk/what-we-cover/"
            target="_blank"
          />
        </GridItem>
        <GridItem span={{ lg: 4 }} align="center">
          <FooterSystemIconLink
            icon="TrustPilot"
            href="https://uk.trustpilot.com/review/pensionbee.com?utm_medium=trustboxes&utm_source=MicroTrustScore"
            target="_blank"
            text="Excellent 4.6 out of 5"
          />
        </GridItem>
        <GridItem span={{ lg: 4 }} align="center">
          <FooterSystemIconLink
            icon="InternetCrystalMark"
            href="https://www.plainenglish.co.uk/accreditation.html"
            target="_blank"
          />
        </GridItem>
      </GridRow>
    </GridContainer>
  );
};

type FooterSystemIconLinkProps = React.ComponentProps<
  typeof FooterSystemIcon
> & {
  href: React.ComponentProps<typeof Link>["href"];
  target: React.ComponentProps<typeof Link>["target"];
  text?: string;
};

const FooterSystemIconLink: React.FC<FooterSystemIconLinkProps> = ({
  icon,
  text,
  ...props
}) => {
  return (
    <Link {...props}>
      <FooterSystemIcon icon={icon} />
      <DisclaimerL as="p" align="center">
        {text}
      </DisclaimerL>
    </Link>
  );
};
