import { describe, expect, test } from "@jest/globals";

import { parseAccount } from "./account";

describe("parseAccount", () => {
  const validAccountData = {};

  test("it returns a valid entity if the data to parse is valid", () => {
    expect(parseAccount(validAccountData)).toEqual(validAccountData);
  });

  test("it throws an error if 'id' is invalid", () => {
    // TODO: COMPLETE ME!
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
});
