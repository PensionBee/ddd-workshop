import { describe, expect, test } from "@jest/globals";

import { parsePostComment } from "./postComment";

describe("parsePostComment", () => {
  const validPostCommentData = {};

  test("it returns a valid entity if the data to parse is valid", () => {
    expect(parsePostComment(validPostCommentData)).toEqual(
      validPostCommentData
    );
  });

  test("it throws an error if 'id' is invalid", () => {
    // TODO: COMPLETE ME!
  });

  test("it throws an error if 'postId' is invalid", () => {
    // TODO: COMPLETE ME!
  });

  test("it throws an error if 'authorId' is invalid", () => {
    // TODO: COMPLETE ME!
  });

  test("it throws an error if 'content' is invalid", () => {
    // TODO: COMPLETE ME!
  });
});
