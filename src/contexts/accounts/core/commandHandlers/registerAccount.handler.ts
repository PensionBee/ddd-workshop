import { z } from "zod";

import { publishEvent } from "../../../../shared/infra/pubSub";
import { accountRepository } from "../../infra/repositories/accountRepository";
import { accountSchema, type Account } from "../entities/account";
import {
  type AccountNotRegisteredEvent,
  type AccountRegisteredEvent,
} from "../events/account.events";

// Types
// -----

type Data = z.infer<typeof commandDataSchema>;
type State = {
  existingAccount: Account | null;
};
type Event = AccountRegisteredEvent | AccountNotRegisteredEvent;

// Command data schema
// -------------------

const commandDataSchema = accountSchema.pick({
  email: true,
  username: true,
  password: true,
});

// Deriver
// -------

const deriveEvent = (data: Data, state: State): Event => {
  const { email, username, password } = data;
  const { existingAccount } = state;

  if (existingAccount) {
    return {
      type: "ACCOUNT_NOT_REGISTERED/ALREADY_EXISTS",
      payload: {
        accountId: existingAccount.id,
      },
    };
  }

  return {
    type: "ACCOUNT_REGISTERED",
    payload: {
      id: Math.random().toString(), // Use something like UUID or NanoID in a real app
      email,
      username,
      password, // Hash this in a real app
      followers: [],
      blockedAccounts: [],
    },
  };
};

// Command handler
// ---------------

export const handleRegisterAccount = async (
  commandData: Data
): Promise<Event> => {
  // Step 1: Parse incoming Command data
  // -----------------------------------

  const data = commandDataSchema.parse(commandData);

  // Step 2: Fetch relevant 'state' (previously persisted Entities necessary to process the Command)
  // -----------------------------------------------------------------------------------------------
  const existingAccountByEmail = await accountRepository.getByEmail(data.email);
  const existingAccountByUsername = await accountRepository.getByUsername(
    data.username
  );

  const state: State = {
    existingAccount:
      existingAccountByEmail || existingAccountByUsername || null,
  };

  // Step 3: 'Derive an event' (given Command data and fetched state)
  // ----------------------------------------------------------------

  const event = deriveEvent(data, state);

  // Step 4: Update the state of the system (for success Events)
  // -----------------------------------------------------------

  switch (event.type) {
    case "ACCOUNT_REGISTERED":
      accountRepository.save(event.payload);
      break;
  }

  // Step 5: Publish the Event
  // -------------------------

  publishEvent(event);

  return event;
};
