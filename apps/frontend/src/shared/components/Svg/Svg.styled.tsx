import styled, { css } from "styled-components";
import * as styledHelpers from "@shared/styling/styledComponentHelpers";
import type { BreakpointValues } from "@shared/utils/types";
import type { SVGColors } from "./Svg.types";
import { theme } from "@shared/styling/theme";
import type {
  MediaHeightType,
  MediaMarginType,
  MediaPaddingType,
  MediaWidthType,
  MediaZIndex,
} from "@shared/styling/styledComponentHelpers";

export type StyledSvgProps = {
  $fill?: SVGColors;
  $rotate?: number;
  $h: BreakpointValues<MediaHeightType>;
  $hMin: BreakpointValues<MediaHeightType>;
  $hMax: BreakpointValues<MediaHeightType>;
  $w: BreakpointValues<MediaWidthType>;
  $wMax: BreakpointValues<MediaWidthType>;
  $wMin: BreakpointValues<MediaWidthType>;
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
  $z: BreakpointValues<MediaZIndex>;
};

export const StyledSvg = styled.span<StyledSvgProps>`
  display: flex;
  svg {
    ${({ $fill }) =>
      $fill &&
      css`
        path {
          fill: ${theme.colors[$fill]};
        }
      `}
    ${({ $rotate }) =>
      $rotate &&
      css`
        transform: rotate(${$rotate}deg);
      `}
    ${(props) =>
      styledHelpers.createMediaStyles(
        (breakpoint) => css`
          ${styledHelpers.mediaHeight(breakpoint, props.$h)}
          ${styledHelpers.mediaMaxHeight(breakpoint, props.$hMax)}
          ${styledHelpers.mediaMinHeight(breakpoint, props.$hMin)}
          ${styledHelpers.mediaWidth(breakpoint, props.$w)}
          ${styledHelpers.mediaMaxWidth(breakpoint, props.$wMax)}
          ${styledHelpers.mediaMinWidth(breakpoint, props.$wMin)}
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
          ${styledHelpers.mediaZIndex(breakpoint, props.$z)}
        `
      )}
  }
`;
