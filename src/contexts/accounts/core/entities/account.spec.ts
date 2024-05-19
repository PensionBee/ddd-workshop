import { describe, expect, test } from "@jest/globals";

import { parseAccount, type Account } from "./account";

describe("parseAccount", () => {
  const validAccount: Account = {
    id: "account-1234",
    email: "test@test.com",
    username: "account1234",
    password: "password123",
  };

  test("it returns a valid entity if the data to parse is valid", () => {
    expect(parseAccount(validAccount)).toEqual(validAccount);
  });

  test("it throws an error if 'id' is invalid", () => {
    const invalidIds = [null, undefined, {}, true, false, "fail-1234", 1234];

    invalidIds.forEach((invalidId) => {
      expect(
        parseAccount({
          ...validAccount,
          id: invalidId,
        })
      ).toThrow();
    });
  });

  // TODO: complete me
});
