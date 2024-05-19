import { describe, expect, test } from "@jest/globals";

import { PostComment } from "../../core/entities/postComment";
import { postCommentRepository } from "./postCommentRepository";

describe("postCommentRepository", () => {
  const VALID_POST_COMMENT: PostComment = {
    id: "postComment-1",
    postId: "post-1",
    authorId: "account-1",
    content: "A post comment",
  };

  const INVALID_POST_COMMENT = {
    ...VALID_POST_COMMENT,
    id: "INVALID_ID",
  };

  test("Should save a valid Post Comment and fetch it by it's ID", async () => {
    await postCommentRepository.save(VALID_POST_COMMENT);

    const persistedPostComment = await postCommentRepository.getById(
      VALID_POST_COMMENT.id
    );

    expect(persistedPostComment).toEqual(VALID_POST_COMMENT);
  });

  test("Should not save an invalid Post Comment", async () => {
    const saveInvalidPostComment = async () =>
      await postCommentRepository.save(INVALID_POST_COMMENT);

    expect(saveInvalidPostComment).rejects.toThrowError();
  });
});
