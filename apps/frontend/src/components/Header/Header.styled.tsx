import styled from "styled-components";
import { theme } from "../../shared/styling/theme";

export const StyledHeader = styled.header`
  position: fixed;
  width: 100%;
  z-index: 99;
  background-color: ${theme.colors.white};
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2)
`;
