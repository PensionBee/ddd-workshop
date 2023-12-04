// In-memory data store
// --------------------

/**
 * Represents a database schema. The in-memory data store
 * below only accepts account entity data in this format,
 * which requires us to map between the two formats in our
 * repository.
 */
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

const accounts: Record<PersistedAccount["id__c"], PersistedAccount> = {};

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
  save: async (account: any) => {
    // TODO: COMPLETE ME!
  },
  getById: async (id: any) => {
    // TODO: COMPLETE ME!
  },
  getByEmail: async (email: any) => {
    // TODO: COMPLETE ME!
  },
  getByUsername: async (username: any) => {
    // TODO: COMPLETE ME!
  },
};
