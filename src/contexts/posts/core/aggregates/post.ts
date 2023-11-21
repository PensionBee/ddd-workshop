import { z } from "zod";

// Types
// -----

export type Post = z.infer<typeof postSchema>;

// Schema
// ------

const postSchema = z.object({
  id: z.string().startsWith("post-"),
  title: z.string().min(8).max(64),
  content: z.string().min(8).max(256),
  imageUrl: z.string().url().optional(),
  authorId: z.string().startsWith("account-"),
});

// Parser
// ------

export const parsePost = (data: Record<string, unknown>): Post =>
  postSchema.parse(data);
