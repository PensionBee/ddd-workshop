import { describe, expect, test } from "@jest/globals";

import { Account } from "../../core/entities/account";
import { accountRepository } from "./accountRepository";

describe("accountRepository", () => {
  const validAccount: Account = {
    id: "account-1",
    email: "testemail@test.com",
    username: "testusername",
    password: "password123",
    followers: [],
    blockedAccounts: [],
  };

  const invalidAccount = {
    ...validAccount,
    id: "INVALID_ID",
  };

  test("It persists a valid account entity", async () => {
    await accountRepository.save(validAccount);

    const persistedAccount = await accountRepository.getById("account-1");

    expect(persistedAccount).toEqual(validAccount);
  });
  test("It fetches the correct account entity when fetching by email", async () => {
    const persistedAccountByEmail =
      await accountRepository.getByEmail("testemail@test.com");

    expect(persistedAccountByEmail).toEqual(validAccount);
  });
  test("It fetches the correct account entity when fetching by username", async () => {
    const persistedAccountByUsername =
      await accountRepository.getByUsername("testusername");

    expect(persistedAccountByUsername).toEqual(validAccount);
  });
  test("It throws an error if trying to persist an invalid account entity", async () => {
    const saveInvalidAccount = async () =>
      await accountRepository.save(invalidAccount);

    expect(saveInvalidAccount).rejects.toThrowError();
  });
});
