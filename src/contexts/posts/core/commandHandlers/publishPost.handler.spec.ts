import { describe, expect, test } from "@jest/globals";
import { Account } from "../../../accounts/core/entities/account";
import { accountRepository } from "../../../accounts/infra/repositories/accountRepository";
import { Post } from "../entities/post";
import { handlePublishPost } from "./publishPost.handler";

describe("handlePublishPost", () => {
  test("should publish a post", async () => {
    // Arrange
    // -------

    // Create test entities
    const POST_AUTHOR: Account = {
      id: `account-${Math.random()}`,
      username: `${Math.random()}`,
      email: `${Math.random()}@test.com`,
      password: "password",
      followers: [],
      blockedAccounts: [],
    };

    // Persist entities
    await accountRepository.save(POST_AUTHOR);

    // Define command data
    const PUBLISH_POST_DATA: Omit<Post, "id"> = {
      authorId: POST_AUTHOR.id,
      title: "My first post",
      content: "This is my first post",
      imageUrl: null,
    };

    // Act
    // ---

    const event = await handlePublishPost({
      authorId: POST_AUTHOR.id,
      title: PUBLISH_POST_DATA.title,
      content: PUBLISH_POST_DATA.content,
      imageUrl: null,
    });

    // Assert
    // ------

    expect(event.type).toBe("POST_PUBLISHED");
    expect(event.payload).toMatchObject({
      id: expect.any(String),
      authorId: POST_AUTHOR.id,
      title: PUBLISH_POST_DATA.title,
      content: PUBLISH_POST_DATA.content,
      imageUrl: PUBLISH_POST_DATA.imageUrl,
    });
  });
});
