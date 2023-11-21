import { z } from "zod";

// Types
// -----

export type PostComment = z.infer<typeof postCommentSchema>;

// Schema
// ------

const postCommentSchema = z.object({
  id: z.string().startsWith("postComment-"),
  postId: z.string().startsWith("post-"),
  content: z.string().min(8).max(512),
});

// Parser
// ------

export const parsePostComment = (data: Record<string, unknown>): PostComment =>
  postCommentSchema.parse(data);
