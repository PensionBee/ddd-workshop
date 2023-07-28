import { theme } from "@shared/styling/theme";
import styled from "styled-components";

export const StyledInputElement = styled.input`
  padding: 11px 16px;
  width: 100%;
  &::placeholder {
    color: ${() => theme.colors.grey2};
  }
`;
