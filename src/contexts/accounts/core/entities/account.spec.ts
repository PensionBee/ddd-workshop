import { describe, expect, test } from "@jest/globals";

import { Account, parseAccount } from "./account";

describe("parseAccount", () => {
  const validAccountData: Account = {
    id: "account-1",
    email: "test@test.com",
    username: "username",
    password: "password123",
    followers: ["account-2", "account-3"],
    blockedAccounts: ["account-4", "account-5"],
  };

  test("it returns a valid entity if the data to parse is valid", () => {
    expect(parseAccount(validAccountData)).toEqual(validAccountData);
  });

  test("it throws an error if 'id' is invalid", () => {
    const invalidValues = [
      null,
      undefined,
      {},
      true,
      false,
      "x",
      "notAccount-1234",
      1234,
    ];
    invalidValues.forEach((invalidValue) => {
      expect(() =>
        parseAccount({
          ...validAccountData,
          id: invalidValue,
        })
      ).toThrowError();
    });
  });

  test("it throws an error if 'email' is invalid", () => {
    const invalidValues = [
      undefined,
      null,
      true,
      false,
      1,
      {},
      "x",
      "something@something",
      "something.something",
    ];
    invalidValues.forEach((invalidValue) => {
      expect(() =>
        parseAccount({ ...validAccountData, email: invalidValue })
      ).toThrowError();
    });
  });

  test("it throws an error if 'username' is invalid", () => {
    const invalidValues = [
      undefined,
      null,
      true,
      false,
      1,
      {},
      "x",
      "x".repeat(33),
    ];
    invalidValues.forEach((invalidValue) => {
      expect(() =>
        parseAccount({ ...validAccountData, username: invalidValue })
      ).toThrowError();
    });
  });

  test("it throws an error if 'password' is invalid", () => {
    const invalidValues = [
      undefined,
      null,
      true,
      false,
      1,
      {},
      "x",
      "x".repeat(65),
    ];
    invalidValues.forEach((invalidValue) => {
      expect(() =>
        parseAccount({ ...validAccountData, password: invalidValue })
      ).toThrowError();
    });
  });

  test("it throws an error if 'followers' is invalid", () => {
    const invalidValues = [undefined, null, true, false, 1, {}, "x"];
    invalidValues.forEach((invalidValue) => {
      expect(() =>
        parseAccount({
          ...validAccountData,
          followers: invalidValue,
        })
      ).toThrowError();
    });
  });

  test("it throws an error if 'blockedAccounts' is invalid", () => {
    const invalidValues = [undefined, null, true, false, 1, {}, "x"];
    invalidValues.forEach((invalidValue) => {
      expect(() =>
        parseAccount({
          ...validAccountData,
          blockedAccounts: invalidValue,
        })
      ).toThrowError();
    });
  });
});
