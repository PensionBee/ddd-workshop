import { z } from "zod";

import { publishEvent } from "../../../../shared/infra/pubSub";
import { accountRepository } from "../../infra/repositories/accountRepository";
import { accountSchema, type Account } from "../entities/account";
import {
  type FollowerNotRemovedEvent,
  type FollowerRemovedEvent,
} from "../events/account.events";

// Types
// -----

type Data = z.infer<typeof commandDataSchema>;
type State = {
  account: Account;
};
type Event = FollowerRemovedEvent | FollowerNotRemovedEvent;

// Command data schema
// -------------------

const commandDataSchema = z.object({
  followerId: accountSchema.shape.id,
  accountId: accountSchema.shape.id,
});

// Deriver
// -------

const deriveEvent = (data: Data, state: State): Event => {
  const { followerId } = data;
  const { account } = state;

  if (account.followers.includes(followerId)) {
    return {
      type: "FOLLOWER_NOT_REMOVED/NOT_FOLLOWING",
      payload: {
        accountId: account.id,
        followerId,
      },
    };
  }

  return {
    type: "FOLLOWER_REMOVED",
    payload: {
      accountId: account.id,
      followerId,
    },
  };
};

// Command handler
// ---------------

export const handleRemoveFollower = async (
  commandData: Data
): Promise<Event> => {
  // Step 1: Parse incoming Command data
  // -----------------------------------

  const data = commandDataSchema.parse(commandData);

  // Step 2: Fetch relevant 'state' (previously persisted Entities necessary to process the Command)
  // -----------------------------------------------------------------------------------------------

  const account = await accountRepository.getById(data.accountId);
  if (!account) {
    throw new Error(`Account not found`);
  }

  const state: State = {
    account,
  };

  // Step 3: 'Derive an event' (given Command data and fetched state)
  // ----------------------------------------------------------------

  const event = deriveEvent(data, state);

  // Step 4: Update the state of the system (for success Events)
  // -----------------------------------------------------------

  switch (event.type) {
    case "FOLLOWER_REMOVED":
      accountRepository.save({
        ...account,
        followers: account.followers.filter((id) => id !== data.followerId),
      });
      break;
  }

  // Step 5: Publish the Event
  // -------------------------

  publishEvent(event);

  return event;
};
