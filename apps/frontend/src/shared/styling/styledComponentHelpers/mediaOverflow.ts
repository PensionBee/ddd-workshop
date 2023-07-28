import { css } from "styled-components";
import { createMediaValue } from "./createMediaValue";

export type MediaOverflowType = "visible" | "hidden" | "scroll" | "auto";

export const mediaOverflow = createMediaValue((value: MediaOverflowType) => {
  return css({ overflow: value });
});
export const mediaOverflowX = createMediaValue((value: MediaOverflowType) => {
  return css({ overflowX: value });
});
export const mediaOverflowY = createMediaValue((value: MediaOverflowType) => {
  return css({ overflowY: value });
});
