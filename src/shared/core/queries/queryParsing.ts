import { z } from "zod";

import { QueryDataInvalidError } from "./queryErrors";

export const createQueryDataParser =
  <S extends z.AnyZodObject | z.ZodEffects<z.AnyZodObject>>(schema: S) =>
  (data: Record<string, unknown> | Record<string, unknown>[]): z.infer<S> => {
    const result = schema.safeParse(data);
    if (!result.success) {
      throw new QueryDataInvalidError(result.error);
    }
    return result.data;
  };
