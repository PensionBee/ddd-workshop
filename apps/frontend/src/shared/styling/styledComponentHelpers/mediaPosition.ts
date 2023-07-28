import { css } from "styled-components";
import { createMediaValue } from "./createMediaValue";

export type MediaPositionType =
  | "static"
  | "relative"
  | "absolute"
  | "sticky"
  | "fixed";
export type MediaPositionValue = number | string;
export type MediaZIndex = number;

const getPositionValue = (value?: MediaPositionValue) => {
  if (typeof value === "string") return value;
  return `${value}px`;
};

export const mediaPosition = createMediaValue((value: MediaPositionType) => {
  return css({ position: value });
});
export const mediaBottom = createMediaValue((value: MediaPositionValue) => {
  return css({ bottom: getPositionValue(value) });
});
export const mediaLeft = createMediaValue((value: MediaPositionValue) => {
  return css({ left: getPositionValue(value) });
});
export const mediaRight = createMediaValue((value: MediaPositionValue) => {
  return css({ right: getPositionValue(value) });
});
export const mediaTop = createMediaValue((value: MediaPositionValue) => {
  return css({ top: getPositionValue(value) });
});
export const mediaZIndex = createMediaValue((value: MediaZIndex) => {
  return css({ zIndex: value });
});
