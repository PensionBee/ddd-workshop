import { z } from "zod";

// Types
// -----

export type Post = z.infer<typeof postSchema>;

// Schema
// ------

export const postSchema = z.object({
  id: z.string().startsWith("post-"),
  authorId: z.string().startsWith("account-"),
  title: z.string().min(8).max(64),
  content: z.string().min(8).max(256),
  imageUrl: z.string().url().nullable(),
});

// Parser
// ------

export const parsePost = (data: Post): Post => postSchema.parse(data);
