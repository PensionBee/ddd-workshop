import { css } from "styled-components";
import { createMediaValue } from "./createMediaValue";

export type MediaAlignType =
  | "start"
  | "center"
  | "end"
  | "baseline"
  | "stretch";
export type MediaGapType = number;
export type MediaDirectionType =
  | "row"
  | "row-reverse"
  | "column"
  | "column-reverse";
export type MediaFlexType = string;
export type MediaJustifyType =
  | "start"
  | "center"
  | "end"
  | "stretch"
  | "space-between"
  | "space-around"
  | "space-evenly";
export type MediaNoWrapType = boolean;
export type MediaFlexItemOrderType = number;

export const mediaAlign = createMediaValue((value: MediaAlignType) => {
  return css({ alignItems: value });
});
export const mediaColGap = createMediaValue((value: MediaGapType) => {
  return css({ columnGap: `${value}px` });
});
export const mediaRowGap = createMediaValue((value: MediaGapType) => {
  return css({ rowGap: `${value}px` });
});
export const mediaDirection = createMediaValue((value: MediaDirectionType) => {
  return css({ flexDirection: value });
});
export const mediaFlex = createMediaValue((value: MediaFlexType) => {
  return css({ flex: value });
});
export const mediaJustify = createMediaValue((value: MediaJustifyType) => {
  return css({ justifyContent: value });
});
export const mediaNoWrap = createMediaValue((value: MediaNoWrapType) => {
  return css({ flexWrap: value ? "nowrap" : "wrap" });
});
export const mediaFlexItemOrder = createMediaValue(
  (value: MediaFlexItemOrderType) => {
    return css({ order: value });
  }
);
