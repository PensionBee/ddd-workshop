import { css } from "styled-components";
import { createMediaValue } from "./createMediaValue";
import { theme } from "../theme";

export type MediaTextColors = keyof typeof theme.colors;
export type MediaTextNoWrapType = boolean;
export type MediaTextAlign = "left" | "center" | "right" | "justify";

export const mediaTextColor = createMediaValue(
  (value: MediaTextColors | undefined) => {
    return css({
      color: value && theme.colors[value],
    });
  }
);
export const mediaTextNoWrap = createMediaValue(
  (value?: MediaTextNoWrapType) => {
    return css({ whiteSpace: value ? "nowrap" : "normal" });
  }
);
export const mediaTextAlign = createMediaValue((value: MediaTextAlign) => {
  return css({ textAlign: value });
});
