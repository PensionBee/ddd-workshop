import { type Event } from "../common/events";

// Types
// -----

type HandlerFns<
  TData extends Record<string, unknown>,
  TState extends Record<string, unknown>,
  TOutcome extends Event,
> = {
  parseData: (data: TData) => TData;
  fetchState: (data: TData) => Promise<TState>;
  deriveOutcome: (data: TData, state: TState) => TOutcome;
  updateState: (state: TState, outcome: TOutcome) => Promise<void>;
};

/**
 * Given parseData, fetchState, deriveOutcome and updateState functions, creates a standardised command handler
 * which abstracts the plumbing required to call/chain these functions and publish the outcome to
 * be picked up by other parts of the system.
 *
 * Additionally, provides strict TS guard rails which ensure each function conforms to the
 * currently accepted standard, e.g. deriveOutcome cannot be async.
 */
export const createCommandHandler =
  <
    TData extends Record<string, unknown>,
    TState extends Record<string, unknown>,
    TOutcome extends Event,
  >(
    handlerFns: HandlerFns<TData, TState, TOutcome>
  ) =>
  async (rawData: TData): Promise<TOutcome> => {
    const { parseData, fetchState, deriveOutcome, updateState } = handlerFns;

    const data = parseData(rawData);
    const state = await fetchState(data);
    const outcome = deriveOutcome(data, state);
    await updateState(state, outcome);

    return outcome;
  };
