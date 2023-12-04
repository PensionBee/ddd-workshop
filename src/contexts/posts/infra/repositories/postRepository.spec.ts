import { describe, expect, test } from "@jest/globals";
import { postRepository } from "./postRepository";

describe("postRepository", () => {
  test("It persists a valid post entity", async () => {
    const validPost = {
      id: "post-1",
      title: "Post Title",
      content: "Some post content",
      imageUrl: "https://images.com/image1",
      authorId: "account-1",
    };
    await postRepository.save(validPost);

    const persistedPost = await postRepository.getById("post-1");

    expect(persistedPost).toEqual(validPost);
  });
  test("It throws an error if trying to persist an invalid post entity", async () => {
    const invalidPost = {
      id: "INVALID_ID",
      title: "Post Title",
      content: "Some post content",
      imageUrl: "https://images.com/image1",
      authorId: "account-1",
    };

    expect(
      async () => await postRepository.save(invalidPost)
    ).rejects.toThrowError();
  });
});
