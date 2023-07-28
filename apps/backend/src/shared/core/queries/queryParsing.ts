import { z } from "zod";

import { QueryInputDataInvalidError, QueryOutputDataInvalidError } from "./queryErrors";

export const createQueryInputDataParser = <
  S extends z.AnyZodObject | z.ZodArray<z.AnyZodObject>
>(schema: S) => (data: Record<string, unknown> | Record<string, unknown>[]): z.infer<S> => {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new QueryInputDataInvalidError(result.error);
  }
  return result.data;
};

export const createQueryOutputDataParser = <
  S extends z.AnyZodObject | z.ZodArray<z.AnyZodObject>
>(schema: S) => (dto: Record<string, unknown> | Record<string, unknown>[]): z.infer<S> => {
  const result = schema.safeParse(dto);
  if (!result.success) {
    throw new QueryOutputDataInvalidError(result.error);
  }
  return result.data;
};
