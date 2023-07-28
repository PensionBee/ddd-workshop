import { css } from "styled-components";
import { createMediaValue } from "./createMediaValue";

export type MediaMarginType = number | "auto" | string;

const getMargin = (value?: MediaMarginType) => {
  if (typeof value === "string") return value;
  return `${value}px`;
};

export const mediaMargin = createMediaValue((value: MediaMarginType) => {
  return css({ margin: getMargin(value) });
});
export const mediaMarginX = createMediaValue((value: MediaMarginType) => {
  return css({
    marginLeft: getMargin(value),
    marginRight: getMargin(value),
  });
});
export const mediaMarginY = createMediaValue((value: MediaMarginType) => {
  return css({
    marginTop: getMargin(value),
    marginBottom: getMargin(value),
  });
});
export const mediaMarginBottom = createMediaValue((value: MediaMarginType) => {
  return css({ marginBottom: getMargin(value) });
});
export const mediaMarginLeft = createMediaValue((value: MediaMarginType) => {
  return css({ marginLeft: getMargin(value) });
});
export const mediaMarginRight = createMediaValue((value: MediaMarginType) => {
  return css({ marginRight: getMargin(value) });
});
export const mediaMarginTop = createMediaValue((value: MediaMarginType) => {
  return css({ marginTop: getMargin(value) });
});
