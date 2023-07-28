import styled, { css } from "styled-components";

export type StyledImageProps = {
  alt?: string;
  src: string;
  $blur?: boolean;
  $h?: number;
  $wMax?: number;
  $hMax?: number;
  $w?: number;
};

export const StyledImage = styled.img<StyledImageProps>`
  ${({ $blur }) =>
    $blur &&
    css`
      filter: blur(2px);
    `}
  ${({ $h }) =>
    css`
      height: ${$h ? `${$h}px` : `100%`};
    `}
  ${({ $hMax }) =>
    css`
      max-height: ${$hMax ? `${$hMax}px` : `100%`};
    `}
  ${({ $wMax }) =>
    css`
      max-width: ${$wMax ? `${$wMax}px` : `100%`};
    `}
  ${({ $w }) =>
    css`
      width: ${$w ? `${$w}px` : `100%`};
    `}
`;
