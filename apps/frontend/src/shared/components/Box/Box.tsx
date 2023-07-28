import type { ValueOrBreakpointValues } from "@shared/utils/types";
import { asBreakpointObject } from "@shared/utils/asBreakpointObject";
import type { ThemeColors, ThemeGradients } from "@shared/styling/theme";
import { StyledBox } from "./Box.styled";
import React from "react";
import type {
  MediaAlignType,
  MediaBorderRadiusType,
  MediaBorderStyleType,
  MediaBorderType,
  MediaBoxShadowType,
  MediaCursorType,
  MediaDirectionType,
  MediaDisplayType,
  MediaFlexItemOrderType,
  MediaFlexType,
  MediaGapType,
  MediaHeightType,
  MediaJustifyType,
  MediaMarginType,
  MediaNoWrapType,
  MediaOpacityType,
  MediaOverflowType,
  MediaPaddingType,
  MediaPositionType,
  MediaPositionValue,
  MediaWidthType,
  MediaZIndex,
} from "@shared/styling/styledComponentHelpers";

type BoxLayoutProps = {
  /** Display option */
  d?: ValueOrBreakpointValues<MediaDisplayType>;
  /** Height */
  h?: ValueOrBreakpointValues<MediaHeightType>;
  /** Maximum height */
  hMax?: ValueOrBreakpointValues<MediaHeightType>;
  /** Minimum height */
  hMin?: ValueOrBreakpointValues<MediaHeightType>;
  /** Overflow */
  overflow?: ValueOrBreakpointValues<MediaOverflowType>;
  /** Horizontal overflow */
  overflowX?: ValueOrBreakpointValues<MediaOverflowType>;
  /** Vertical overflow */
  overflowY?: ValueOrBreakpointValues<MediaOverflowType>;
  /** Width */
  w?: ValueOrBreakpointValues<MediaWidthType>;
  /** Maximum width */
  wMax?: ValueOrBreakpointValues<MediaWidthType>;
  /** Minimum width */
  wMin?: ValueOrBreakpointValues<MediaWidthType>;
};

type BoxFlexProps = {
  /** Flexbox secondary dimension item alignment */
  align?: ValueOrBreakpointValues<MediaAlignType>;
  /** Vertical space between elements */
  colGap?: ValueOrBreakpointValues<MediaGapType>;
  /** Flex direction */
  direction?: ValueOrBreakpointValues<MediaDirectionType>;
  /** Flex options */
  flex?: ValueOrBreakpointValues<MediaFlexType>;
  /** Flexbox primary dimension item alignment */
  justify?: ValueOrBreakpointValues<MediaJustifyType>;
  /** If wrap should be disabled */
  nowrap?: ValueOrBreakpointValues<MediaNoWrapType>;
  /** Horizontal space between elements */
  rowGap?: ValueOrBreakpointValues<MediaGapType>;
  /** Flex item order, if applicable [default = 0],  */
  flexItemOrder?: ValueOrBreakpointValues<MediaFlexItemOrderType>;
};

type BoxSpaceProps = {
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
};

type BoxPositionProps = {
  /** Bottom position offset */
  bottom?: ValueOrBreakpointValues<MediaPositionValue>;
  /** Left position offset */
  left?: ValueOrBreakpointValues<MediaPositionValue>;
  /** Position */
  position?: ValueOrBreakpointValues<MediaPositionType>;
  /** Right position offset */
  right?: ValueOrBreakpointValues<MediaPositionValue>;
  /** Top position offset */
  top?: ValueOrBreakpointValues<MediaPositionValue>;
  /** Z Index */
  z?: ValueOrBreakpointValues<MediaZIndex>;
};

type BoxStyleEffectProps = {
  /** Background color */
  backgroundColor?: ThemeColors;
  /** Background gradient */
  backgroundGradient?: ThemeGradients;
  /** Border color */
  borderColor?: ThemeColors;
  /** Border in px */
  border?: ValueOrBreakpointValues<MediaBorderType>;
  /** Border bottom in px */
  borderBottom?: ValueOrBreakpointValues<MediaBorderType>;
  /** Border left in px */
  borderLeft?: ValueOrBreakpointValues<MediaBorderType>;
  /** Border right in px */
  borderRight?: ValueOrBreakpointValues<MediaBorderType>;
  /** Border top in px */
  borderTop?: ValueOrBreakpointValues<MediaBorderType>;
  /** Border radius in px */
  borderRadius?: ValueOrBreakpointValues<MediaBorderRadiusType>;
  /** Border style */
  borderStyle?: ValueOrBreakpointValues<MediaBorderStyleType>; //keyof typeof theme.borderStyle;
  /** box shadow definition */
  boxShadow?: ValueOrBreakpointValues<MediaBoxShadowType>;
  /** Opacity */
  opacity?: ValueOrBreakpointValues<MediaOpacityType>;
};

type BoxAnimationProps = {
  /** Transition definition */
  transition?: string;
};

type BoxActionProps = {
  /** Cursor type */
  cursor?: MediaCursorType;
  /** for property used by labels */
  htmlFor?: string;
};

export type BoxProps = BoxLayoutProps &
  BoxFlexProps &
  BoxSpaceProps &
  BoxPositionProps &
  BoxStyleEffectProps &
  BoxAnimationProps &
  BoxActionProps & {
    /** React children */
    children?: React.ReactNode;
    /** Element to render as */
    as?: React.ElementType;
  };

export const Box = React.forwardRef<HTMLElement, BoxProps>(
  (
    {
      children,
      as = "div",
      // Layout props
      d,
      h,
      hMax,
      hMin,
      overflow,
      overflowX,
      overflowY,
      w,
      wMax,
      wMin,
      // Flex container props
      align,
      colGap,
      direction,
      flex,
      justify,
      nowrap = false,
      rowGap,
      // Flex item props
      flexItemOrder,
      // Space props
      m,
      mb,
      ml,
      mr,
      mt,
      mx,
      my,
      p,
      pb,
      pl,
      pr,
      pt,
      px,
      py,
      // Position props
      bottom,
      left,
      position,
      right,
      top,
      z,
      // Style / effect props
      backgroundColor,
      backgroundGradient,
      border = 0,
      borderStyle = "solid",
      borderRadius,
      borderBottom,
      borderColor,
      borderLeft,
      borderRight,
      borderTop,
      boxShadow,
      opacity,
      // Animation props
      transition,
      // Action props
      cursor,
      ...props
    },
    ref
  ) => {
    const styledProps = {
      as: as,
      // Layout props
      $d: asBreakpointObject(d),
      $h: asBreakpointObject(h),
      $hMax: asBreakpointObject(hMax),
      $hMin: asBreakpointObject(hMin),
      $overflow: asBreakpointObject(overflow),
      $overflowX: asBreakpointObject(overflowX),
      $overflowY: asBreakpointObject(overflowY),
      $w: asBreakpointObject(w),
      $wMax: asBreakpointObject(wMax),
      $wMin: asBreakpointObject(wMin),
      // Flex container props
      $align: asBreakpointObject(align),
      $colGap: asBreakpointObject(colGap),
      $direction: asBreakpointObject(direction),
      $flex: asBreakpointObject(flex),
      $justify: asBreakpointObject(justify),
      $nowrap: asBreakpointObject(nowrap),
      $rowGap: asBreakpointObject(rowGap),
      // Flex item props
      $flexItemOrder: asBreakpointObject(flexItemOrder),
      // Space props
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
      // Position props
      $bottom: asBreakpointObject(bottom),
      $left: asBreakpointObject(left),
      $position: asBreakpointObject(position),
      $right: asBreakpointObject(right),
      $top: asBreakpointObject(top),
      $z: asBreakpointObject(z),
      // Style / effect props
      $backgroundColor: backgroundColor,
      $backgroundGradient: backgroundGradient,
      $borderColor: borderColor,
      $borderStyle: asBreakpointObject(borderStyle),
      $borderRadius: asBreakpointObject(borderRadius),
      $border: asBreakpointObject(border),
      $borderBottom: asBreakpointObject(borderBottom),
      $borderLeft: asBreakpointObject(borderLeft),
      $borderRight: asBreakpointObject(borderRight),
      $borderTop: asBreakpointObject(borderTop),
      $boxShadow: asBreakpointObject(boxShadow),
      $opacity: asBreakpointObject(opacity),
      // Animation props
      $transition: transition,
      // Action props
      $cursor: asBreakpointObject(cursor),
      $isClickable: as === "button" || as === "a",
    };
    return (
      <StyledBox ref={ref} {...styledProps} {...props}>
        {children}
      </StyledBox>
    );
  }
);

Box.displayName = "Box";
