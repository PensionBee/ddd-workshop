import { z } from "zod";

// Types
// -----

export type Account = z.infer<typeof accountSchema>;

// Schemas
// -------

const accountFollowerSchema = z.object({
  id: z.string().startsWith("accountFollower-"),
  followerId: z.string().startsWith("account-"),
  followedAt: z.string().datetime(),
});

const accountSchema = z.object({
  id: z.string().startsWith("account-"),
  email: z.string().email(),
  username: z.string().min(6).max(32),
  password: z.string().min(8).max(64),
  followers: z.array(accountFollowerSchema),
});

// Parser
// ------

export const parseAccount = (data: Record<string, unknown>): Account =>
  accountSchema.parse(data);
