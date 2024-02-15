import { Account, parseAccount } from "../../core/entities/account";

// Types
// -----

/**
 * This type is a fake representation of a database schema. The in-memory
 * data store below only allows account entity data in this format, which
 * requires us to map between the two in the repository.
 */
type AccountPersistenceData = {
  id__field: string;
  email__field: string;
  username__field: string;
  password__field: string;
  followers__field: string[];
  blocked_accounts__field: string[];
};

// In-memory data store
// --------------------

const accounts: Record<
  AccountPersistenceData["id__field"],
  AccountPersistenceData
> = {};

// Mappers
// -------

const mapToAccount = (
  accountPersistenceData: AccountPersistenceData
): Account => {
  const account: Account = {
    id: accountPersistenceData.id__field,
    email: accountPersistenceData.email__field,
    username: accountPersistenceData.username__field,
    password: accountPersistenceData.password__field,
    followers: accountPersistenceData.followers__field,
    blockedAccounts: accountPersistenceData.blocked_accounts__field,
  };

  return parseAccount(account);
};

const mapToAccountPersistenceData = (
  account: Account
): AccountPersistenceData => {
  const parsedAccount = parseAccount(account);

  const accountPersistenceData: AccountPersistenceData = {
    id__field: parsedAccount.id,
    email__field: parsedAccount.email,
    username__field: parsedAccount.username,
    password__field: parsedAccount.password,
    followers__field: parsedAccount.followers,
    blocked_accounts__field: parsedAccount.blockedAccounts,
  };

  return accountPersistenceData;
};

// Repository
// ----------

export const accountRepository = {
  save: async (account: Account) => {
    const accountPersistenceData = mapToAccountPersistenceData(account); // Parse and map account to persistence data format before persisting
    accounts[accountPersistenceData.id__field] = accountPersistenceData; // Persist account data
  },
  getById: async (id: Account["id"]) => {
    const account = accounts[id]; // Fetch account from persistence (may be undefined)
    return account ? mapToAccount(account) : null; // Map to a valid account before returning
  },
  getByEmail: async (email: Account["email"]) => {
    const account = Object.values(accounts).find(
      (acc) => acc.email__field === email
    ); // Fetch account from persistence (may be undefined)
    return account ? mapToAccount(account) : null; // Ensure account is valid before returning
  },
  getByUsername: async (username: Account["username"]) => {
    const account = Object.values(accounts).find(
      (acc) => acc.username__field === username
    ); // Fetch account from persistence (may be undefined)
    return account ? mapToAccount(account) : null; // Ensure account is valid before returning
  },
};
