import { describe, expect, test } from "@jest/globals";

import { parsePost } from "./post";

describe("parsePost", () => {
  const validPostData = {
    id: "post-1",
    title: "Post Title",
    content: "Some post content",
    imageUrl: "https://images.com/image1",
    authorId: "account-1",
  };

  test("it returns a valid entity if the data to parse is valid", () => {
    expect(parsePost(validPostData)).toEqual(validPostData);
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
        parsePost({ ...validPostData, id: invalidValue })
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
        parsePost({ ...validPostData, title: invalidValue })
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
        parsePost({ ...validPostData, content: invalidValue })
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
        parsePost({ ...validPostData, imageUrl: invalidValue })
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
        parsePost({ ...validPostData, authorId: invalidValue })
      ).toThrowError();
    });
  });
});
