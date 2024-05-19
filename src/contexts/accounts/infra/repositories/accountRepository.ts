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
  email: string;
  username: string;
  password: string;
  followers: {
    id: string;
    follower_id: string;
    followed_at: string;
  }[];
};

// In-memory data store
// --------------------

const accounts: Record<AccountData["id"], AccountData> = {};

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
