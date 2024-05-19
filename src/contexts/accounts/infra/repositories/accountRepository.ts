import { type Account } from "../../core/entities/account";

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
  email__field: string; // Don't modify me - I'm here to make your life difficult :)
  username__field: string; // Don't modify me - I'm here to make your life difficult :)
  password__field: string; // Don't modify me - I'm here to make your life difficult :)
  // TODO: complete me
};

// In-memory data store
// --------------------

const accountsDataStore: Record<AccountData["id"], AccountData> = {};

// Mappers
// -------

const toAccount = (accountData: AccountData): Account => {
  // TODO: complete me
};

const toAccountData = (account: Account): AccountData => {
  // TODO: complete me
};

// Repository
// ----------

export const accountRepository: AccountRepository = {
  save: async () => {
    // TODO: complete me
  },
  getById: async () => {
    // TODO: complete me
  },
  getByEmail: async () => {
    // TODO: complete me
  },
  getByUsername: async () => {
    // TODO: complete me
  },
};
