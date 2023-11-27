// Types
// -----

type PersistedAccount = {
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

// In-memory store
// ---------------

const accounts: PersistedAccount[] = [];

// Mappers
// -------

const mapToEntity = (persistenceData: any): any => {
  // TODO: COMPLETE ME!
};

const mapToPersistenceData = (account: any): any => {
  // TODO: COMPLETE ME!
};

// Repository
// ----------

export const accountRepository = {
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
