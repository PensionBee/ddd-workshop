import styled, { css } from "styled-components";
import type { BreakpointValues } from "@shared/utils/types";
import * as typography from "@shared/styling/typography";
import * as styledHelpers from "@shared/styling/styledComponentHelpers";
import type { TypographyVariants } from "./Typography.types";
import type {
  MediaMarginType,
  MediaTextAlign,
  MediaTextColors,
  MediaTextNoWrapType,
} from "@shared/styling/styledComponentHelpers";

type StyledTypographyProps = {
  $align: BreakpointValues<MediaTextAlign>;
  $color: BreakpointValues<MediaTextColors>;
  $nowrap: BreakpointValues<MediaTextNoWrapType>;
  $variant: TypographyVariants;
  $mb: BreakpointValues<MediaMarginType>;
  $mt: BreakpointValues<MediaMarginType>;
};

export const StyledTypography = styled.span<StyledTypographyProps>`
  ${({ $variant }) => typography[$variant]};
  ${(props) =>
    styledHelpers.createMediaStyles(
      (breakpoint) => css`
        ${styledHelpers.mediaTextColor(breakpoint, props.$color)}
        ${styledHelpers.mediaMarginBottom(breakpoint, props.$mb)}
        ${styledHelpers.mediaMarginTop(breakpoint, props.$mt)}
        ${styledHelpers.mediaTextAlign(breakpoint, props.$align)}
        ${styledHelpers.mediaTextNoWrap(breakpoint, props.$nowrap)}
      `
    )}
`;
