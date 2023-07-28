import { theme } from "@shared/styling/theme";
import styled, { css } from "styled-components";
import { StyledImage } from "../Image/Image.styled";

export type StyledAvatarProps = {
  $isHighlighted: boolean;
  $h: number;
  $w: number;
};

export const StyledAvatar = styled.div<StyledAvatarProps>`
  border-radius: 50%;
  overflow: hidden;
  ${({ $h }) =>
    css`
      height: ${$h ? `${$h}px` : `100%`};
    `}
  ${({ $w }) =>
    css`
      width: ${$w ? `${$w}px` : `100%`};
    `}
  ${(props) => props.$isHighlighted === true && highlightedStyles}
`;

const highlightedStyles = css`
  background-color: ${() => theme.colors.yellow};
  ${StyledImage} {
    position: relative;
    margin-left: 2.5px;
    top: 5px;
  }
`;
