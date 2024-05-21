import { describe, expect, test } from "@jest/globals";

import { accountRepository } from "../../infra/repositories/accountRepository";
import { type Account } from "../entities/account";
import { handleBlockAccount } from "./blockAccount.handler";

describe("handleBlockAccount", () => {
  test("should block an account", async () => {
    // Arrange
    // -------

    // Create test entities
    const BLOCKEE: Account = {
      id: `account-${Math.random()}`,
      username: `${Math.random()}`,
      email: `${Math.random()}@test.com`,
      password: "password",
      followers: [],
      blockedAccounts: [],
    };

    const BLOCKER: Account = {
      id: `account-${Math.random()}`,
      username: `${Math.random()}`,
      email: `${Math.random()}@test.com`,
      password: "password",
      followers: [],
      blockedAccounts: [],
    };

    // Persist entities
    await accountRepository.save(BLOCKEE);
    await accountRepository.save(BLOCKER);

    // Define command data
    const BLOCK_ACCOUNT_DATA = {
      blockerId: BLOCKER.id,
      blockeeId: BLOCKEE.id,
    } satisfies Parameters<Awaited<typeof handleBlockAccount>>[0];

    // Act
    // ---

    const event = await handleBlockAccount(BLOCK_ACCOUNT_DATA);

    // Assert
    // ------

    expect(event.type).toBe("ACCOUNT_BLOCKED");
    expect(event.payload).toMatchObject({
      blockerId: BLOCKER.id,
      blockeeId: BLOCKEE.id,
    });

    const updatedBlocker = await accountRepository.getById(BLOCKER.id);
    expect(updatedBlocker!.blockedAccounts).toContain(BLOCKEE.id);
  });

  test("should not block an account if the blocker is already blocking the blockee", async () => {
    // Arrange
    // -------

    // Create test entities
    const BLOCKEE: Account = {
      id: `account-${Math.random()}`,
      username: `${Math.random()}`,
      email: `${Math.random()}@test.com`,
      password: "password",
      followers: [],
      blockedAccounts: [],
    };

    const BLOCKER: Account = {
      id: `account-${Math.random()}`,
      username: `${Math.random()}`,
      email: `${Math.random()}@test.com`,
      password: "password",
      followers: [],
      blockedAccounts: [BLOCKEE.id],
    };

    // Persist entities
    await accountRepository.save(BLOCKEE);
    await accountRepository.save(BLOCKER);

    // Define command data
    const BLOCK_ACCOUNT_DATA = {
      blockerId: BLOCKER.id,
      blockeeId: BLOCKEE.id,
    } satisfies Parameters<Awaited<typeof handleBlockAccount>>[0];

    // Act
    // ---

    const event = await handleBlockAccount(BLOCK_ACCOUNT_DATA);

    // Assert
    // ------

    expect(event.type).toBe("ACCOUNT_NOT_BLOCKED/ALREADY_BLOCKED");
    expect(event.payload).toMatchObject({
      blockerId: BLOCKER.id,
      blockeeId: BLOCKEE.id,
    });

    const updatedBlocker = await accountRepository.getById(BLOCKER.id);
    expect(updatedBlocker!.blockedAccounts).toContain(BLOCKEE.id);
  });
});
