export const createActionHandler =
  <
    TData extends Record<string, unknown>,
    TState extends Record<string, unknown>,
    TOutcome extends {
      type: Uppercase<string>;
      payload: Record<string, unknown>;
    }
  >(handlerFns: {
    parseData: (rawData: TData) => TData;
    fetchState: (data: TData) => Promise<TState>;
    deriveOutcome: (data: TData, state: TState) => TOutcome;
    updateState: (state: TState, outcome: TOutcome) => Promise<void>;
  }) =>
  async (rawData: TData): Promise<TOutcome> => {
    const { parseData, fetchState, deriveOutcome, updateState } = handlerFns;

    const data = parseData(rawData);
    const state = await fetchState(data);
    const outcome = deriveOutcome(data, state);
    await updateState(state, outcome);

    return outcome;
  };
