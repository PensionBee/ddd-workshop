import { describe, expect, test } from "@jest/globals";

import { Post } from "../../core/entities/post";
import { postRepository } from "./postRepository";

describe("postRepository", () => {
  const validPost: Post = {
    id: "post-1",
    authorId: "account-1",
    title: "Post Title",
    content: "Some post content",
    imageUrl: "https://images.com/image1",
  };

  const invalidPost = {
    ...validPost,
    id: "INVALID_ID",
  };

  test("It persists a valid post entity", async () => {
    await postRepository.save(validPost);

    const persistedPost = await postRepository.getById("post-1");

    expect(persistedPost).toEqual(validPost);
  });
  test("It throws an error if trying to persist an invalid post entity", async () => {
    const saveInvalidPost = async () => await postRepository.save(invalidPost);

    expect(saveInvalidPost).rejects.toThrowError();
  });
});
