import { Box } from "@shared/components/Box";
import { theme } from "@shared/styling/theme";
import styled, { css } from "styled-components";

export type StyledFieldWrapperProps = {
  $isError?: boolean;
  $isDisabled?: boolean;
  $hasValue?: boolean;
  $hasFocusState?: boolean;
};

export const StyledFieldWrapper = styled.span<StyledFieldWrapperProps>`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: "nowrap";
  border: 2px solid ${() => theme.colors.grey3};
  background-color: ${() => theme.colors.grey8};
  border-radius: 4px;
  transition: border 0.2s ease, box-shadow 0.2s ease;
  &:hover {
    border: 2px solid ${() => theme.colors.grey2};
  }
  ${({ $isError }) =>
    $isError &&
    css`
      &,
      &:hover {
        border: 2px solid ${() => theme.colors.red100};
      }
    `}
  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      cursor: not-allowed;
      opacity: 0.5;
      &:hover {
        border: 2px solid ${() => theme.colors.grey3};
      }
    `}
  ${({ $hasValue }) =>
    $hasValue &&
    css`
      &,
      &:hover {
        border: 2px solid ${() => theme.colors.grey2};
      }
    `}
  ${({ $hasFocusState }) =>
    $hasFocusState &&
    css`
      &:focus-within {
        outline: 3px solid ${() => theme.colors.blue100};
      }
    `}
`;

export const StyledChildWrapper = styled(Box)``;
