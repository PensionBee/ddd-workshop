import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { theme } from "@shared/styling/theme";
import styled, { css } from "styled-components";
import { ComponentIcon } from "../Svg/Svg";

export type StyledCheckboxButtonProps = {
  $variant: "square" | "circle";
  $error?: string;
};

export const StyledCheckboxButton = styled(
  CheckboxPrimitive.Root
)<StyledCheckboxButtonProps>`
  position: relative;
  cursor: pointer;
  width: 22px;
  height: 22px;
  overflow: unset;
  border-radius: 4px;
  border: 2px solid ${() => theme.colors.grey3};
  &:focus,
  button:focus & {
    outline: 2px solid ${() => theme.colors.yellow};
  }
  background-color: white;
  &[aria-disabled="true"] {
    opacity: 0.4;
    cursor: not-allowed;
  }
  ${({ $error }) =>
    $error &&
    css`
      outline: 2px solid ${() => theme.colors.red100};
    `}
  ${({ $variant }) =>
    $variant === "circle" &&
    css`
      width: 23px;
      height: 23px;
      border-radius: 50%;
    `}
  & + input {
    display: none;
  }
`;

export const StyledIcon = styled(CheckboxPrimitive.Indicator)`
  display: flex;
`;

const Check = (
  props: Omit<React.ComponentProps<typeof ComponentIcon>, "icon">
) => <ComponentIcon icon="Check" {...props} />;

export const StyledCheckmark = styled(Check)<StyledCheckboxButtonProps>`
  position: absolute;
  bottom: 0px;
  left: 0px;
  [aria-pressed="true"] & path {
    fill: ${() => theme.colors.teal100};
  }
  [aria-pressed="false"] & path {
    fill: transparent;
  }
  ${({ $variant }) =>
    $variant === "circle" &&
    css`
      bottom: 1px;
      left: 1px;
    `}
`;
