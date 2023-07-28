import type { TypographyTags, TypographyVariants } from "./Typography.types";
import { StyledTypography } from "./Typography.styled";
import type { ValueOrBreakpointValues } from "@shared/utils/types";
import { asBreakpointObject } from "@shared/utils/asBreakpointObject";
import type {
  MediaMarginType,
  MediaTextAlign,
  MediaTextColors,
  MediaTextNoWrapType,
} from "@shared/styling/styledComponentHelpers";

export type TypographyProps = {
  /** React children */
  children: React.ReactNode;
  /** Text alignment */
  align?: ValueOrBreakpointValues<MediaTextAlign>;
  /** Element to render as */
  as?: TypographyTags;
  /** Typography colour */
  color?: ValueOrBreakpointValues<MediaTextColors>;
  /** Margin top */
  mt?: ValueOrBreakpointValues<MediaMarginType>;
  /** Margin bottom */
  mb?: ValueOrBreakpointValues<MediaMarginType>;
  /** If true, prevents portion of text from wrapping, forcing the entire content onto a new line */
  nowrap?: ValueOrBreakpointValues<MediaTextNoWrapType>;
  /** Style variant to use */
  variant: TypographyVariants;
};

export const Typography: React.FC<TypographyProps> = ({
  children,
  align = "left",
  as = "span",
  color = "black",
  nowrap = false,
  variant,
  mt = 0,
  mb = 0,
  ...props
}) => {
  const styledProps = {
    as: as,
    $color: asBreakpointObject(color),
    $variant: variant,
    $align: asBreakpointObject(align),
    $nowrap: asBreakpointObject(nowrap),
    $mt: asBreakpointObject(mt),
    $mb: asBreakpointObject(mb),
  };
  return (
    <StyledTypography {...styledProps} {...props}>
      {children}
    </StyledTypography>
  );
};

// Pre-set variants
export type VariantTypographyProps = Omit<TypographyProps, "variant">;

export const AppNav: React.FC<VariantTypographyProps> = (props) => (
  <Typography data-rc="AppNav" variant="appNav" {...props} />
);

export const BodyLarge: React.FC<VariantTypographyProps> = (props) => (
  <Typography data-rc="BodyLarge" variant="bodyLarge" {...props} />
);

export const BodyMedium: React.FC<VariantTypographyProps> = (props) => (
  <Typography data-rc="BodyMedium" variant="bodyMedium" {...props} />
);

export const BodySmallB: React.FC<VariantTypographyProps> = (props) => (
  <Typography data-rc="BodySmallB" variant="bodySmallB" {...props} />
);

export const BodySmallH: React.FC<VariantTypographyProps> = (props) => (
  <Typography data-rc="BodySmallH" variant="bodySmallH" {...props} />
);

export const BodySmallL: React.FC<VariantTypographyProps> = (props) => (
  <Typography data-rc="BodySmallL" variant="bodySmallL" {...props} />
);

export const BodySmallM: React.FC<VariantTypographyProps> = (props) => (
  <Typography data-rc="BodySmallM" variant="bodySmallM" {...props} />
);

export const BodySmallR: React.FC<VariantTypographyProps> = (props) => (
  <Typography data-rc="BodySmallR" variant="bodySmallR" {...props} />
);

export const CaptionB: React.FC<VariantTypographyProps> = (props) => (
  <Typography data-rc="CaptionB" variant="captionB" {...props} />
);

export const CaptionL: React.FC<VariantTypographyProps> = (props) => (
  <Typography data-rc="CaptionL" variant="captionL" {...props} />
);

export const CaptionM: React.FC<VariantTypographyProps> = (props) => (
  <Typography data-rc="CaptionM" variant="captionM" {...props} />
);

export const CaptionR: React.FC<VariantTypographyProps> = (props) => (
  <Typography data-rc="CaptionR" variant="captionR" {...props} />
);

export const Category: React.FC<VariantTypographyProps> = (props) => (
  <Typography data-rc="Category" variant="category" {...props} />
);

export const DisclaimerB: React.FC<VariantTypographyProps> = (props) => (
  <Typography data-rc="DisclaimerB" variant="disclaimerB" {...props} />
);

export const DisclaimerL: React.FC<VariantTypographyProps> = (props) => (
  <Typography data-rc="DisclaimerL" variant="disclaimerL" {...props} />
);

export const DisclaimerM: React.FC<VariantTypographyProps> = (props) => (
  <Typography data-rc="DisclaimerM" variant="disclaimerM" {...props} />
);

export const DisclaimerR: React.FC<VariantTypographyProps> = (props) => (
  <Typography data-rc="DisclaimerR" variant="disclaimerR" {...props} />
);

export const Display1: React.FC<VariantTypographyProps> = (props) => (
  <Typography data-rc="Display1" variant="display1" {...props} />
);

export const Display2: React.FC<VariantTypographyProps> = (props) => (
  <Typography data-rc="Display2" variant="display2" {...props} />
);

export const Display3: React.FC<VariantTypographyProps> = (props) => (
  <Typography data-rc="Display3" variant="display3" {...props} />
);

export const Display4: React.FC<VariantTypographyProps> = (props) => (
  <Typography data-rc="Display4" variant="display4" {...props} />
);

export const Heading1: React.FC<VariantTypographyProps> = (props) => (
  <Typography data-rc="Heading1" as="h1" variant="heading1" {...props} />
);

export const Heading2: React.FC<VariantTypographyProps> = (props) => (
  <Typography data-rc="Heading2" as="h2" variant="heading2" {...props} />
);

export const Heading2El: React.FC<VariantTypographyProps> = (props) => (
  <Typography data-rc="Heading2El" as="h2" variant="heading2El" {...props} />
);

export const Heading3: React.FC<VariantTypographyProps> = (props) => (
  <Typography data-rc="Heading3" as="h3" variant="heading3" {...props} />
);

export const Heading3El: React.FC<VariantTypographyProps> = (props) => (
  <Typography data-rc="Heading3El" as="h3" variant="heading3El" {...props} />
);

export const Heading4: React.FC<VariantTypographyProps> = (props) => (
  <Typography data-rc="Heading4" as="h4" variant="heading4" {...props} />
);
