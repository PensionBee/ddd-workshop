import { parseAccount, type Account } from "../../core/entities/account";

// Types
// -----

type AccountRepository = {
  save: (account: Account) => Promise<void>;
  getById: (id: Account["id"]) => Promise<Account | null>;
  getByEmail: (email: Account["email"]) => Promise<Account | null>;
  getByUsername: (username: Account["username"]) => Promise<Account | null>;
};

/**
 * This is a fake representation of a database schema. The in-memory
 * data store below only allows account entity data in this format,
 * which may require us to map between the two.
 */
type AccountData = {
  id: string;
  email__field: string;
  username__field: string;
  password__field: string;
  followers__field: string[];
  blocked_accounts__field: string[];
};

// In-memory data store
// --------------------

const accountsDataStore: Record<AccountData["id"], AccountData> = {};

// Mappers
// -------

const toAccount = (accountData: AccountData): Account =>
  parseAccount({
    id: accountData.id,
    email: accountData.email__field,
    username: accountData.username__field,
    password: accountData.password__field,
    followers: accountData.followers__field,
    blockedAccounts: accountData.blocked_accounts__field,
  });

const toAccountData = (account: Account): AccountData => {
  const parsedAccount = parseAccount(account);

  return {
    id: parsedAccount.id,
    email__field: parsedAccount.email,
    username__field: parsedAccount.username,
    password__field: parsedAccount.password,
    followers__field: parsedAccount.followers,
    blocked_accounts__field: parsedAccount.blockedAccounts,
  };
};

// Repository
// ----------

export const accountRepository: AccountRepository = {
  save: async (account) => {
    const accountData = toAccountData(account);
    accountsDataStore[accountData.id] = accountData;
  },
  getById: async (id) => {
    const account = accountsDataStore[id];
    return account ? toAccount(account) : null;
  },
  getByEmail: async (email) => {
    const account = Object.values(accountsDataStore).find(
      (acc) => acc.email__field === email
    );
    return account ? toAccount(account) : null;
  },
  getByUsername: async (username) => {
    const account = Object.values(accountsDataStore).find(
      (acc) => acc.username__field === username
    );
    return account ? toAccount(account) : null;
  },
};
