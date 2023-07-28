import { theme } from "@shared/styling/theme";
import styled from "styled-components";

export type StyledLinkProps = {
  $color: "link" | "black";
  $noUnderline: boolean;
  $nowrap: boolean;
};

export const StyledLink = styled.a<StyledLinkProps>`
  cursor: pointer;
  transition: color 200ms ease;
  color: ${({ $color }) => theme.colors[$color]};
  white-space: ${({ $nowrap }) => ($nowrap ? "nowrap" : "normal")};
  text-decoration: ${({ $noUnderline }) =>
    $noUnderline ? "none" : "underline"};
  text-underline-position: under;
  text-underline-offset: 5%;
  &:hover,
  &:focus-visible {
    color: ${({ $color }) => {
      if ($color === "black") return theme.colors.grey1;
      return theme.colors.linkActive;
    }};
    text-decoration: none;
  }
  &:focus-visible {
    outline: 3px solid ${() => theme.colors.blue100};
    border-radius: 4px;
  }
`;
