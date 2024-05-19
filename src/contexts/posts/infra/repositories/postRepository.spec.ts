import { describe, expect, test } from "@jest/globals";

import { Post } from "../../core/entities/post";
import { postRepository } from "./postRepository";

describe("postRepository", () => {
  const VALID_POST: Post = {
    id: "post-1",
    authorId: "account-1",
    title: "Post Title",
    content: "Some post content",
    imageUrl: "https://images.com/image1",
  };

  test("Should save a valid Post Comment and fetch it by it's ID", async () => {
    await postRepository.save(VALID_POST);

    const persistedPost = await postRepository.getById(VALID_POST.id);

    expect(persistedPost).toEqual(VALID_POST);
  });
});
