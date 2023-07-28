import { theme } from "@shared/styling/theme";
import styled, { css } from "styled-components";
import {
  enterFromLeft,
  enterFromRight,
  exitToLeft,
  exitToRight,
} from "../../Nav.styled";

export const StyledListItem = styled("li")``;

export const StyledNavLink = styled.a`
  width: 100%;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: space-between;
  padding: 16px 28px;
`;

export const StyledSubNav = styled.div``;

export const StyledSubButtonStyles = css`
  width: 100%;
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 16px 28px;
`;

export const StyledSubTriggerButton = styled.button`
  ${() => StyledSubButtonStyles}
  justify-content: space-between;
`;

export const StyledSubBackButton = styled.button`
  ${() => StyledSubButtonStyles}
  justify-content: flex-start;
  column-gap: 10px;
  border-bottom: 1px solid ${() => theme.colors.grey5};
`;

export const StyledSubContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  overflow: scroll;
  animation-duration: 250ms;
  animation-timing-function: ease;
  transform-origin: top center;
  width: 100%;
  background-color: white;
  overflow: hidden;
  @media only screen and (min-width: 600px) {
    width: auto;
  }
  &[data-motion="from-start"] {
    animation-name: ${enterFromLeft};
  }
  &[data-motion="from-end"] {
    animation-name: ${enterFromRight};
  }
  &[data-motion="to-start"] {
    animation-name: ${exitToLeft};
  }
  &[data-motion="to-end"] {
    animation-name: ${exitToRight};
  }
`;
