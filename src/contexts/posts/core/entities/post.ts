import { z } from "zod";

// Types
// -----

export type Post = z.infer<typeof postSchema>;

// Schema
// ------

const postSchema = z.object({
  id: z.any(), // TODO: change me to something that isn't z.any()
  // TODO: Add more attributes
});

// Parser
// ------

export const parsePost = (data: Post | Record<string, unknown>): Post =>
  postSchema.parse(data);
