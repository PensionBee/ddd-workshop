import { describe, expect, test } from "@jest/globals";
import { Account } from "../../../accounts/core/entities/account";
import { accountRepository } from "../../../accounts/infra/repositories/accountRepository";
import { Post } from "../entities/post";
import { handlePublishPost } from "./publishPost.handler";

describe("handlePublishPost", () => {
  test("It successfully publishes a post", async () => {
    // Arrange
    // -------

    const POST_AUTHOR: Account = {
      id: "account-123",
      username: "johndoe",
      email: "johndoe@test.com",
      password: "password",
      followers: [],
      blockedAccounts: [],
    };

    const POST_TO_PUBLISH: Post = {
      id: "post-123",
      authorId: POST_AUTHOR.id,
      title: "My first post",
      content: "This is my first post",
      imageUrl: null,
    };

    await accountRepository.save(POST_AUTHOR);

    // Act
    // ---

    const event = await handlePublishPost({
      authorId: POST_AUTHOR.id,
      title: POST_TO_PUBLISH.title,
      content: POST_TO_PUBLISH.content,
      imageUrl: null,
    });

    // Assert
    // ------

    expect(event.type).toBe("POST_PUBLISHED");
    expect(event.payload).toMatchObject({
      id: expect.any(String),
      authorId: POST_AUTHOR.id,
      title: POST_TO_PUBLISH.title,
      content: POST_TO_PUBLISH.content,
      imageUrl: POST_TO_PUBLISH.imageUrl,
    });
  });
});
