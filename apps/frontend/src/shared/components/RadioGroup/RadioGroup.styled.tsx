import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import React from "react";
import styled, { css } from "styled-components";
import { ComponentIcon } from "../Svg/Svg";
import { theme } from "@shared/styling/theme";

export const StyledRadioLabel = styled(RadioGroupPrimitive.Item)`
  display: flex;
  align-items: center;
  padding: 28px 36px 28px 16px;
  gap: 16px;
  background-color: ${() => theme.colors.grey5};
  border-radius: 4px;
  min-width: 156px;
  width: 100%;
  cursor: pointer;
  & + input {
    display: none;
  }
`;

export type StyledCheckboxButtonProps = {
  $variant: "square" | "circle";
  $error?: string;
};

export const StyledCheckboxButton = styled.div<StyledCheckboxButtonProps>`
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
`;

export const StyledIcon = styled(RadioGroupPrimitive.Indicator)`
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

export const StyledRadioGroup = styled(RadioGroupPrimitive.Root)`
  display: flex;
  column-gap: 15px;
  justify-content: center;
`;
