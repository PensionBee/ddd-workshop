import { z } from "zod";

// Types
// -----

export type Account = z.infer<typeof accountSchema>;

// Schemas
// -------

// Account Follower is an entity
const accountFollowerSchema = z.object({
  id: z.string().startsWith("accountFollower-"),
  followerId: z.string().startsWith("account-"),
  followedAt: z.string().datetime(),
});

// Blocked Account is an entity
const blockedAccountSchema = z.object({
  id: z.string().startsWith("blockedAccount-"),
  blockedAccountId: z.string().startsWith("account-"),
  blockedAt: z.string().datetime(),
});

// Account is a nested entity (aggregate)
const accountSchema = z.object({
  id: z.string().startsWith("account-"),
  email: z.string().email(),
  username: z.string().min(6).max(32),
  password: z.string().min(8).max(64),
  followers: z.array(accountFollowerSchema),
  blockedAccounts: z.array(blockedAccountSchema),
});

// Parser
// ------

export const parseAccount = (data: Account): Account =>
  accountSchema.parse(data);
