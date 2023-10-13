import { describe, expect, test } from "@jest/globals";
import { parseAccount } from "./account";

describe("parseAccount", () => {
  test("It returns a valid Account entity if the data to parse is valid", () => {
    const account = parseAccount({
      id: "abc123",
      email: "testemail@test.com",
      username: "testusername",
      password: "password123",
    });
    expect(account).toEqual({
      id: "abc123",
      email: "testemail@test.com",
      username: "testusername",
      password: "password123",
    });
  });
  test("It throws an error if required data is missing", () => {
    const data = {
      id: "abc123",
      email: "testemail@test.com",
      username: "testusername",
      password: "password123",
    };
    const requiredValues = Object.keys(data);
    requiredValues.forEach((attribute) => {
      const testData = { ...data };
      delete testData[attribute as keyof typeof data];
      expect(() => parseAccount(testData)).toThrowError();
    });
  });
  test("It throws an error if data is invalid", () => {
    const data = {
      id: "abc123",
      email: "testemail@test.com",
      username: "testusername",
      password: "password123",
    };
    const failingPermutations = {
      email: "testemail",
      username: "user",
      password: "passwd",
    };
    Object.entries(failingPermutations).forEach(([attribute, value]) => {
      const testData = { ...data };
      testData[attribute as keyof typeof data] = value;
      expect(() => parseAccount(testData)).toThrowError();
    });
  });
});
