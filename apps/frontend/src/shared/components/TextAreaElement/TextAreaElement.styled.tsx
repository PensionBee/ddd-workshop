import { theme } from "@shared/styling/theme";
import styled from "styled-components";

export const StyledTextAreaElement = styled.textarea`
  padding: 11px 16px;
  width: 100%;
  min-height: 116px;
  &::placeholder {
    color: ${() => theme.colors.grey2};
  }
`;
