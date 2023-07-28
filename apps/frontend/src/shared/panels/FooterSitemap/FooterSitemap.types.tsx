import type { FOOTER_MENU_SECTIONS } from "./FooterSitemap.content";
import type { Link } from "@shared/components/Link";

export type Menu = {
  sections: typeof FOOTER_MENU_SECTIONS;
};

export type MenuLink = {
  linkText: string;
  href: React.ComponentProps<typeof Link>["href"];
  target?: React.ComponentProps<typeof Link>["target"];
};

export type MenuList = {
  title: string;
  list: MenuLink[];
};

export type MobileMenuList = MenuList & {
  borderTop?: boolean;
  onClick?: () => void;
  open?: boolean;
};
