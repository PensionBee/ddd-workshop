import { css } from "styled-components";
import { createMediaValue } from "./createMediaValue";

export type MediaHeightType = number | string;

const getHeight = (value?: MediaHeightType) => {
  if (typeof value === "string") return value;
  return `${value}px`;
};

export const mediaHeight = createMediaValue((value: MediaHeightType) => {
  return css({ height: getHeight(value) });
});
export const mediaMinHeight = createMediaValue((value: MediaHeightType) => {
  return css({ minHeight: getHeight(value) });
});
export const mediaMaxHeight = createMediaValue((value: MediaHeightType) => {
  return css({ maxHeight: getHeight(value) });
});
