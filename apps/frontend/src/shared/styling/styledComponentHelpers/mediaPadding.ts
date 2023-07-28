import { css } from "styled-components";
import { createMediaValue } from "./createMediaValue";

export type MediaPaddingType = number | string;

const getPadding = (value?: MediaPaddingType) => {
  if (typeof value === "string") return value;
  return `${value}px`;
};

export const mediaPadding = createMediaValue((value: MediaPaddingType) => {
  return css({
    padding: getPadding(value),
  });
});
export const mediaPaddingX = createMediaValue((value: MediaPaddingType) => {
  return css({
    paddingLeft: getPadding(value),
    paddingRight: getPadding(value),
  });
});
export const mediaPaddingY = createMediaValue((value: MediaPaddingType) => {
  return css({
    paddingTop: getPadding(value),
    paddingBottom: getPadding(value),
  });
});
export const mediaPaddingBottom = createMediaValue(
  (value?: MediaPaddingType) => {
    return css({ paddingBottom: getPadding(value) });
  }
);
export const mediaPaddingLeft = createMediaValue((value: MediaPaddingType) => {
  return css({ paddingLeft: getPadding(value) });
});
export const mediaPaddingRight = createMediaValue(
  (value?: MediaPaddingType) => {
    return css({ paddingRight: getPadding(value) });
  }
);
export const mediaPaddingTop = createMediaValue((value: MediaPaddingType) => {
  return css({ paddingTop: getPadding(value) });
});
