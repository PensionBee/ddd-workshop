import { theme } from "@shared/styling/theme";
import styled, { css } from "styled-components";

export type StyledModalWrapperProps = {
  $fullPage?: boolean;
};

export const StyledModalWrapper = styled.dialog<StyledModalWrapperProps>`
  overflow-y: scroll;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  display: none;
  &[open] {
    display: flex;
  }
  &::backdrop,
  // Polyfill uses .backdrop component rather than pseudo element
  & + .backdrop {
    background-color: ${() => theme.colors.black};
    opacity: 0.7;
  }
  ${({ $fullPage }) => {
    if ($fullPage) return fullPageModalStyles;
    return regularModalStyles;
  }}
`;

const regularModalStyles = css`
  max-height: 100%;
  align-items: center;
`;

const fullPageModalStyles = css`
  width: 100vw;
`;

export type StyledCloseButtonProps = {
  $fullPage?: StyledModalWrapperProps["$fullPage"];
};

export const StyledCloseButton = styled.button<StyledCloseButtonProps>`
  cursor: pointer;
  position: absolute;
  border-radius: 4px;
  &:focus-visible {
    outline: 3px solid ${() => theme.colors.blue100};
  }
  ${({ $fullPage }) => {
    if ($fullPage) return fullPageCloseButtonStyles;
    return regularCloseButtonStyles;
  }}
`;

const regularCloseButtonStyles = css`
  top: 24px;
  right: 24px;
`;

const fullPageCloseButtonStyles = css`
  top: 30px;
  right: 30px;
  @media only screen and (min-width: 600px) {
    top: 50px;
    right: 50px;
  }
  @media only screen and (min-width: 1025px) {
    top: 60px;
    right: 80px;
  }
`;
