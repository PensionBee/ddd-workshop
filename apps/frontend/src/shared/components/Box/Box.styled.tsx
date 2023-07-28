import type React from "react";
import styled, { css } from "styled-components";
import * as styledHelpers from "@shared/styling/styledComponentHelpers";
import type { ThemeColors, ThemeGradients } from "@shared/styling/theme";
import { theme } from "@shared/styling/theme";
import type { BreakpointValues } from "@shared/utils/types";
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

export type StyledBoxProps = {
  as: React.ElementType;
  // Layout props
  $d: BreakpointValues<MediaDisplayType>;
  $h: BreakpointValues<MediaHeightType>;
  $hMin: BreakpointValues<MediaHeightType>;
  $hMax: BreakpointValues<MediaHeightType>;
  $overflow: BreakpointValues<MediaOverflowType>;
  $overflowX: BreakpointValues<MediaOverflowType>;
  $overflowY: BreakpointValues<MediaOverflowType>;
  $w: BreakpointValues<MediaWidthType>;
  $wMax: BreakpointValues<MediaWidthType>;
  $wMin: BreakpointValues<MediaWidthType>;
  // Flex container props
  $align: BreakpointValues<MediaAlignType>;
  $colGap: BreakpointValues<MediaGapType>;
  $rowGap: BreakpointValues<MediaGapType>;
  $direction: BreakpointValues<MediaDirectionType>;
  $flex: BreakpointValues<MediaFlexType>;
  $justify: BreakpointValues<MediaJustifyType>;
  $nowrap: BreakpointValues<MediaNoWrapType>;
  // Flex item props
  $flexItemOrder: BreakpointValues<MediaFlexItemOrderType>;
  // Space props
  $m: BreakpointValues<MediaMarginType>;
  $mx: BreakpointValues<MediaMarginType>;
  $my: BreakpointValues<MediaMarginType>;
  $mb: BreakpointValues<MediaMarginType>;
  $ml: BreakpointValues<MediaMarginType>;
  $mr: BreakpointValues<MediaMarginType>;
  $mt: BreakpointValues<MediaMarginType>;
  $p: BreakpointValues<MediaPaddingType>;
  $px: BreakpointValues<MediaPaddingType>;
  $py: BreakpointValues<MediaPaddingType>;
  $pb: BreakpointValues<MediaPaddingType>;
  $pl: BreakpointValues<MediaPaddingType>;
  $pr: BreakpointValues<MediaPaddingType>;
  $pt: BreakpointValues<MediaPaddingType>;
  // Position props
  $position: BreakpointValues<MediaPositionType>;
  $bottom: BreakpointValues<MediaPositionValue>;
  $left: BreakpointValues<MediaPositionValue>;
  $right: BreakpointValues<MediaPositionValue>;
  $top: BreakpointValues<MediaPositionValue>;
  $z: BreakpointValues<MediaZIndex>;
  // Border props
  $backgroundColor: ThemeColors;
  $backgroundGradient?: ThemeGradients;
  $borderColor: ThemeColors;
  $border: BreakpointValues<MediaBorderType>;
  $borderBottom: BreakpointValues<MediaBorderType>;
  $borderLeft: BreakpointValues<MediaBorderType>;
  $borderRight: BreakpointValues<MediaBorderType>;
  $borderTop: BreakpointValues<MediaBorderType>;
  $borderStyle: BreakpointValues<MediaBorderStyleType>;
  $borderRadius: BreakpointValues<MediaBorderRadiusType>;
  // Effect props
  $boxShadow: BreakpointValues<MediaBoxShadowType>;
  $opacity: BreakpointValues<MediaOpacityType>;
  // Animation props
  $transition?: string;
  // Action props
  $cursor: BreakpointValues<MediaCursorType>;
  $isClickable: boolean;
};

export const StyledBox = styled.div<StyledBoxProps>`
  position: relative;
  box-sizing: border-box;
  ${({ $backgroundColor }) =>
    css`
      background-color: ${theme.colors[$backgroundColor]};
    `}
  ${({ $backgroundGradient }) =>
    $backgroundGradient &&
    css`
      background-image: linear-gradient(
        ${theme.gradients[$backgroundGradient].join(", ")}
      );
    `}
  border-color: ${({ $borderColor }) => theme.colors[$borderColor]};
  transition: ${({ $transition }) => $transition};
  ${({ $isClickable }) =>
    $isClickable &&
    css`
      cursor: pointer;
      outline: 3px solid transparent;
      &:hover {
        outline: 3px solid ${() => theme.colors.grey3};
      }
      &:focus-visible {
        outline: 3px solid ${() => theme.colors.blue100};
      }
    `}
  ${(props) =>
    styledHelpers.createMediaStyles(
      (breakpoint) => css`
        // Layout props
        ${styledHelpers.mediaDisplay(breakpoint, props.$d)}
        ${styledHelpers.mediaHeight(breakpoint, props.$h)}
        ${styledHelpers.mediaMaxHeight(breakpoint, props.$hMax)}
        ${styledHelpers.mediaMaxWidth(breakpoint, props.$wMax)}
        ${styledHelpers.mediaMinWidth(breakpoint, props.$wMin)}
        ${styledHelpers.mediaMinHeight(breakpoint, props.$hMin)}
        ${styledHelpers.mediaOverflow(breakpoint, props.$overflow)}
        ${styledHelpers.mediaOverflowX(breakpoint, props.$overflowX)}
        ${styledHelpers.mediaOverflowY(breakpoint, props.$overflowY)}
        ${styledHelpers.mediaWidth(breakpoint, props.$w)}
        ${styledHelpers.mediaMaxWidth(breakpoint, props.$wMax)}
        ${styledHelpers.mediaMinWidth(breakpoint, props.$wMin)}
        // Flex container props
        ${styledHelpers.mediaAlign(breakpoint, props.$align)}
        ${styledHelpers.mediaColGap(breakpoint, props.$colGap)}
        ${styledHelpers.mediaDirection(breakpoint, props.$direction)}
        ${styledHelpers.mediaFlex(breakpoint, props.$flex)}
        ${styledHelpers.mediaJustify(breakpoint, props.$justify)}
        ${styledHelpers.mediaNoWrap(breakpoint, props.$nowrap)}
        ${styledHelpers.mediaRowGap(breakpoint, props.$rowGap)}
        // Flex item props
        ${styledHelpers.mediaFlexItemOrder(breakpoint, props.$flexItemOrder)}
        // Space props
        ${styledHelpers.mediaMargin(breakpoint, props.$m)}
        ${styledHelpers.mediaMarginX(breakpoint, props.$mx)}
        ${styledHelpers.mediaMarginY(breakpoint, props.$my)}
        ${styledHelpers.mediaMarginBottom(breakpoint, props.$mb)}
        ${styledHelpers.mediaMarginLeft(breakpoint, props.$ml)}
        ${styledHelpers.mediaMarginRight(breakpoint, props.$mr)}
        ${styledHelpers.mediaMarginTop(breakpoint, props.$mt)}
        ${styledHelpers.mediaPadding(breakpoint, props.$p)}
        ${styledHelpers.mediaPaddingX(breakpoint, props.$px)}
        ${styledHelpers.mediaPaddingY(breakpoint, props.$py)}
        ${styledHelpers.mediaPaddingBottom(breakpoint, props.$pb)}
        ${styledHelpers.mediaPaddingLeft(breakpoint, props.$pl)}
        ${styledHelpers.mediaPaddingRight(breakpoint, props.$pr)}
        ${styledHelpers.mediaPaddingTop(breakpoint, props.$pt)}
        // Position props
        ${styledHelpers.mediaBottom(breakpoint, props.$bottom)}
        ${styledHelpers.mediaLeft(breakpoint, props.$left)}
        ${styledHelpers.mediaPosition(breakpoint, props.$position)}
        ${styledHelpers.mediaRight(breakpoint, props.$right)}
        ${styledHelpers.mediaTop(breakpoint, props.$top)}
        ${styledHelpers.mediaZIndex(breakpoint, props.$z)}
        // Style / effect props
        ${styledHelpers.mediaBorder(breakpoint, props.$border)}
        ${styledHelpers.mediaBorderBottom(breakpoint, props.$borderBottom)}
        ${styledHelpers.mediaBorderLeft(breakpoint, props.$borderLeft)}
        ${styledHelpers.mediaBorderRight(breakpoint, props.$borderRight)}
        ${styledHelpers.mediaBorderTop(breakpoint, props.$borderTop)}
        ${styledHelpers.mediaBorderStyle(breakpoint, props.$borderStyle)}
        ${styledHelpers.mediaBorderRadius(breakpoint, props.$borderRadius)}
        ${styledHelpers.mediaBoxShadow(breakpoint, props.$boxShadow)}
        ${styledHelpers.mediaOpacity(breakpoint, props.$opacity)}
        // Action props
        ${styledHelpers.mediaCursor(breakpoint, props.$cursor)}
      `
    )}
`;
