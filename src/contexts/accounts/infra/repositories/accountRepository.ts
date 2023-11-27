import { Account } from "~/contexts/accounts/core/entities/account";

// Types
// -----

type AccountRepository = {
  save: (account: Account) => Promise<void>;
  getById: (id: string) => Promise<Account | null>;
  getByEmail: (email: string) => Promise<Account | null>;
  getByUsername: (username: string) => Promise<Account | null>;
};

/**
 * Let's assume that LegacyAccount is an old version of our `Account` entity
 * and that some persisted entities still match this version.
 *
 * Note: The only difference is that 'username' used to be called 'tag'
 */
type LegacyAccount = {
  id: string;
  email: string;
  tag: string;
  password: string;
  followers: {
    id: string;
    followerId: string;
    followedAt: string;
  }[];
};

// In-memory store
// ---------------

const accounts: Account | LegacyAccount[] = [];

// Mappers
// -------

const mapToEntity = (persistenceData: any): Account => {
  // TODO: COMPLETE ME!
};

const mapToPersistenceData = (account: Account): any => {
  // TODO: COMPLETE ME!
};

// Repository
// ----------

export const accountRepository: AccountRepository = {
  save: async (account) => {
    // TODO: COMPLETE ME!
  },
  getById: async (id) => {
    // TODO: COMPLETE ME!
  },
  getByEmail: async (email) => {
    // TODO: COMPLETE ME!
  },
  getByUsername: async (username) => {
    // TODO: COMPLETE ME!
  },
};
