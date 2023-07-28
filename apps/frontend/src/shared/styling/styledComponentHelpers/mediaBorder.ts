import { css } from "styled-components";
import { createMediaValue } from "./createMediaValue";

export type MediaBorderType = number;
export type MediaBorderStyleType = "dotted" | "dashed" | "solid";
export type MediaBorderRadiusType = number;

export const mediaBorder = createMediaValue((value: MediaBorderType) => {
  return css({ borderWidth: `${value}px` });
});
export const mediaBorderBottom = createMediaValue((value: MediaBorderType) => {
  return css({ borderBottomWidth: `${value}px` });
});
export const mediaBorderLeft = createMediaValue((value: MediaBorderType) => {
  return css({ borderLeftWidth: `${value}px` });
});
export const mediaBorderRight = createMediaValue((value: MediaBorderType) => {
  return css({ borderRightWidth: `${value}px` });
});
export const mediaBorderTop = createMediaValue((value: MediaBorderType) => {
  return css({ borderTopWidth: `${value}px` });
});
export const mediaBorderStyle = createMediaValue(
  (value?: MediaBorderStyleType) => {
    return css({ borderStyle: value });
  }
);
export const mediaBorderRadius = createMediaValue(
  (value?: MediaBorderRadiusType) => {
    return css({ borderRadius: `${value}px` });
  }
);
