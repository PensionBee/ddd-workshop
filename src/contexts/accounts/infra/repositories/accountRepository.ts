// Types
// -----

/**
 * This type is a fake representation of a database schema. The in-memory
 * data store below only allows account entity data in this format, which
 * requires us to map between the two in the repository.
 */
type AccountPersistenceData = {
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

// In-memory data store
// --------------------

const accounts: Record<
  AccountPersistenceData["id__c"],
  AccountPersistenceData
> = {};

// Mappers
// -------

const mapToAccount = (accountPersistenceData: any): any => {
  // TODO: COMPLETE ME!
};

const mapToAccountPersistenceData = (account: any): any => {
  // TODO: COMPLETE ME!
};

// Repository
// ----------

export const accountRepository = {
  save: async () => {
    // TODO: COMPLETE ME!
  },
  getById: async () => {
    // TODO: COMPLETE ME!
  },
  getByEmail: async () => {
    // TODO: COMPLETE ME!
  },
  getByUsername: async () => {
    // TODO: COMPLETE ME!
  },
};
