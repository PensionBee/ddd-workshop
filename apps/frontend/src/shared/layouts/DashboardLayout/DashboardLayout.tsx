import type { ReactNode } from "react";
import { FooterContactSection } from "@shared/panels/FooterContactSection";
import { FooterCopyrightSection } from "@shared/panels/FooterCopyrightSection";
import { FooterCredentialsSection } from "@shared/panels/FooterCredentialsSection";
import { FooterFcaSection } from "@shared/panels/FooterFcaSection";
import { FooterQuestionSection } from "@shared/panels/FooterQuestionSection";
import { FooterSitemap } from "@shared/panels/FooterSitemap";
import { FooterSocialMediaList } from "@shared/panels/FooterSocialMediaList";
import { HeaderBeehiveMenu } from "@shared/panels/HeaderBeehiveMenu";
import { HeaderMainNavbar } from "@shared/panels/HeaderMainNavbar";

export type DashboardProps = {
  children?: ReactNode;
};

export const DashboardLayout: React.FC<DashboardProps> = ({
  children,
  ...props
}) => {
  return (
    <>
      <header>
        <HeaderMainNavbar />
        <HeaderBeehiveMenu />
      </header>
      <main data-layout="DashboardLayout" {...props}>
        {children}
      </main>
      <footer>
        <FooterQuestionSection />
        <FooterFcaSection />
        <FooterSocialMediaList />
        <FooterSitemap />
        <FooterContactSection />
        <FooterCopyrightSection />
        <FooterCredentialsSection />
      </footer>
    </>
  );
};
