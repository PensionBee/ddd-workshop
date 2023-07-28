import type { Breakpoints } from "../styling/breakpoints";

/*
 * Return type of object values
 */
export type ObjectValues<T> = T[keyof T];

/*
 * Return type of prop for each breakpoint
 */
export type BreakpointValues<T> = { [key in Breakpoints]?: T };

/*
 * Return union type of prop as type or breakpoint types
 */
export type ValueOrBreakpointValues<T> = T | undefined | BreakpointValues<T>;

/*
 * Remove undefined from type
 */
export type NoUndefined<T> = T extends undefined ? never : T;
