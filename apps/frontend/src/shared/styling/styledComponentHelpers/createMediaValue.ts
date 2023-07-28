import type { BreakpointValues } from "@shared/utils/types";
import type { FlattenSimpleInterpolation } from "styled-components";
import type { Breakpoints } from "../breakpoints";

export const createMediaValue = <T>(
  createMedia: (valueToConvert: T) => FlattenSimpleInterpolation | undefined
) => {
  return (breakpoint: Breakpoints, value: BreakpointValues<T>) => {
    const breakpointValue = value[breakpoint];
    if (breakpointValue === null || breakpointValue === undefined) return;
    return createMedia(breakpointValue);
  };
};
