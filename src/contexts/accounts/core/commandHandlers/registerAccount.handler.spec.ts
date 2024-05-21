import { describe, expect, test } from "@jest/globals";

import { accountRepository } from "../../infra/repositories/accountRepository";
import { type Account } from "../entities/account";
import { AccountRegisteredEvent } from "../events/account.events";
import { handleRegisterAccount } from "./registerAccount.handler";

describe("handleRegisterAccount", () => {
  test("should register an account", async () => {
    // Arrange
    // -------
    // Define command data
    const REGISTER_ACCOUNT_DATA = {
      username: "test-username",
      email: "test-email@test.com",
      password: "password",
    } satisfies Parameters<Awaited<typeof handleRegisterAccount>>[0];

    // Act
    // ---

    const event = await handleRegisterAccount(REGISTER_ACCOUNT_DATA);

    // Assert
    // ------

    expect(event.type).toBe("ACCOUNT_REGISTERED");
    expect(event.payload).toMatchObject({
      id: expect.any(String),
      username: REGISTER_ACCOUNT_DATA.username,
      email: REGISTER_ACCOUNT_DATA.email,
      password: REGISTER_ACCOUNT_DATA.password,
    });

    const registeredUser = await accountRepository.getById(
      (event as AccountRegisteredEvent).payload.id
    );
    expect(registeredUser).toBeDefined();
  });

  Object.entries({
    username: `${Math.random()}`,
    email: `${Math.random()}@test.com`,
  }).forEach(([testAttribute, testValue]) =>
    test(`should not register an account if an account with the same ${testAttribute} exists`, async () => {
      // Arrange
      // -------
      // Create test entities
      const ACCOUNT: Account = {
        id: `account-${Math.random()}`,
        username: testAttribute === "username" ? testValue : `${Math.random()}`,
        email:
          testAttribute === "email" ? testValue : `${Math.random()}@test.com`,
        password: "password",
        followers: [],
        blockedAccounts: [],
      };

      // Persist entities
      await accountRepository.save(ACCOUNT);

      // Define command data
      const REGISTER_ACCOUNT_DATA = {
        username: ACCOUNT.username,
        email: ACCOUNT.email,
        password: "password",
      } satisfies Parameters<Awaited<typeof handleRegisterAccount>>[0];

      // Act
      // ---

      const event = await handleRegisterAccount(REGISTER_ACCOUNT_DATA);

      // Assert
      // ------

      expect(event.type).toBe("ACCOUNT_NOT_REGISTERED/ALREADY_EXISTS");
      expect(event.payload).toMatchObject({
        accountId: ACCOUNT.id,
      });
    })
  );
});
