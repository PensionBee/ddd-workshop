import type { ValueOrBreakpointValues } from "@shared/utils/types";
import { asBreakpointObject } from "@shared/utils/asBreakpointObject";
// import * as ComponentIcons from "./components/ComponentIcons";
// import * as FooterSystemIcons from "./components/FooterSystemIcons";
import * as LargeSystemIcons from "./components/LargeSystemIcons";
import * as SmallSystemIcons from "./components/SmallSystemIcons";
// import * as PlanIcons from "./components/PlanIcons";
// import * as SocialIcons from "./components/SocialIcons";
// import * as RiskProfileIcons from "./components/RiskProfileIcons";
// import * as Logos from "./components/Logos";

// const ComponentIcons = [] as  React.FC<React.SVGProps<SVGSVGElement>>[];
// const FooterSystemIcons = [] as  React.FC<React.SVGProps<SVGSVGElement>>[];
// const SmallSystemIcons = [] as  React.FC<React.SVGProps<SVGSVGElement>>[];
// const PlanIcons = [] as  React.FC<React.SVGProps<SVGSVGElement>>[];
// const SocialIcons = [] as  React.FC<React.SVGProps<SVGSVGElement>>[];
// const RiskProfileIcons = [] as  React.FC<React.SVGProps<SVGSVGElement>>[];
// const Logos = [] as  React.FC<React.SVGProps<SVGSVGElement>>[];

import { StyledSvg } from "./Svg.styled";
import type {
  // ComponentIconType,
  // FooterSystemIconType,
  LargeSystemIconType,
  SmallSystemIconType,
  // SocialIconType,
  // LogoType,
  SVGColors,
  // PlanIconsType,
  // RiskProfileIconsType,
} from "./Svg.types";
import type {
  MediaHeightType,
  MediaMarginType,
  MediaPaddingType,
  MediaWidthType,
  MediaZIndex,
} from "@shared/styling/styledComponentHelpers";

export type BaseSvgProps = {
  /** Component */
  component: React.FC;
  /** Fill color */
  fill?: SVGColors;
  /** Rotate */
  rotate?: number;
  /** Height */
  h?: ValueOrBreakpointValues<MediaHeightType>;
  /** Maximum height */
  hMax?: ValueOrBreakpointValues<MediaHeightType>;
  /** Minimum height */
  hMin?: ValueOrBreakpointValues<MediaHeightType>;
  /** Width */
  w?: ValueOrBreakpointValues<MediaWidthType>;
  /** Maximum width */
  wMax?: ValueOrBreakpointValues<MediaWidthType>;
  /** Minimum width */
  wMin?: ValueOrBreakpointValues<MediaWidthType>;
  /** Margin in px */
  m?: ValueOrBreakpointValues<MediaMarginType>;
  /** Horizontal margin in px */
  mx?: ValueOrBreakpointValues<MediaMarginType>;
  /** Vertical margin in px */
  my?: ValueOrBreakpointValues<MediaMarginType>;
  /** Margin bottom in px */
  mb?: ValueOrBreakpointValues<MediaMarginType>;
  /** Margin left in px */
  ml?: ValueOrBreakpointValues<MediaMarginType>;
  /** Margin right in px */
  mr?: ValueOrBreakpointValues<MediaMarginType>;
  /** Margin top in px */
  mt?: ValueOrBreakpointValues<MediaMarginType>;
  /** Padding in px */
  p?: ValueOrBreakpointValues<MediaPaddingType>;
  /** Padding horizontal in px */
  px?: ValueOrBreakpointValues<MediaPaddingType>;
  /** Padding vertical in px */
  py?: ValueOrBreakpointValues<MediaPaddingType>;
  /** Padding bottom in px */
  pb?: ValueOrBreakpointValues<MediaPaddingType>;
  /** Padding left in px */
  pl?: ValueOrBreakpointValues<MediaPaddingType>;
  /** Padding right in px */
  pr?: ValueOrBreakpointValues<MediaPaddingType>;
  /** Padding top in px */
  pt?: ValueOrBreakpointValues<MediaPaddingType>;
  /** Z Index */
  z?: ValueOrBreakpointValues<MediaZIndex>;
};

const BaseSvg: React.FC<BaseSvgProps> = ({
  component,
  fill,
  rotate,
  h,
  hMax,
  hMin,
  w,
  wMax,
  wMin,
  m,
  mx,
  my,
  mb,
  ml,
  mr,
  mt,
  p,
  px,
  py,
  pb,
  pl,
  pr,
  pt,
  z,
  ...props
}) => {
  const Svg = component;

  const styledProps = {
    $fill: fill,
    $rotate: rotate,
    $h: asBreakpointObject(h),
    $hMax: asBreakpointObject(hMax),
    $hMin: asBreakpointObject(hMin),
    $w: asBreakpointObject(w),
    $wMax: asBreakpointObject(wMax),
    $wMin: asBreakpointObject(wMin),
    $m: asBreakpointObject(m),
    $mx: asBreakpointObject(mx),
    $my: asBreakpointObject(my),
    $mb: asBreakpointObject(mb),
    $ml: asBreakpointObject(ml),
    $mr: asBreakpointObject(mr),
    $mt: asBreakpointObject(mt),
    $p: asBreakpointObject(p),
    $px: asBreakpointObject(px),
    $py: asBreakpointObject(py),
    $pb: asBreakpointObject(pb),
    $pl: asBreakpointObject(pl),
    $pr: asBreakpointObject(pr),
    $pt: asBreakpointObject(pt),
    $z: asBreakpointObject(z),
  };

  return (
    <StyledSvg {...styledProps} {...props}>
      <Svg />
    </StyledSvg>
  );
};

export type SvgProps<T> = Omit<BaseSvgProps, "component"> & {
  icon: T;
};

// export const ComponentIcon: React.FC<SvgProps<ComponentIconType>> = ({
//   icon,
//   ...props
// }) => (
//   <BaseSvg
//     data-rc={`ComponentIcon.${icon}`}
//     {...props}
//     component={ComponentIcons[icon]}
//   />
// );

// export const FooterSystemIcon: React.FC<SvgProps<FooterSystemIconType>> = ({
//   icon,
//   ...props
// }) => (
//   <BaseSvg
//     data-rc={`FooterSystemIcon.${icon}`}
//     {...props}
//     component={FooterSystemIcons[icon]}
//   />
// );

export const LargeSystemIcon: React.FC<SvgProps<LargeSystemIconType>> = ({
  icon,
  ...props
}) => (
  <BaseSvg
    data-rc={`LargeSystemIcon.${icon}`}
    {...props}
    component={LargeSystemIcons[icon]}
  />
);

export const SmallSystemIcon: React.FC<SvgProps<SmallSystemIconType>> = ({
  icon,
  ...props
}) => (
  <BaseSvg
    data-rc={`SmallSystemIcon.${icon}`}
    {...props}
    component={SmallSystemIcons[icon]}
  />
);

// export const PlanIcon: React.FC<SvgProps<PlanIconsType>> = ({
//   icon,
//   ...props
// }) => (
//   <BaseSvg
//     data-rc={`PlanIcon.${icon}`}
//     {...props}
//     component={PlanIcons[icon]}
//   />
// );

// export const RiskProfileIcon: React.FC<SvgProps<RiskProfileIconsType>> = ({
//   icon,
//   ...props
// }) => (
//   <BaseSvg
//     data-rc={`RiskProfileIcon.${icon}`}
//     {...props}
//     component={RiskProfileIcons[icon]}
//   />
// );

// export const SocialIcon: React.FC<SvgProps<SocialIconType>> = ({
//   icon,
//   ...props
// }) => (
//   <BaseSvg
//     data-rc={`SocialIcon.${icon}`}
//     {...props}
//     component={SocialIcons[icon]}
//   />
// );

// export const LogoSvg: React.FC<SvgProps<LogoType>> = ({ icon, ...props }) => (
//   <BaseSvg data-rc={`LogoSvg.${icon}`} {...props} component={Logos[icon]} />
// );
