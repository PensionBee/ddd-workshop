import { css } from "styled-components";
import { createMediaValue } from "./createMediaValue";

export type MediaWidthType = number | string;

const getWidth = (value?: MediaWidthType) => {
  if (typeof value === "string") return value;
  return `${value}px`;
};

export const mediaWidth = createMediaValue((value: MediaWidthType) => {
  return css({ width: getWidth(value) });
});
export const mediaMaxWidth = createMediaValue((value: MediaWidthType) => {
  return css({ maxWidth: getWidth(value) });
});
export const mediaMinWidth = createMediaValue((value: MediaWidthType) => {
  return css({ minWidth: getWidth(value) });
});
