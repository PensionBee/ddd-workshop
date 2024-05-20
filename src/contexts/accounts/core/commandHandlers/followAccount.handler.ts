import { z } from "zod";

import { publishEvent } from "../../../../shared/infra/pubSub";
import { accountRepository } from "../../infra/repositories/accountRepository";
import { accountSchema, type Account } from "../entities/account";
import {
  type AccountFollowedEvent,
  type AccountNotFollowedEvent,
} from "../events/account.events";

// Types
// -----

type Data = z.infer<typeof commandDataSchema>;
type State = {
  followerAccount: Account;
  accountToFollow: Account;
};
type Event = AccountFollowedEvent | AccountNotFollowedEvent;

// Command data schema
// -------------------

const commandDataSchema = z.object({
  blockerId: accountSchema.shape.id,
  accountToFollowId: accountSchema.shape.id,
});

// Deriver
// -------

const deriveEvent = (data: Data, state: State): Event => {
  const { followerAccount, accountToFollow } = state;

  if (accountToFollow.followers.includes(followerAccount.id)) {
    return {
      type: "ACCOUNT_NOT_FOLLOWED/ALREADY_FOLLOWING",
      payload: {
        followererId: followerAccount.id,
        accountToFollowId: accountToFollow.id,
      },
    };
  }

  if (accountToFollow.blockedAccounts.includes(followerAccount.id)) {
    return {
      type: "ACCOUNT_NOT_FOLLOWED/BLOCKED",
      payload: {
        followererId: followerAccount.id,
        accountToFollowId: accountToFollow.id,
      },
    };
  }

  return {
    type: "ACCOUNT_FOLLOWED",
    payload: {
      followererId: followerAccount.id,
      accountFollowed: accountToFollow.id,
    },
  };
};

// Command handler
// ---------------

export const handleFollowAccount = async (
  commandData: Data
): Promise<Event> => {
  // Step 1: Parse incoming Command data
  // -----------------------------------

  const data = commandDataSchema.parse(commandData);

  // Step 2: Fetch relevant 'state' (previously persisted Entities necessary to process the Command)
  // -----------------------------------------------------------------------------------------------
  const followerAccount = await accountRepository.getById(data.blockerId);
  if (!followerAccount) {
    throw new Error("Blocking account not found");
  }

  const accountToFollow = await accountRepository.getById(
    data.accountToFollowId
  );
  if (!accountToFollow) {
    throw new Error("Account to blcok not found");
  }

  const state: State = {
    followerAccount,
    accountToFollow,
  };

  // Step 3: 'Derive an event' (given Command data and fetched state)
  // ----------------------------------------------------------------

  const event = deriveEvent(data, state);

  // Step 4: Update the state of the system (for success Events)
  // -----------------------------------------------------------

  switch (event.type) {
    case "ACCOUNT_FOLLOWED":
      accountRepository.save({
        ...state.followerAccount,
        followers: [
          ...state.followerAccount.followers,
          event.payload.followererId,
        ],
      });
      break;
  }

  // Step 5: Publish the Event
  // -------------------------

  publishEvent(event);

  return event;
};
