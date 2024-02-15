import { z } from "zod";

// Types
// -----

export type PostComment = z.infer<typeof postCommentSchema>;

// Schema
// ------

const postCommentSchema = z.object({
  id: z.string().startsWith("postComment-"),
  postId: z.string().startsWith("post-"),
  authorId: z.string().startsWith("account-"),
  content: z.string().min(8).max(512),
});

// Parser
// ------

export const parsePostComment = (data: PostComment): PostComment =>
  postCommentSchema.parse(data);
