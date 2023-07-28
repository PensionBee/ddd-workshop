type ParseDataFn<TData extends Record<string, unknown>> = (
  data: TData
) => TData;

type GetOutputDataFn<
  TInputData extends Record<string, unknown>,
  TOutputData extends Record<string, unknown>
> = (data: TInputData) => Promise<TOutputData>;

export const createQueryHandler = <
  TInputData extends Record<string, unknown>,
  TOutputData extends Record<string, unknown>
>(handlerFns: {
  parseInputData: ParseDataFn<TInputData>;
  getOutputData: GetOutputDataFn<TInputData, TOutputData>;
  parseOutputData: ParseDataFn<TOutputData>;
}) => {
  return async function (rawInputData: TInputData): Promise<TOutputData> {
    const { parseInputData, getOutputData, parseOutputData } = handlerFns;
    const inputData = parseInputData(rawInputData);
    const outputData = await getOutputData(inputData);
    return parseOutputData(outputData);
  };
};
