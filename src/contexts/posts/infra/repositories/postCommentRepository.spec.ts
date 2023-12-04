import { describe, expect, test } from "@jest/globals";
import { postCommentRepository } from "./postCommentRepository";

describe("postCommentRepository", () => {
  test("It persists a valid postComment entity", async () => {
    const validPostComment = {
      id: "postComment-1",
      postId: "post-1",
      content: "A post comment",
    };
    await postCommentRepository.save(validPostComment);

    const persistedPostComment =
      await postCommentRepository.getById("postComment-1");

    expect(persistedPostComment).toEqual(validPostComment);
  });
  test("It throws an error if trying to persist an invalid postComment entity", async () => {
    const invalidPostComment = {
      id: "INVALID_ID",
      postId: "post-1",
      content: "A post comment",
    };

    expect(
      async () => await postCommentRepository.save(invalidPostComment)
    ).rejects.toThrowError();
  });
});
