export type Event = {
  type: Uppercase<string>;
  payload: Record<string, unknown>;
};
