import { z } from "zod";

import { EntityInvalidError } from "./entityErrors";

export const createEntityParser =
  <S extends z.AnyZodObject>(schema: S) =>
  (data: Record<string, unknown>): z.infer<S> => {
    const result = schema.safeParse(data);
    if (!result.success) {
      throw new EntityInvalidError(result.error);
    }
    return result.data;
  };
