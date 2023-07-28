import { css } from "styled-components";
import { createMediaValue } from "./createMediaValue";

export type MediaDisplayType =
  | "block"
  | "inline"
  | "inline-block"
  | "flex"
  | "inline-flex"
  | "none";

export const mediaDisplay = createMediaValue((value: MediaDisplayType) => {
  return css({ display: value });
});
