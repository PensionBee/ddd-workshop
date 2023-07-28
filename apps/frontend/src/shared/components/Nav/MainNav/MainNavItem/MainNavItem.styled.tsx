import styled, { css } from "styled-components";
import { scaleIn, scaleOut } from "../../Nav.styled";
import { LargeSystemIcon } from "../../../Svg/Svg";
import { theme } from "@shared/styling/theme";

type StyledItemProps = {
  $isTabMenu?: boolean;
};

const tabLinkStyles = css`
  display: flex;
  margin-bottom: 20px;
  color: ${() => theme.colors.grey1};
  &:hover,
  &:focus-visible {
    color: ${() => theme.colors.black};
  }
  &:focus-visible {
    outline: 3px solid ${() => theme.colors.blue100};
  }
`;

type StyledTriggerProps = React.HTMLProps<HTMLButtonElement> & StyledItemProps;

export const StyledTrigger = styled.button<StyledTriggerProps>`
  ${({ $isTabMenu }) => $isTabMenu && tabLinkStyles}
  cursor: pointer;
  user-select: none;
  transition: color 200ms ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  color: ${() => theme.colors.black};
  &:hover,
  &:focus-visible {
    color: ${() => theme.colors.grey1};
  }
  &:focus-visible {
    outline: 3px solid ${() => theme.colors.blue100};
    border-radius: 4px;
  }
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

export type StyledLinkProps = StyledItemProps & {
  $isHighlighted?: boolean;
};

export const StyledLink = styled.a<StyledLinkProps>`
  ${({ $isTabMenu }) => $isTabMenu && tabLinkStyles}
  display: flex;
  transition: color 200ms ease;
  color: ${() => theme.colors.black};
  &:hover,
  &:focus-visible {
    color: ${() => theme.colors.grey1};
  }
  &:focus-visible {
    outline: 3px solid ${() => theme.colors.blue100};
    border-radius: 4px;
  }
  ${({ $isHighlighted }) =>
    $isHighlighted &&
    css`
      color: ${() => theme.colors.black};
      &::after {
        content: "";
        border-bottom: 1px solid ${theme.colors.yellow};
        width: 100%;
        position: absolute;
        bottom: 0;
        margin-bottom: -1px;
      }
    `}
`;

export const StyledContent = styled.div`
  position: absolute;
  top: 26px;
  left: -20px;
  animation-duration: 250ms;
  animation-timing-function: ease;
  transform-origin: top center;
  margin-top: 8px;
  width: 100%;
  background-color: white;
  overflow: hidden;
  box-shadow: 0px 5px 15px 0px rgb(0 0 0 / 18%);
  border-radius: 8px;
  transition: width, height, 300ms ease;
  @media only screen and (min-width: 600px) {
    width: auto;
  }
  &[data-state="open"] {
    animation: ${scaleIn} 200ms ease;
  }
  &[data-state="closed"] {
    animation: ${scaleOut} 200ms ease;
  }
`;

export const StyledItem = styled.li`
  position: relative;
`;
