import { describe, expect, test } from "@jest/globals";

import { parseAccount } from "./account";

describe("parseAccount", () => {
  const validAccountData = {
    id: "account-1234",
    email: "test@test.com",
    username: "account1234",
    password: "password123",
  };

  test("it returns a valid entity if the data to parse is valid", () => {
    expect(parseAccount(validAccountData)).toEqual(validAccountData);
  });

  test("it throws an error if 'id' is invalid", () => {
    const invalidId = null;

    expect(
      parseAccount({
        ...validAccountData,
        id: invalidId,
      } as any)
    ).toThrow();

    // Maybe we want to test other invalid IDs?
  });

  test("it throws an error if 'email' is invalid", () => {
    // TODO: COMPLETE ME!
  });

  test("it throws an error if 'username' is invalid", () => {
    // TODO: COMPLETE ME!
  });

  test("it throws an error if 'password' is invalid", () => {
    // TODO: COMPLETE ME!
  });

  test("it throws an error if 'followers' is invalid", () => {
    // TODO: COMPLETE ME!
  });

  test("it throws an error if 'blockedAccounts' is invalid", () => {
    // TODO: COMPLETE ME!
  });
});
