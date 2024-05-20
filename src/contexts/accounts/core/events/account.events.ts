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
    followererId: Account["id"];
    accountFollowed: Account["id"];
  };
};

export type AccountBlockedEvent = {
  type: "ACCOUNT_BLOCKED";
  payload: {
    blockerId: Account["id"];
    blockedAccountId: Account["id"];
  };
};

export type FollowerRemovedEvent = {
  type: "FOLLOWER_REMOVED";
  payload: {
    accountId: Account["id"];
    followerId: Account["id"];
  };
};

// Fail events
// -----------

export type AccountNotRegisteredEvent = {
  type: "ACCOUNT_NOT_REGISTERED/ALREADY_EXISTS";
  payload: {
    accountId: Account["id"];
  };
};

export type AccountNotFollowedEvent =
  | {
      type: "ACCOUNT_NOT_FOLLOWED/ALREADY_FOLLOWING";
      payload: {
        followererId: Account["id"];
        accountToFollowId: Account["id"];
      };
    }
  | {
      type: "ACCOUNT_NOT_FOLLOWED/BLOCKED";
      payload: {
        followererId: Account["id"];
        accountToFollowId: Account["id"];
      };
    };

export type AccountNotBlockedEvent = {
  type: "ACCOUNT_NOT_BLOCKED/ALREADY_BLOCKED";
  payload: {
    blockerId: Account["id"];
    blockedAccountId: Account["id"];
  };
};

export type FollowerNotRemovedEvent = {
  type: "FOLLOWER_NOT_REMOVED/NOT_FOLLOWING";
  payload: {
    accountId: Account["id"];
    followerId: Account["id"];
  };
};
