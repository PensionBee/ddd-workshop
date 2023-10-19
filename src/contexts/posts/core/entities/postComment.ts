import { z } from "zod";

export type PostComment = z.infer<typeof postCommentSchema>;

const postCommentSchema = z.object({
  id: z.string().startsWith("postComment-"),
  postId: z.string().startsWith("post-"),
  content: z.string().min(8).max(512),
});

export const parsePostComment = (data: Record<string, unknown>): PostComment =>
  postCommentSchema.parse(data);
