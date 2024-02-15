import { describe, expect, test } from "@jest/globals";

import { Account, parseAccount } from "./account";

describe("parseAccount", () => {
  const validAccountData: Account = {
    id: "account-1",
    email: "test@test.com",
    username: "username",
    password: "password123",
    followers: [
      {
        id: "accountFollower-1",
        followerId: "account-2",
        followedAt: "2008-09-10T12:34:56Z",
      },
    ],
    blockedAccounts: [
      {
        id: "blockedAccount-1",
        blockedAccountId: "account-3",
        blockedAt: "2010-09-10T12:34:56Z",
      },
    ],
  };

  test("it returns a valid entity if the data to parse is valid", () => {
    expect(parseAccount(validAccountData)).toEqual(validAccountData);
  });

  test("it throws an error if 'id' is invalid", () => {
    const invalidValues = [
      undefined,
      null,
      true,
      false,
      1,
      {},
      "x",
      "notPost-1",
    ];
    invalidValues.forEach((invalidValue) => {
      expect(() =>
        parseAccount({ ...validAccountData, id: invalidValue } as any as any)
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
        parseAccount({ ...validAccountData, email: invalidValue } as any)
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
        parseAccount({ ...validAccountData, username: invalidValue } as any)
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
        parseAccount({ ...validAccountData, password: invalidValue } as any)
      ).toThrowError();
    });
  });

  test("it throws an error if 'followers' is invalid", () => {
    const invalidValues = [
      undefined,
      null,
      true,
      false,
      1,
      {},
      "x",
      {
        id: "notAccountFollower-1",
        followerId: "account-2",
        followedAt: "2008-09-10T12:34:56Z",
      },
      {
        id: "accountFollower-1",
        followerId: "notAccount-2",
        followedAt: "2008-09-10T12:34:56Z",
      },
      {
        id: "accountFollower-1",
        followerId: "notAccount-2",
        followedAt: "not-a-date-string",
      },
    ];
    invalidValues.forEach((invalidValue) => {
      expect(() =>
        parseAccount({ ...validAccountData, followers: invalidValue } as any)
      ).toThrowError();
    });
  });
});
