import { z } from "zod";

export type Post = z.infer<typeof postSchema>;

const postSchema = z.object({
  id: z.string().startsWith("post-"),
  title: z.string().min(8).max(64),
  content: z.string().min(8).max(256),
  imageUrl: z.string().url(),
  authorId: z.string().startsWith("account-"),
});

export const parsePost = (data: Record<string, unknown>): Post =>
  postSchema.parse(data);
