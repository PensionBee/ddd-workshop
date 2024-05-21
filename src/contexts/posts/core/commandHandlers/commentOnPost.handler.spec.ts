import { describe, expect, test } from "@jest/globals";

import { type Account } from "../../../accounts/core/entities/account";
import { accountRepository } from "../../../accounts/infra/repositories/accountRepository";
import { postRepository } from "../../infra/repositories/postRepository";
import { type Post } from "../entities/post";
import { handleCommentOnPost } from "./commentOnPost.handler";

describe("handleCommentOnPost", () => {
  test("should comment on a post", async () => {
    // Arrange
    // -------

    // Create test entities
    const COMMENTOR: Account = {
      id: `account-${Math.random()}`,
      username: `${Math.random()}`,
      email: `${Math.random()}@test.com`,
      password: "password",
      followers: [],
      blockedAccounts: [],
    };

    const POST_AUTHOR: Account = {
      id: `account-${Math.random()}`,
      username: `${Math.random()}`,
      email: `${Math.random()}@test.com`,
      password: "password",
      followers: [],
      blockedAccounts: [],
    };

    const POST: Post = {
      id: `post-${Math.random()}`,
      authorId: POST_AUTHOR.id,
      title: "My first post",
      content: "This is my first post",
      imageUrl: null,
    };

    // Persist entities
    await accountRepository.save(COMMENTOR);
    await accountRepository.save(POST_AUTHOR);
    await postRepository.save(POST);

    // Define command data
    const COMMENT_ON_POST_DATA = {
      postId: POST.id,
      authorId: COMMENTOR.id,
      content: "This is my first comment",
    } satisfies Parameters<Awaited<typeof handleCommentOnPost>>[0];

    // Act
    // ---

    const event = await handleCommentOnPost(COMMENT_ON_POST_DATA);

    // Assert
    // ------

    expect(event.type).toBe("COMMENT_ADDED_TO_POST");
    expect(event.payload).toMatchObject({
      id: expect.any(String),
      authorId: COMMENTOR.id,
      postId: POST.id,
      content: COMMENT_ON_POST_DATA.content,
    });
  });

  test("should not comment on a post if the commentor is blocked by the post author", async () => {
    // Arrange
    // -------

    // Create test entities
    const COMMENTOR: Account = {
      id: `account-${Math.random()}`,
      username: `${Math.random()}`,
      email: `${Math.random()}@test.com`,
      password: "password",
      followers: [],
      blockedAccounts: [],
    };

    const POST_AUTHOR: Account = {
      id: `account-${Math.random()}`,
      username: `${Math.random()}`,
      email: `${Math.random()}@test.com`,
      password: "password",
      followers: [],
      blockedAccounts: [COMMENTOR.id],
    };

    const POST: Post = {
      id: `post-${Math.random()}`,
      authorId: POST_AUTHOR.id,
      title: "My first post",
      content: "This is my first post",
      imageUrl: null,
    };

    // Persist entities
    await accountRepository.save(COMMENTOR);
    await accountRepository.save(POST_AUTHOR);
    await postRepository.save(POST);

    // Define command data
    const COMMENT_ON_POST_DATA = {
      postId: POST.id,
      authorId: COMMENTOR.id,
      content: "This is my first comment",
    } satisfies Parameters<Awaited<typeof handleCommentOnPost>>[0];

    // Act
    // ---

    const event = await handleCommentOnPost(COMMENT_ON_POST_DATA);

    // Assert
    // ------

    expect(event.type).toBe("COMMENT_NOT_ADDED_TO_POST/ACCOUNT_BLOCKED");
    expect(event.payload).toMatchObject({
      postId: POST.id,
      blockingAccountId: POST_AUTHOR.id,
      blockedAccountId: COMMENTOR.id,
    });
  });
});
