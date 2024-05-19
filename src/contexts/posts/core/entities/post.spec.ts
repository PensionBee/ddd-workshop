import { describe, expect, test } from "@jest/globals";

import { parsePost, type Post } from "./post";

describe("parsePost", () => {
  const validPost: Post = {};

  test("it returns a valid entity if the data to parse is valid", () => {
    expect(parsePost(validPost)).toEqual(validPost);
  });

  test("it throws an error if 'id' is invalid", () => {
    const invalidIds = [null, undefined, {}, true, false];

    invalidIds.forEach((invalidId) => {
      expect(() =>
        parsePost({
          ...validPost,
          id: invalidId,
        })
      ).toThrow();
    });
  });

  // TODO: complete me
});
