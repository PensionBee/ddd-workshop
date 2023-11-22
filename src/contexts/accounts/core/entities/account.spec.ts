import { describe, expect, test } from "@jest/globals";

import { parseAccount } from "./account";

describe("parseAccount", () => {
  test("It returns a valid entity if the data to parse is valid", () => {
    const account = parseAccount({
      id: "account-1",
      email: "testemail@test.com",
      username: "testusername",
      password: "password123",
      // TODO: COMPLETE ME!
    });
    expect(account).toEqual({
      id: "account-1",
      email: "testemail@test.com",
      username: "testusername",
      password: "password123",
      // TODO: COMPLETE ME!
    });
  });
  test("It throws an error if required data is missing", () => {
    const validData = {
      id: "account-1",
      email: "testemail@test.com",
      username: "testusername",
      password: "password123",
      // TODO: COMPLETE ME!
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
    // TODO: COMPLETE ME!
  });
  test("It throws an error if data is invalid", () => {
    const validData = {
      id: "account-1",
      email: "testemail@test.com",
      username: "testusername",
      password: "password123",
      // TODO: COMPLETE ME!
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
    // TODO: COMPLETE ME!
  });
});
