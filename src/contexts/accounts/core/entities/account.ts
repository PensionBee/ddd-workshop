import { z } from "zod";

// Types
// -----

export type Account = z.infer<typeof accountSchema>;

// Schema
// ------

const accountSchema = z.object({
  id: z.string().startsWith("account-"),
  email: z.string().email(),
  username: z.string().min(6).max(32),
  password: z.string().min(8).max(64),
  // TODO: Complete me
});

// Parser
// ------

export const parseAccount = (
  data: Account | Record<string, unknown>
): Account => accountSchema.parse(data);
