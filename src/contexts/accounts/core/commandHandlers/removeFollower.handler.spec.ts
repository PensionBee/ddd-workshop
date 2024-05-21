import { describe, expect, test } from "@jest/globals";

import { accountRepository } from "../../infra/repositories/accountRepository";
import { type Account } from "../entities/account";
import { handleRemoveFollower } from "./removeFollower.handler";

describe("handleRemoveFollower", () => {
  test("should remove a follower", async () => {
    // Arrange
    // -------

    // Create test entities
    const FOLLOWER: Account = {
      id: `account-${Math.random()}`,
      username: `${Math.random()}`,
      email: `${Math.random()}@test.com`,
      password: "password",
      followers: [],
      blockedAccounts: [],
    };

    const ACCOUNT: Account = {
      id: `account-${Math.random()}`,
      username: `${Math.random()}`,
      email: `${Math.random()}@test.com`,
      password: "password",
      followers: ["account-123", FOLLOWER.id],
      blockedAccounts: [],
    };

    // Persist entities
    await accountRepository.save(FOLLOWER);
    await accountRepository.save(ACCOUNT);

    // Define command data
    const REMOVE_FOLLOWER_DATA = {
      followerId: FOLLOWER.id,
      accountId: ACCOUNT.id,
    } satisfies Parameters<Awaited<typeof handleRemoveFollower>>[0];

    // Act
    // ---

    const event = await handleRemoveFollower(REMOVE_FOLLOWER_DATA);

    // Assert
    // ------

    expect(event.type).toBe("FOLLOWER_REMOVED");
    expect(event.payload).toMatchObject({
      followerId: FOLLOWER.id,
      accountId: ACCOUNT.id,
    });

    const updatedAccount = await accountRepository.getById(ACCOUNT.id);
    expect(updatedAccount!.followers.length).toBe(1);
    expect(updatedAccount!.followers).not.toContain(FOLLOWER.id);
    expect(updatedAccount!.followers).toContain(ACCOUNT.followers[0]);
  });
  test("should not remove a follower if the follower isn't following the account", async () => {
    // Arrange
    // -------

    // Create test entities
    const FOLLOWER: Account = {
      id: `account-${Math.random()}`,
      username: `${Math.random()}`,
      email: `${Math.random()}@test.com`,
      password: "password",
      followers: [],
      blockedAccounts: [],
    };

    const ACCOUNT: Account = {
      id: `account-${Math.random()}`,
      username: `${Math.random()}`,
      email: `${Math.random()}@test.com`,
      password: "password",
      followers: ["account-123"],
      blockedAccounts: [],
    };

    // Persist entities
    await accountRepository.save(FOLLOWER);
    await accountRepository.save(ACCOUNT);

    // Define command data
    const REMOVE_FOLLOWER_DATA = {
      followerId: FOLLOWER.id,
      accountId: ACCOUNT.id,
    } satisfies Parameters<Awaited<typeof handleRemoveFollower>>[0];

    // Act
    // ---

    const event = await handleRemoveFollower(REMOVE_FOLLOWER_DATA);

    // Assert
    // ------

    expect(event.type).toBe("FOLLOWER_NOT_REMOVED/NOT_FOLLOWING");
    expect(event.payload).toMatchObject({
      followerId: FOLLOWER.id,
      accountId: ACCOUNT.id,
    });

    const nonUpdatedAccount = await accountRepository.getById(ACCOUNT.id);
    expect(nonUpdatedAccount!.followers.length).toBe(1);
    expect(nonUpdatedAccount!.followers).not.toContain(FOLLOWER.id);
    expect(nonUpdatedAccount!.followers).toContain(ACCOUNT.followers[0]);
  });
});
