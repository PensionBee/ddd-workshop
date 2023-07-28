import styled from "styled-components";
import { Box } from "@shared/components/Box";
import { StyledErrorMessage } from "./ErrorMessage/ErrorMessage.styled";

export const StyledFieldContainer = styled(Box)`
  margin-bottom: 36px;
  &:focus-within {
    ${StyledErrorMessage} {
      display: none;
    }
  }
`;
