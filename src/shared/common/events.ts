/**
 * Defines the structure of an event in the system
 */
export type Event = {
  type: Uppercase<string>;
  payload: Record<string, unknown>;
};
