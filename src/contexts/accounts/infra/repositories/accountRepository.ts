import { Account } from "~/contexts/accounts/core/aggregates/account";

// Types
// -----

type AccountEntities = Omit<Account, "followers">[];
type AccountFollowersEntities = Array<
  Account["followers"][0] & {
    followingId: Account["id"];
  }
>;

// In-memory persistence
// ---------------------

const accounts: AccountEntities = [];
const accountFollowers: AccountFollowersEntities = [];

// Mappers
// -------

const mapToAggregate = (persistenceData: any): Account => {
  // complete me
};

const mapToPersistenceData = (account: Account): any => {
  // complete me
};

// Repository
// ----------

export const accountRepository = {
  save: async (account: Account): Promise<void> => {
    // Complete me
  },
  getById: async (id: string): Promise<Account> => {
    // Complete me
  },
  getByEmail: async (email: string): Promise<Account> => {
    // Complete me
  },
  getByUsername: async (username: string): Promise<Account> => {
    // Complete me
  },
};
