import { GridContainer, GridItem, GridRow } from "@shared/components/Grid";
import { DisclaimerL } from "@shared/components/Typography";
import { Link } from "@shared/components/Link";

const currentYear = new Date().getFullYear();

export const FooterCopyrightSection: React.FC = (props) => {
  return (
    <GridContainer
      data-rc="FooterCopyrightSection"
      pt={{ xs: 20, lg: 50 }}
      pb={20}
      {...props}
    >
      <GridRow>
        <GridItem align="center">
          <DisclaimerL as="p" align="center">
            © Copyright {currentYear} PensionBee Ltd. Company registration:
            9354862. FCA Reference Number: 744931. Information
            Commissioner&apos;s Office registration: ZA131262
          </DisclaimerL>
          <DisclaimerL as="p" align="center">
            We use cookies to ensure that you get the best possible experience.
            By continuing to use our website you are agreeing to their use.{" "}
            <Link href="/privacy-policy#4-cookies">
              Find out more about cookies
            </Link>
            .
          </DisclaimerL>
        </GridItem>
      </GridRow>
    </GridContainer>
  );
};
