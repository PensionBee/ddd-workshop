import { describe, expect, test } from "@jest/globals";

import { PostComment } from "../../core/entities/postComment";
import { postCommentRepository } from "./postCommentRepository";

describe("postCommentRepository", () => {
  const validPostComment: PostComment = {
    id: "postComment-1",
    postId: "post-1",
    authorId: "account-1",
    content: "A post comment",
  };

  const invalidPostComment = {
    ...validPostComment,
    id: "INVALID_ID",
  };

  test("It persists a valid postComment entity", async () => {
    await postCommentRepository.save(validPostComment);

    const persistedPostComment =
      await postCommentRepository.getById("postComment-1");

    expect(persistedPostComment).toEqual(validPostComment);
  });
  test("It throws an error if trying to persist an invalid postComment entity", async () => {
    const saveInvalidPostComment = async () =>
      await postCommentRepository.save(invalidPostComment);

    expect(saveInvalidPostComment).rejects.toThrowError();
  });
});
