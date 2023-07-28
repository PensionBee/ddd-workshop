import { z } from "zod";

import { createEntityParser } from "#shared/core/entities/entityParsing";

export type User = z.infer<typeof userSchema>;

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  password: z.string().min(8).max(64),
  firstName: z.string().min(2).max(255),
  lastName: z.string().min(2).max(255).nullable(),
});

export const parseUser = createEntityParser(userSchema);
