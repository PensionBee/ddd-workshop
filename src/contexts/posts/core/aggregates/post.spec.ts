import { describe, expect, test } from "@jest/globals";

import { parsePost } from "./post";

describe("parsePost", () => {
  test("It returns a valid entity if the data to parse is valid", () => {
    const post = parsePost({
      id: "post-1",
      title: "Post Title",
      content: "Some post content",
      imageUrl: "https://images.com/image1",
      authorId: "account-1",
    });

    expect(post).toEqual({
      id: "post-1",
      title: "Post Title",
      content: "Some post content",
      imageUrl: "https://images.com/image1",
      authorId: "account-1",
    });
  });
  test("It throws an error if required data is missing", () => {
    const validData = {
      id: "post-1",
      title: "Post Title",
      content: "Some post content",
      imageUrl: "https://images.com/image1",
      authorId: "account-1",
    };

    expect(() => parsePost({ ...validData, id: undefined })).toThrowError();
    expect(() => parsePost({ ...validData, title: undefined })).toThrowError();
    expect(() =>
      parsePost({ ...validData, content: undefined })
    ).toThrowError();
    expect(() =>
      parsePost({ ...validData, imageUrl: undefined })
    ).toThrowError();
    expect(() =>
      parsePost({ ...validData, authorId: undefined })
    ).toThrowError();
  });
  test("It throws an error if data is invalid", () => {
    const validData = {
      id: "post-1",
      title: "Post Title",
      content: "Some post content",
      imageUrl: "https://images.com/image1",
      authorId: "account-1",
    };

    expect(() => parsePost({ ...validData, id: "abc123" })).toThrowError();
    expect(() => parsePost({ ...validData, title: "test" })).toThrowError();
    expect(() => parsePost({ ...validData, content: "test" })).toThrowError();
    expect(() => parsePost({ ...validData, imageUrl: "test" })).toThrowError();
    expect(() =>
      parsePost({ ...validData, authorId: "abc123" })
    ).toThrowError();
  });
});
