import { describe, expect, test } from "@jest/globals";

import { Post, parsePost } from "./post";

describe("parsePost", () => {
  const validPost: Post = {
    id: "post-1",
    title: "Post Title",
    content: "Some post content",
    imageUrl: "https://images.com/image1",
    authorId: "account-1",
  };

  test("it returns a valid entity if the data to parse is valid", () => {
    expect(parsePost(validPost)).toEqual(validPost);
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
      "notPost-1",
    ];
    invalidValues.forEach((invalidValue) => {
      expect(() =>
        parsePost({ ...validPost, id: invalidValue } as Post)
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
        parsePost({ ...validPost, authorId: invalidValue } as Post)
      ).toThrowError();
    });
  });

  test("it throws an error if 'title' is invalid", () => {
    const invalidValues = [
      undefined,
      null,
      true,
      false,
      1,
      {},
      "x",
      "x".repeat(65),
    ];
    invalidValues.forEach((invalidValue) => {
      expect(() =>
        parsePost({ ...validPost, title: invalidValue } as Post)
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
      "x".repeat(257),
    ];
    invalidValues.forEach((invalidValue) => {
      expect(() =>
        parsePost({ ...validPost, content: invalidValue } as Post)
      ).toThrowError();
    });
  });

  test("it throws an error if 'imageUrl' is invalid", () => {
    const invalidValues = [
      null,
      true,
      false,
      1,
      {},
      "x",
      "images.com/an-image.png",
    ];
    invalidValues.forEach((invalidValue) => {
      expect(() =>
        parsePost({ ...validPost, imageUrl: invalidValue } as Post)
      ).toThrowError();
    });
  });
});
