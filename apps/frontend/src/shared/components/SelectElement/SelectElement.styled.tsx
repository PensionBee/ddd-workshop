import styled from "styled-components";

import { default as ChevronDown } from "@assets/icons/large-system-icons/chevron-down.svg";
import { theme } from "@shared/styling/theme";

export const StyledSelectElement = styled.select`
  padding: 11px 16px;
  width: 100%;
  background-image: url(${ChevronDown});
  background-position: right 16px center;
  background-repeat: no-repeat;
  &::placeholder {
    color: ${() => theme.colors.grey2};
  }
`;
