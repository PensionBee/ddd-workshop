import { theme } from "@shared/styling/theme";
import styled, { css } from "styled-components";
import {
  enterFromLeft,
  enterFromRight,
  exitToLeft,
  exitToRight,
} from "../../Nav.styled";

type StyledListItemProps = {
  $isHighlighted?: boolean;
};

export const StyledListItem = styled.li<StyledListItemProps>`
  &:hover {
    background-color: ${() => theme.colors.grey6};
  }
  ${({ $isHighlighted }) =>
    $isHighlighted &&
    css`
      background-color: ${() => theme.colors.grey6};
    `}
`;

export const StyledNavLink = styled.a`
  width: 100%;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: space-between;
  padding: 16px 28px;
  &:focus-visible {
    outline: 3px solid ${() => theme.colors.blue100};
  }
`;

export const StyledSubNav = styled.div``;

export const StyledSubButtonStyles = css`
  width: 100%;
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 16px 28px;
  &:focus-visible {
    outline: 3px solid ${() => theme.colors.blue100};
  }
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
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  animation-duration: 250ms;
  animation-timing-function: ease;
  transform-origin: top center;
  background-color: white;
  overflow: hidden;
  box-shadow: 0px 5px 15px 0px rgb(0 0 0 / 18%);
  border-radius: 8px;
  transition: width, height, 300ms ease;
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
