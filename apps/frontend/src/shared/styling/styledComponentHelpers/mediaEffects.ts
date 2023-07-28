import { css } from "styled-components";
import { createMediaValue } from "./createMediaValue";

export type MediaBoxShadowType = string;
export type MediaOpacityType = number;

export const mediaBoxShadow = createMediaValue((value: MediaBoxShadowType) => {
  return css({ boxShadow: value });
});
export const mediaOpacity = createMediaValue((value: MediaOpacityType) => {
  return css({ opacity: value });
});
