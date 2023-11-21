import {
  Account,
} from "~/contexts/accounts/core/entities/account";

const convertToAccount = (persistenceData: ?): Account => {
  // complete me
}

const convertToPersistenceData = (account: Account): ? => {
  // complete me
}

export const accountRepository = {
  save: async (account: Account): Promise<void> => {
        // Complete me
  },
  getById: async (id: string) => {
    // Complete me
  }
  getByEmail: async (email: string) => {
    // Complete me
  }
  getByUsername: async (username: string) => {
    // Complete me
  }
};
