// Types
// -----

type HandlerFns<
  TData extends Record<string, unknown>,
  TState extends Record<string, unknown>,
  TOutcomeEvent extends Event,
> = {
  parseData: (data: TData | Record<string, unknown>) => TData;
  fetchState: (data: TData) => Promise<TState>;
  deriveOutcome: (data: TData, state: TState) => TOutcomeEvent;
  updateState: (state: TState, outcome: TOutcomeEvent) => Promise<void>;
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
    TOutcomeEvent extends Event,
  >(
    handlerFns: HandlerFns<TData, TState, TOutcomeEvent>
  ) =>
  async (rawData: TData | Record<string, unknown>): Promise<TOutcomeEvent> => {
    const { parseData, fetchState, deriveOutcome, updateState } = handlerFns;

    const data = parseData(rawData);
    const state = await fetchState(data);
    const outcome = deriveOutcome(data, state);
    await updateState(state, outcome);

    return outcome;
  };
