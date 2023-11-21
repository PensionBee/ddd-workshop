import { describe, expect, test } from "@jest/globals";

import { parsePostComment } from "./postComment";

describe("parsePostComment", () => {
  test("It returns a valid entity if the data to parse is valid", () => {
    const postComment = parsePostComment({
      id: "postComment-1",
      postId: "post-1",
      content: "A post comment",
    });

    expect(postComment).toEqual({
      id: "postComment-1",
      postId: "post-1",
      content: "A post comment",
    });
  });
  test("It throws an error if required data is missing", () => {
    const validData = {
      id: "postComment-1",
      postId: "post-1",
      content: "A post comment",
    };

    expect(() =>
      parsePostComment({ ...validData, id: undefined })
    ).toThrowError();
    expect(() =>
      parsePostComment({ ...validData, postId: undefined })
    ).toThrowError();
    expect(() =>
      parsePostComment({ ...validData, content: undefined })
    ).toThrowError();
  });
  test("It throws an error if data is invalid", () => {
    const validData = {
      id: "postComment-1",
      postId: "post-1",
      content: "A post comment",
    };

    expect(() =>
      parsePostComment({ ...validData, id: "abc123" })
    ).toThrowError();
    expect(() =>
      parsePostComment({ ...validData, postId: "abc123" })
    ).toThrowError();
    expect(() =>
      parsePostComment({ ...validData, content: "test" })
    ).toThrowError();
  });
});
