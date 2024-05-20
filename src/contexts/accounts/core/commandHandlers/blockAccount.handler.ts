import { z } from "zod";

import { publishEvent } from "../../../../shared/infra/pubSub";
import { accountRepository } from "../../infra/repositories/accountRepository";
import { accountSchema, type Account } from "../entities/account";
import {
  type AccountBlockedEvent,
  type AccountNotBlockedEvent,
} from "../events/account.events";

// Types
// -----

type Data = z.infer<typeof commandDataSchema>;
type State = {
  blockingAccount: Account;
  accountToBlock: Account;
};
type Event = AccountBlockedEvent | AccountNotBlockedEvent;

// Command data schema
// -------------------

const commandDataSchema = z.object({
  blockerId: accountSchema.shape.id,
  accountToBlockId: accountSchema.shape.id,
});

// Deriver
// -------

const deriveEvent = (data: Data, state: State): Event => {
  const { blockingAccount, accountToBlock } = state;

  if (blockingAccount.blockedAccounts.includes(accountToBlock.id)) {
    return {
      type: "ACCOUNT_NOT_BLOCKED/ALREADY_BLOCKED",
      payload: {
        blockerId: blockingAccount.id,
        blockedAccountId: accountToBlock.id,
      },
    };
  }

  return {
    type: "ACCOUNT_BLOCKED",
    payload: {
      blockerId: blockingAccount.id,
      blockedAccountId: accountToBlock.id,
    },
  };
};

// Command handler
// ---------------

export const handleBlockAccount = async (commandData: Data): Promise<Event> => {
  // Step 1: Parse incoming Command data
  // -----------------------------------

  const data = commandDataSchema.parse(commandData);

  // Step 2: Fetch relevant 'state' (previously persisted Entities necessary to process the Command)
  // -----------------------------------------------------------------------------------------------
  const blockingAccount = await accountRepository.getById(data.blockerId);
  if (!blockingAccount) {
    throw new Error("Blocking account not found");
  }

  const accountToBlock = await accountRepository.getById(data.accountToBlockId);
  if (!accountToBlock) {
    throw new Error("Account to blcok not found");
  }

  const state: State = {
    blockingAccount,
    accountToBlock,
  };

  // Step 3: 'Derive an event' (given Command data and fetched state)
  // ----------------------------------------------------------------

  const event = deriveEvent(data, state);

  // Step 4: Update the state of the system (for success Events)
  // -----------------------------------------------------------

  switch (event.type) {
    case "ACCOUNT_BLOCKED":
      accountRepository.save({
        ...state.blockingAccount,
        blockedAccounts: [
          ...state.blockingAccount.blockedAccounts,
          event.payload.blockedAccountId,
        ],
      });
      break;
  }

  // Step 5: Publish the Event
  // -------------------------

  publishEvent(event);

  return event;
};
