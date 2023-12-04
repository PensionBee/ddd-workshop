import { describe, expect, test } from "@jest/globals";
import { accountRepository } from "./accountRepository";

describe("accountRepository", () => {
  test("It persists a valid account entity", async () => {
    const validAccount = {
      id: "account-1",
      email: "testemail@test.com",
      username: "testusername",
      password: "password123",
      followers: [],
    };
    await accountRepository.save(validAccount);

    const persistedAccount = await accountRepository.getById("account-1");

    expect(persistedAccount).toEqual(validAccount);
  });
  test("It throws an error if trying to persist an invalid account entity", async () => {
    const invalidAccount = {
      id: "INVALID_ID",
      email: "testemail@test.com",
      username: "testusername",
      password: "password123",
      followers: [],
    };

    expect(
      async () => await accountRepository.save(invalidAccount)
    ).rejects.toThrowError();
  });
});
