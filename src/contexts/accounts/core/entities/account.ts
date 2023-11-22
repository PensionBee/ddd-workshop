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
  // TODO: COMPLETE ME!
});

// Parser
// ------

/**
 * This is a convenience function. Calling `parseAccount({...})` elsewhere in
 * our code is a little more explicit than accountSchema.parse({...})
 */
export const parseAccount = (data: Record<string, unknown>) =>
  accountSchema.parse(data);
