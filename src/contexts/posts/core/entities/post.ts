import { z } from "zod";

// Types
// -----

export type Post = z.infer<typeof postSchema>;

// Schema
// ------

// TODO: COMPLETE ME!
const postSchema = z.object({});

// Parser
// ------

/**
 * This is a convenience function. Calling `parsePost({...})` elsewhere in
 * our code is a little more explicit than accountSchema.parse({...})
 */
export const parsePost = (data: Record<string, unknown>) =>
  postSchema.parse(data);
