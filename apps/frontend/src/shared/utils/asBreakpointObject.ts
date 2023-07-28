import type { BreakpointValues, ValueOrBreakpointValues } from "./types";

export const asBreakpointObject = <T>(value: ValueOrBreakpointValues<T>) => {
  if (typeof value === "undefined") return {} satisfies BreakpointValues<T>;
  if (typeof value !== "object") {
    return { xs: value } satisfies BreakpointValues<T>;
  }
  return value as BreakpointValues<T>;
};
