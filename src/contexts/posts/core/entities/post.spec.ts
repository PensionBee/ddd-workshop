import { describe, expect, test } from "@jest/globals";

import { Post, parsePost } from "./post";

describe("parsePost", () => {
  const validPost: Post = {};

  test("it returns a valid entity if the data to parse is valid", () => {
    expect(parsePost(validPost)).toEqual(validPost);
  });

  test("it throws an error if 'id' is invalid", () => {
    const invalidId = null;

    expect(() =>
      parsePost({
        ...validPost,
        id: invalidId,
      })
    ).toThrow();

    // Maybe we want to test other invalid IDs?
  });

  test("it throws an error if 'authorId' is invalid", () => {
    // TODO: COMPLETE ME!
  });

  test("it throws an error if 'title' is invalid", () => {
    // TODO: COMPLETE ME!
  });

  test("it throws an error if 'content' is invalid", () => {
    // TODO: COMPLETE ME!
  });

  test("it throws an error if 'imageUrl' is invalid", () => {
    // TODO: COMPLETE ME!
  });
});
