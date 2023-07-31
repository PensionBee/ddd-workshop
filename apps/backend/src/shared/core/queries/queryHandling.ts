type ParseDataFn<TData extends Record<string, unknown>> = (
  data: TData
) => TData;

type GetOutputFn<
  TData extends Record<string, unknown>,
  TOutput extends Record<string, unknown>
> = (data: TData) => Promise<TOutput>;

export const createQueryHandler = <
  TData extends Record<string, unknown>,
  TOutput extends Record<string, unknown>
>(handlerFns: {
  parseData: ParseDataFn<TData>;
  getOutput: GetOutputFn<TData, TOutput>;
}) => {
  return async function (rawData: TData): Promise<TOutput> {
    const { parseData, getOutput } = handlerFns;
    const data = parseData(rawData);
    return await getOutput(data);
  };
};
