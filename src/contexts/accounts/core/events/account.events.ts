import { type Account } from "../entities/account";

// Success events
// --------------

export type AccountRegisteredEvent = {
  type: "ACCOUNT_REGISTERED";
  payload: {
    id: Account["id"];
    email: Account["email"];
    username: Account["username"];
    password: Account["password"];
    followers: Account["followers"];
    blockedAccounts: Account["blockedAccounts"];
  };
};

export type AccountFollowedEvent = {
  type: "ACCOUNT_FOLLOWED";
  payload: {
    // TODO: complete me
  };
};

export type AccountBlockedEvent = {
  type: "ACCOUNT_BLOCKED";
  payload: {
    // TODO: complete me
  };
};

// Fail events
// -----------

// TODO: complete me
