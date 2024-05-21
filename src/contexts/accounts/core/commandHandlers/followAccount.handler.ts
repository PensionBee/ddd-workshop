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
  follower: Account;
  followee: Account;
};
type Event = AccountFollowedEvent | AccountNotFollowedEvent;

// Command data schema
// -------------------

const commandDataSchema = z.object({
  followerId: accountSchema.shape.id,
  followeeId: accountSchema.shape.id,
});

// Deriver
// -------

const deriveEvent = (data: Data, state: State): Event => {
  const { follower, followee } = state;

  if (followee.followers.includes(follower.id)) {
    return {
      type: "ACCOUNT_NOT_FOLLOWED/ALREADY_FOLLOWING",
      payload: {
        followerId: follower.id,
        followeeId: followee.id,
      },
    };
  }

  if (followee.blockedAccounts.includes(follower.id)) {
    return {
      type: "ACCOUNT_NOT_FOLLOWED/BLOCKED",
      payload: {
        followerId: follower.id,
        followeeId: followee.id,
      },
    };
  }

  return {
    type: "ACCOUNT_FOLLOWED",
    payload: {
      followerId: follower.id,
      followeeId: followee.id,
    },
  };
};

// Command handler
// ---------------

export const handleFollowAccount = async (
  commandData: Data
): Promise<Event> => {
  // Step 1: Parse command data

  const data = commandDataSchema.parse(commandData);

  // Step 2: Fetch state

  const follower = await accountRepository.getById(data.followerId);
  if (!follower) {
    throw new Error("Blocking account not found");
  }

  const followee = await accountRepository.getById(data.followeeId);
  if (!followee) {
    throw new Error("Account to blcok not found");
  }

  const state: State = {
    follower,
    followee,
  };

  // Step 3: Derive an event

  const event = deriveEvent(data, state);

  // Step 4: Update state

  switch (event.type) {
    case "ACCOUNT_FOLLOWED":
      accountRepository.save({
        ...state.followee,
        followers: [...state.followee.followers, event.payload.followerId],
      });
      break;
  }

  // Step 5: Publish and return the event

  publishEvent(event);

  return event;
};
