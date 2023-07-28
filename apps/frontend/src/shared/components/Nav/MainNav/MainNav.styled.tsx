import styled, { css } from "styled-components";
import { mediaFrom } from "@shared/styling/mediaQueries";
import { theme } from "@shared/styling/theme";

export type StyledMenuProps = {
  $borderBottom?: boolean;
};

export const StyledMenu = styled.div<StyledMenuProps>`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  z-index: 1;
  ${({ $borderBottom }) =>
    $borderBottom &&
    css`
      border-bottom: 1px solid ${theme.colors.grey4};
      justify-content: flex-start;
    `}
`;

export type StyledListProps = {
  $colGapLarge: number;
};

export const StyledList = styled.ul<StyledListProps>`
  column-gap: 20px;
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
  flex-wrap: wrap;
  ${mediaFrom.lg} {
    column-gap: ${({ $colGapLarge }) => $colGapLarge}px;
  }
`;
