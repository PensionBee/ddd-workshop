import { z } from "zod";

import { ActionDataInvalidError } from "./actionErrors";

export const createActionDataParser =
  <S extends z.AnyZodObject | z.ZodArray<z.AnyZodObject>>(schema: S) =>
  (data: Record<string, unknown>): z.infer<S> => {
    const result = schema.safeParse(data);
    if (!result.success) {
      throw new ActionDataInvalidError(result.error);
    }
    return result.data;
  };
