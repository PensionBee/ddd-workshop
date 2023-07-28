import { Box } from "@shared/components/Box";
import { theme } from "@shared/styling/theme";
import styled, { css } from "styled-components";

const errorMessageArrowStyles = css`
  content: "";
  position: absolute;
  top: -10px;
  left: 16px;
  border: 5px solid transparent;
  border-bottom-color: ${() => theme.colors.red100};
`;

export const StyledErrorMessage = styled(Box)`
  &:before {
    ${errorMessageArrowStyles}
  }
`;
