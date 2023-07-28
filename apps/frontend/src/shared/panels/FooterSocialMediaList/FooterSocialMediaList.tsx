import { GridContainer, GridItem, GridRow } from "@shared/components/Grid";
import { SocialIcon } from "@shared/components/Svg";
import { Link } from "@shared/components/Link";
import { Box } from "@shared/components/Box";
import styled from "styled-components";
import { theme } from "@shared/styling/theme";

export const FooterSocialMediaList: React.FC = (props) => (
  <GridContainer data-rc="FooterSocialMediaList" pb={{ xs: 40 }} {...props}>
    <GridRow pb={10}>
      <GridItem span={{ lg: 6 }} offset={{ lg: 3 }}>
        <Box d="flex" justify="center" align="center" colGap={15} rowGap={15}>
          <SocialIconLink
            icon="Facebook"
            href="https://www.facebook.com/PensionBee"
            target="_blank"
          />
          <SocialIconLink
            icon="Twitter"
            href="https://twitter.com/pensionbee"
            target="_blank"
          />
          <SocialIconLink
            icon="LinkedIn"
            href="https://www.linkedin.com/company/pensionbee/"
            target="_blank"
          />
          <SocialIconLink
            icon="Instagram"
            href="https://www.instagram.com/pensionbee/"
            target="_blank"
          />
          <SocialIconLink
            icon="Youtube"
            href="https://www.youtube.com/channel/UCpVxqKCXMkiRL1GVgQERSHA"
            target="_blank"
          />
          <SocialIconLink icon="Podcast" href="/podcast" target="_blank" />
        </Box>
      </GridItem>
    </GridRow>
  </GridContainer>
);

// SocialIcon

const StyledSocialIconLink = styled(Link)`
  svg:hover {
    path {
      fill: ${() => theme.colors.black};
    }
  }
`;

const SocialIconLink: React.FC<
  {
    href: React.ComponentProps<typeof Link>["href"];
    target: React.ComponentProps<typeof Link>["target"];
  } & React.ComponentProps<typeof SocialIcon>
> = ({ icon, ...rest }) => {
  return (
    <StyledSocialIconLink {...rest}>
      <SocialIcon icon={icon} />
    </StyledSocialIconLink>
  );
};
