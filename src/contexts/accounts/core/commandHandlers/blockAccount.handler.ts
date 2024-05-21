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
  blocker: Account;
  blockee: Account;
};
type Event = AccountBlockedEvent | AccountNotBlockedEvent;

// Command data schema
// -------------------

const commandDataSchema = z.object({
  blockerId: accountSchema.shape.id,
  blockeeId: accountSchema.shape.id,
});

// Deriver
// -------

const deriveEvent = (_data: Data, state: State): Event => {
  const { blocker, blockee } = state;

  if (blocker.blockedAccounts.includes(blockee.id)) {
    return {
      type: "ACCOUNT_NOT_BLOCKED/ALREADY_BLOCKED",
      payload: {
        blockerId: blocker.id,
        blockeeId: blockee.id,
      },
    };
  }

  return {
    type: "ACCOUNT_BLOCKED",
    payload: {
      blockerId: blocker.id,
      blockeeId: blockee.id,
    },
  };
};

// Command handler
// ---------------

export const handleBlockAccount = async (commandData: Data): Promise<Event> => {
  // Step 1: Parse command data

  const data = commandDataSchema.parse(commandData);

  // Step 2: Fetch state

  const blocker = await accountRepository.getById(data.blockerId);
  if (!blocker) {
    throw new Error("Blocking account not found");
  }

  const blockee = await accountRepository.getById(data.blockeeId);
  if (!blockee) {
    throw new Error("Account to blcok not found");
  }

  const state: State = {
    blocker,
    blockee,
  };

  // Step 3: Derive an event

  const event = deriveEvent(data, state);

  // Step 4: Update state

  switch (event.type) {
    case "ACCOUNT_BLOCKED":
      accountRepository.save({
        ...state.blocker,
        blockedAccounts: [
          ...state.blocker.blockedAccounts,
          event.payload.blockeeId,
        ],
      });
      break;
  }

  // Step 5: Publish and return the event

  publishEvent(event);

  return event;
};
