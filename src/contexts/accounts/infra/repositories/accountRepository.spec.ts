import { describe, expect, test } from "@jest/globals";

import { type Account } from "../../core/entities/account";
import { accountRepository } from "./accountRepository";

describe("accountRepository", () => {
  const VALID_TEST_ACCOUNT: Account = {
    id: "account-1",
    email: "testemail@test.com",
    username: "testusername",
    password: "password123",
    followers: [],
    blockedAccounts: [],
  };

  const INVALID_TEST_ACCOUNT: Account = {
    ...VALID_TEST_ACCOUNT,
    id: "INVALID_ID",
  };

  test("Should save a valid Account and fetch it by it's ID", async () => {
    await accountRepository.save(VALID_TEST_ACCOUNT);

    const persistedAccount = await accountRepository.getById(
      VALID_TEST_ACCOUNT.id
    );

    expect(persistedAccount).toEqual(VALID_TEST_ACCOUNT);
  });

  test("Should not save an invalid Account", async () => {
    const saveInvalidAccount = async () =>
      await accountRepository.save(INVALID_TEST_ACCOUNT);

    expect(saveInvalidAccount).rejects.toThrowError();
  });

  test("Should fetch an Account by it's email", async () => {
    const persistedAccountByEmail = await accountRepository.getByEmail(
      VALID_TEST_ACCOUNT.email
    );

    expect(persistedAccountByEmail).toEqual(VALID_TEST_ACCOUNT);
  });

  test("Should fetch an Account by it's username", async () => {
    const persistedAccountByUsername = await accountRepository.getByUsername(
      VALID_TEST_ACCOUNT.username
    );

    expect(persistedAccountByUsername).toEqual(VALID_TEST_ACCOUNT);
  });
});
