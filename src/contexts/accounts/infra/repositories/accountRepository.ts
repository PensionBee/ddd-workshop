// In-memory data store
// --------------------

import { Account, parseAccount } from "../../core/entities/account";

/**
 * This is a fake representation of a database schema.
 * The in-memory data store below only accepts account entity data
 * in this format, which requires us to map between the two formats
 * in our repository.
 */
type AccountPersistenceData = {
  id__c: string;
  email__c: string;
  username__c: string;
  password__c: string;
  followers__c: {
    id__c: string;
    follower_id__c: string;
    followed_at__c: string;
  }[];
};

const accounts: Record<
  AccountPersistenceData["id__c"],
  AccountPersistenceData
> = {};

// Mappers
// -------

const mapToAccount = (
  accountPersistenceData: AccountPersistenceData
): Account => {
  const account: Account = {
    id: accountPersistenceData.id__c,
    email: accountPersistenceData.email__c,
    username: accountPersistenceData.username__c,
    password: accountPersistenceData.password__c,
    followers: accountPersistenceData.followers__c.map((f) => ({
      id: f.id__c,
      followerId: f.follower_id__c,
      followedAt: f.followed_at__c,
    })),
  };

  return parseAccount(account);
};

const mapToAccountPersistenceData = (
  account: Account
): AccountPersistenceData => {
  const parsedAccount = parseAccount(account);

  const accountPersistenceData: AccountPersistenceData = {
    id__c: parsedAccount.id,
    email__c: parsedAccount.email,
    username__c: parsedAccount.username,
    password__c: parsedAccount.password,
    followers__c: parsedAccount.followers.map((f) => ({
      id__c: f.id,
      follower_id__c: f.followerId,
      followed_at__c: f.followedAt,
    })),
  };

  return accountPersistenceData;
};

// Repository
// ----------

export const accountRepository = {
  save: async (account: Account) => {
    const accountPersistenceData = mapToAccountPersistenceData(account); // Parse and map account to persistence data format before persisting
    accounts[accountPersistenceData.id__c] = accountPersistenceData; // Persist account data
  },
  getById: async (id: Account["id"]) => {
    const account = accounts[id]; // Fetch account from persistence (may be undefined)
    return account ? mapToAccount(account) : null; // Map to a valid account before returning
  },
  getByEmail: async (email: Account["email"]) => {
    const account = accounts[email]; // Fetch account from persistence (may be undefined)
    return account ? mapToAccount(account) : null; // Ensure account is valid before returning
  },
  getByUsername: async (username: Account["username"]) => {
    const account = accounts[username]; // Fetch account from persistence (may be undefined)
    return account ? mapToAccount(account) : null; // Ensure account is valid before returning
  },
};
