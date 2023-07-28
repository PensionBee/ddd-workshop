import type { theme } from "@shared/styling/theme";
import type * as ComponentIcons from "./components/ComponentIcons";
import type * as FooterSystemIcons from "./components/FooterSystemIcons";
import type * as LargeSystemIcons from "./components/LargeSystemIcons";
import type * as SmallSystemIcons from "./components/SmallSystemIcons";
import type * as PlanIcons from "./components/PlanIcons";
import type * as SocialIcons from "./components/SocialIcons";
import type * as RiskProfileIcons from "./components/RiskProfileIcons";
import type * as Logos from "./components/Logos";

export type ComponentIconType = keyof typeof ComponentIcons;
export type FooterSystemIconType = keyof typeof FooterSystemIcons;
export type LargeSystemIconType = keyof typeof LargeSystemIcons;
export type SmallSystemIconType = keyof typeof SmallSystemIcons;
export type PlanIconsType = keyof typeof PlanIcons;
export type SocialIconType = keyof typeof SocialIcons;
export type RiskProfileIconsType = keyof typeof RiskProfileIcons;
export type LogoType = keyof typeof Logos;

export type SVGColors = keyof typeof theme.colors;
