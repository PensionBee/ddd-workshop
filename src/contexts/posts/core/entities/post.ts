import { z } from "zod";

// Types
// -----

export type Post = z.infer<typeof postSchema>;

// Schema
// ------

const postSchema = z.object({
  id: z.any(), // TODO: CHANGE ME TO SOMETHING THAT ISN'T z.any()!
  title: z.any(), // TODO: CHANGE ME TO SOMETHING THAT ISN'T z.any()!
  content: z.any(), // TODO: CHANGE ME TO SOMETHING THAT ISN'T z.any()!
  imageUrl: z.any(), // TODO: CHANGE ME TO SOMETHING THAT ISN'T z.any()!
  authorId: z.any(), // TODO: CHANGE ME TO SOMETHING THAT ISN'T z.any()!
});

// Parser
// ------

/**
 * This is a convenience function. Calling `parsePost({...})` elsewhere in
 * our code is more explicit than calling `postSchema.parse({...})`
 */
export const parsePost = (data: Post) => postSchema.parse(data);
