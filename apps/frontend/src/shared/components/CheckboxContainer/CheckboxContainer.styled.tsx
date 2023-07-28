import { theme } from "@shared/styling/theme";
import styled from "styled-components";

export const StyledCheckboxContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: start;
  column-gap: 20px;
`;

export const StyledCheckboxContainerError = styled.div`
  background-color: ${() => theme.colors.red100};
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-top: 15px;
  width: 100%;
`;
