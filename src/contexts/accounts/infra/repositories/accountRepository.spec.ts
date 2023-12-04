import { describe, expect, test } from "@jest/globals";
import { accountRepository } from "./accountRepository";

describe("accountRepository", () => {
  const validAccount = {
    id: "account-1",
    email: "testemail@test.com",
    username: "testusername",
    password: "password123",
    followers: [],
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
  test("It throws an error if trying to persist an invalid account entity", async () => {
    const saveInvalidAccount = async () =>
      await accountRepository.save(invalidAccount);

    expect(saveInvalidAccount).rejects.toThrowError();
  });
});
