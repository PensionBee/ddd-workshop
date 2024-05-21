import { describe, expect, test } from "@jest/globals";

import { accountRepository } from "../../infra/repositories/accountRepository";
import { type Account } from "../entities/account";
import { handleFollowAccount } from "./followAccount.handler";

describe("handleFollowAccount", () => {
  test("should follow an account", async () => {
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

    const FOLLOWEE: Account = {
      id: `account-${Math.random()}`,
      username: `${Math.random()}`,
      email: `${Math.random()}@test.com`,
      password: "password",
      followers: [],
      blockedAccounts: [],
    };

    // Persist entities
    await accountRepository.save(FOLLOWER);
    await accountRepository.save(FOLLOWEE);

    // Define command data
    const FOLLOW_ACCOUNT_DATA = {
      followerId: FOLLOWER.id,
      followeeId: FOLLOWEE.id,
    } satisfies Parameters<Awaited<typeof handleFollowAccount>>[0];

    // Act
    // ---

    const event = await handleFollowAccount(FOLLOW_ACCOUNT_DATA);

    // Assert
    // ------

    expect(event.type).toBe("ACCOUNT_FOLLOWED");
    expect(event.payload).toMatchObject({
      followerId: FOLLOWER.id,
      followeeId: FOLLOWEE.id,
    });

    const updatedFollowee = await accountRepository.getById(FOLLOWEE.id);
    expect(updatedFollowee!.followers).toContain(FOLLOWER.id);
  });

  test("should not follow an account if the follower is blocked by the followee", async () => {
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

    const FOLLOWEE: Account = {
      id: `account-${Math.random()}`,
      username: `${Math.random()}`,
      email: `${Math.random()}@test.com`,
      password: "password",
      followers: [],
      blockedAccounts: [FOLLOWER.id],
    };

    // Persist entities
    await accountRepository.save(FOLLOWER);
    await accountRepository.save(FOLLOWEE);

    // Define command data
    const FOLLOW_ACCOUNT_DATA = {
      followerId: FOLLOWER.id,
      followeeId: FOLLOWEE.id,
    } satisfies Parameters<Awaited<typeof handleFollowAccount>>[0];

    // Act
    // ---

    const event = await handleFollowAccount(FOLLOW_ACCOUNT_DATA);

    // Assert
    // ------

    expect(event.type).toBe("ACCOUNT_NOT_FOLLOWED/BLOCKED");
    expect(event.payload).toMatchObject({
      followerId: FOLLOWER.id,
      followeeId: FOLLOWEE.id,
    });

    const updatedFollowee = await accountRepository.getById(FOLLOWEE.id);
    expect(updatedFollowee!.followers).not.toContain(FOLLOWER.id);
  });

  test("should not follow an account if the follower is already following the followee", async () => {
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

    const FOLLOWEE: Account = {
      id: `account-${Math.random()}`,
      username: `${Math.random()}`,
      email: `${Math.random()}@test.com`,
      password: "password",
      followers: [FOLLOWER.id],
      blockedAccounts: [],
    };

    // Persist entities
    await accountRepository.save(FOLLOWER);
    await accountRepository.save(FOLLOWEE);

    // Define command data
    const FOLLOW_ACCOUNT_DATA = {
      followerId: FOLLOWER.id,
      followeeId: FOLLOWEE.id,
    } satisfies Parameters<Awaited<typeof handleFollowAccount>>[0];

    // Act
    // ---

    const event = await handleFollowAccount(FOLLOW_ACCOUNT_DATA);

    // Assert
    // ------

    expect(event.type).toBe("ACCOUNT_NOT_FOLLOWED/ALREADY_FOLLOWING");
    expect(event.payload).toMatchObject({
      followerId: FOLLOWER.id,
      followeeId: FOLLOWEE.id,
    });

    const updatedFollowee = await accountRepository.getById(FOLLOWEE.id);
    expect(updatedFollowee!.followers).toContain(FOLLOWER.id);
  });
});
