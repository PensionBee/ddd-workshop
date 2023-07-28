import styled, { css } from "styled-components";
import type { MediaWidthType } from "@shared/styling/styledComponentHelpers";
import {
  createMediaStyles,
  mediaMaxWidth,
  mediaMinWidth,
  mediaWidth,
} from "@shared/styling/styledComponentHelpers";
import { bodySmallM } from "@shared/styling/typography";
import type { BreakpointValues } from "@shared/utils/types";
import type { ButtonVariant } from "./Button.types";
import { theme } from "@shared/styling/theme";

export type StyledButtonProps = {
  $variant: ButtonVariant;
  $w: BreakpointValues<MediaWidthType>;
  $wMax: BreakpointValues<MediaWidthType>;
  $wMin: BreakpointValues<MediaWidthType>;
};

export const StyledButton = styled.button<StyledButtonProps>`
  border-width: 0px;
  padding: 13px 28px;
  border-radius: 4px;
  text-align: center;
  color: ${() => theme.colors.black};
  width: fit-content;
  max-width: 100%;
  transition: color 250ms ease, background-color 250ms ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  &:focus-visible {
    outline: 3px solid ${() => theme.colors.blue100};
  }
  svg {
    vertical-align: middle;
    path {
      fill: ${() => theme.colors.black};
      transition: fill 250ms ease;
    }
  }
  span {
    vertical-align: middle;
  }
  [data-icon] {
    max-width: 20px;
    max-height: 20px;
    font-size: 0;
    display: flex;
  }
  &[disabled],
  &[disabled]:hover {
    background-color: ${() => theme.colors.grey4};
    color: ${() => theme.colors.grey2};
    cursor: not-allowed;
    svg path {
      fill: ${() => theme.colors.grey2};
    }
  }
  ${bodySmallM}
  ${({ $variant }) => $variant === "primary-yellow" && yellowStyles}
  ${({ $variant }) => $variant === "primary-black" && primaryBlackStyles}
  ${({ $variant }) => $variant === "secondary" && secondaryStyles}
  ${({ $variant }) => $variant === "tertiary" && tertiaryStyles}
  ${(props) =>
    createMediaStyles(
      (breakpoint) => css`
        ${mediaWidth(breakpoint, props.$w)}
        ${mediaMaxWidth(breakpoint, props.$wMax)}
        ${mediaMinWidth(breakpoint, props.$wMin)}
      `
    )}
`;

export const yellowStyles = css`
  background-color: ${() => theme.colors.yellow};
  &:hover {
    color: ${() => theme.colors.white};
    svg path {
      fill: ${() => theme.colors.white};
    }
    background-color: ${() => theme.colors.black};
  }
`;

export const primaryBlackStyles = css`
  background-color: ${() => theme.colors.black};
  color: ${() => theme.colors.white};
  svg path {
    fill: ${() => theme.colors.white};
  }
  &:hover {
    background-color: ${() => theme.colors.white};
    color: ${() => theme.colors.black};
    svg path {
      fill: ${() => theme.colors.black};
    }
  }
`;

export const secondaryStyles = css`
  background-color: ${() => theme.colors.white};
  color: ${() => theme.colors.black};
  border: 1px solid ${() => theme.colors.grey4};
  svg path {
    fill: ${() => theme.colors.black};
  }
  &:hover {
    background-color: ${() => theme.colors.grey7};
  }
  &[disabled],
  &[disabled]:hover {
    display: none;
  }
`;

export const tertiaryStyles = css`
  background-color: unset;
  color: ${() => theme.colors.link};
  svg path {
    fill: ${() => theme.colors.link};
  }
  &:hover {
    color: ${() => theme.colors.linkActive};
    svg path {
      fill: ${() => theme.colors.linkActive};
    }
  }
  &[disabled],
  &[disabled]:hover {
    display: none;
  }
`;
