import { z } from "zod";

export type Account = z.infer<typeof accountSchema>;

const accountSchema = z.object({
  id: z.string().startsWith("account-"),
  email: z.string().email(),
  username: z.string().min(6).max(32),
  password: z.string().min(8).max(64),
  following: z.array(z.string().startsWith("account-")),
});

export const parseAccount = (data: Record<string, unknown>): Account =>
  accountSchema.parse(data);
