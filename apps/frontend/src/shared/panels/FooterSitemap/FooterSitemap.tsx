import { useMediaQueryLg } from "@shared/hooks/useMediaQuery/useMediaQuery";
import { DesktopMenu } from "./components/DesktopMenu";
import { MobileMenu } from "./components/MobileMenu";
import { FOOTER_MENU_SECTIONS } from "./FooterSitemap.content";

export const FooterSitemap: React.FC = (props) => {
  const isDesktop = useMediaQueryLg();
  if (isDesktop) {
    return (
      <DesktopMenu
        data-rc="FooterSitemap"
        data-testid="DesktopMenu"
        sections={FOOTER_MENU_SECTIONS}
        {...props}
      />
    );
  }
  return (
    <MobileMenu
      data-rc="FooterSitemap"
      data-testid="MobileMenu"
      sections={FOOTER_MENU_SECTIONS}
      {...props}
    />
  );
};
