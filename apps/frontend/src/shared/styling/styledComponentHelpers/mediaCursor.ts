import type { NoUndefined } from "@shared/utils/types";
import { css } from "styled-components";
import { createMediaValue } from "./createMediaValue";

export type MediaCursorType = NoUndefined<React.CSSProperties["cursor"]>;

export const mediaCursor = createMediaValue((value: MediaCursorType) => {
  return css({ cursor: value });
});
