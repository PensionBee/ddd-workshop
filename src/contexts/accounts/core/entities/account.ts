import { z } from "zod";

// Types
// -----

export type Account = z.infer<typeof accountSchema>;

// Schemas
// -------

const accountSchema = z.object({
  id: z.string().startsWith("account-"),
  email: z.string().email(),
  username: z.string().min(6).max(32),
  password: z.string().min(8).max(64),
  followers: z.array(z.string().startsWith("account-")),
  blockedAccounts: z.array(z.string().startsWith("account-")),
});

// Parser
// ------

export const parseAccount = (data: Account): Account =>
  accountSchema.parse(data);
