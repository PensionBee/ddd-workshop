import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { theme } from "@shared/styling/theme";
import styled, { css } from "styled-components";

export type StyledSwitchProps = {
  $error?: string;
};

export const StyledToggleButton = styled(
  CheckboxPrimitive.Checkbox
)<StyledSwitchProps>`
  cursor: pointer;
  position: relative;
  width: 38px;
  height: 24px;
  border-radius: 40px;
  transition: background-color 200ms ease;
  &:focus {
    outline: 2px solid ${() => theme.colors.yellow};
  }
  &[aria-disabled="true"] {
    opacity: 0.4;
    cursor: not-allowed;
  }
  &[aria-checked="true"] {
    background-color: ${() => theme.colors.teal100};
  }
  &[aria-checked="false"] {
    background-color: ${() => theme.colors.grey4};
  }
  &::after {
    content: "";
    position: absolute;
    min-width: 22px;
    min-height: 22px;
    border-radius: 40px;
    background-color: white;
    top: 1px;
  }
  &[aria-checked="true"]::after {
    left: 15px;
    right: 1px;
    transition: left 200ms ease 100ms, right 200ms ease;
  }
  &[aria-checked="false"]::after {
    left: 1px;
    right: 15px;
    transition: left 200ms ease, right 200ms ease 100ms;
  }
  ${({ $error }) =>
    $error &&
    css`
      outline: 2px solid ${() => theme.colors.red100};
    `}
  & + input {
    display: none;
  }
`;
