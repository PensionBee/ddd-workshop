import { describe, expect, test } from "@jest/globals";

import { parsePostComment } from "./postComment";

describe("parsePostComment", () => {
  const validPostCommentData = {
    id: "postComment-1",
    postId: "post-1",
    authorId: "account-1",
    content: "A post comment",
  };

  test("it returns a valid entity if the data to parse is valid", () => {
    expect(parsePostComment(validPostCommentData)).toEqual(
      validPostCommentData
    );
  });

  test("it throws an error if 'id' is invalid", () => {
    const invalidValues = [
      undefined,
      null,
      true,
      false,
      1,
      {},
      "x",
      "notPostComment-1",
    ];
    invalidValues.forEach((invalidValue) => {
      expect(() =>
        parsePostComment({ ...validPostCommentData, id: invalidValue })
      ).toThrowError();
    });
  });

  test("it throws an error if 'postId' is invalid", () => {
    const invalidValues = [
      undefined,
      null,
      true,
      false,
      1,
      {},
      "x",
      "notPost-1",
    ];
    invalidValues.forEach((invalidValue) => {
      expect(() =>
        parsePostComment({ ...validPostCommentData, postId: invalidValue })
      ).toThrowError();
    });
  });

  test("it throws an error if 'authorId' is invalid", () => {
    const invalidValues = [
      undefined,
      null,
      true,
      false,
      1,
      {},
      "x",
      "notAccount-1",
    ];
    invalidValues.forEach((invalidValue) => {
      expect(() =>
        parsePostComment({ ...validPostCommentData, authorId: invalidValue })
      ).toThrowError();
    });
  });

  test("it throws an error if 'content' is invalid", () => {
    const invalidValues = [
      undefined,
      null,
      true,
      false,
      1,
      {},
      "x",
      "x".repeat(513),
    ];
    invalidValues.forEach((invalidValue) => {
      expect(() =>
        parsePostComment({ ...validPostCommentData, content: invalidValue })
      ).toThrowError();
    });
  });
});
