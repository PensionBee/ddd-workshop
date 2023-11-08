/**
 * Adding this as the default case in a switch statement will force all cases to be explicitly handled (in TS) or throw an error if a value slips through at runtime
 *
 * @param value - The value being checked in the switch statement.
 *
 * @example
 * switch (x: "A" | "B" | "C") {
 *   case "A":
 *     do something
 *     break
 *   case "B":
 *     do something
 *     break
 *   default:
 *     errorOnDefaultCase(x); // TS Error - case "C" is unhandled
 */
export const errorOnDefaultCase = (value: never): never => {
  throw new Error(
    `${value} was unexpectedly handled by a default block in a switch statement`
  );
};
