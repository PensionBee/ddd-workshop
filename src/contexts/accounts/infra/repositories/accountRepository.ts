import { Account } from "~/contexts/accounts/core/entities/account";

// Types
// -----

type AccountRepository = {
  save: (account: Account) => Promise<void>;
  getById: (id: string) => Promise<Account | null>;
  getByEmail: (email: string) => Promise<Account | null>;
  getByUsername: (username: string) => Promise<Account | null>;
};

// In-memory store
// ---------------

const accounts: Account[] = [];

// Mappers
// -------

const maptoEntity = (persistenceData: any): Account => {
  // complete me
};

const mapToPersistenceData = (account: Account): any => {
  // complete me
};

// Repository
// ----------

export const accountRepository: AccountRepository = {
  save: async (account) => {
    // Complete me
  },
  getById: async (id) => {
    // Complete me
  },
  getByEmail: async (email) => {
    // Complete me
  },
  getByUsername: async (username) => {
    // Complete me
  },
};
