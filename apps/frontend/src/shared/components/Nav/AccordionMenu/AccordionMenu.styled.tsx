import styled from "styled-components";
import { mediaFrom } from "@shared/styling/mediaQueries";
import { LargeSystemIcon } from "../../Svg/Svg";
import { theme } from "@shared/styling/theme";

export const StyledAccordionButton = styled.button`
  width: 100%;
  cursor: pointer;
  border-radius: 4px;
  &:focus-visible {
    outline: 3px solid ${() => theme.colors.blue100};
  }
`;

export const StyledMenuList = styled.ul`
  width: 100%;
`;

export const StyledCaret = styled(LargeSystemIcon)`
  position: relative;
  top: 1;
  transform: rotate(-180deg);
  transition: transform 250ms ease;
  [data-state="open"] & {
    transform: rotate(0deg);
  }
`;

export const StyledMenuItem = styled.li`
  width: 100%;
  > a,
  > button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 10px;
    padding-top: 14px;
    padding-bottom: 14px;
    border-bottom: 1px solid ${() => theme.colors.grey4};
  }
  ul {
    ${mediaFrom.md} {
      padding-left: 40px;
    }
  }
`;
