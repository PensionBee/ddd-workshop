import { describe, expect, test } from "@jest/globals";

import { parseAccount } from "./account";

describe("parseAccount", () => {
  test("It returns a valid entity if the data to parse is valid", () => {
    const data = {
      id: "account-1",
      email: "testemail@test.com",
      username: "testusername",
      password: "password123",
      followers: [
        {
          id: "accountFollower-1",
          followerId: "account-2",
          followedAt: "2008-09-10T12:34:56Z",
        },
      ],
    };
    const account = parseAccount(data);
    expect(account).toEqual(data);
  });
  test("It throws an error if required data is missing", () => {
    const validData = {
      id: "account-1",
      email: "testemail@test.com",
      username: "testusername",
      password: "password123",
      followers: [],
    };
    expect(() => parseAccount({ ...validData, id: undefined })).toThrowError();
    expect(() =>
      parseAccount({ ...validData, email: undefined })
    ).toThrowError();
    expect(() =>
      parseAccount({ ...validData, username: undefined })
    ).toThrowError();
    expect(() =>
      parseAccount({ ...validData, password: undefined })
    ).toThrowError();
    expect(() =>
      parseAccount({ ...validData, followers: undefined })
    ).toThrowError();
  });
  test("It throws an error if data is invalid", () => {
    const validData = {
      id: "account-1",
      email: "testemail@test.com",
      username: "testusername",
      password: "password123",
      followers: [],
    };
    expect(() => parseAccount({ ...validData, id: "abc123" })).toThrowError();
    expect(() =>
      parseAccount({ ...validData, email: "testemail" })
    ).toThrowError();
    expect(() =>
      parseAccount({ ...validData, username: "user" })
    ).toThrowError();
    expect(() =>
      parseAccount({ ...validData, password: "passwd" })
    ).toThrowError();
    expect(() =>
      parseAccount({ ...validData, followers: ["abc123"] })
    ).toThrowError();
  });
});
