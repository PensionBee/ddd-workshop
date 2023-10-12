import { z } from "zod";

import { createEntityParser } from "#/shared/core/entities/entityParsing";

export type Account = z.infer<typeof accountSchema>;

const accountSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  username: z.string().min(6).max(32),
  password: z.string().min(8).max(64),
});

export const parseAccount = createEntityParser(accountSchema);
