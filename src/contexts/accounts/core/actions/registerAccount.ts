import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { accountRepository } from "#/contexts/accounts/infra/repositories/accountRepository";
import { errorOnDefaultCase } from "#/shared/common/typeUtils";
import { createActionHandler } from "#/shared/core/actions/actionHandling";
import { createActionDataParser } from "#/shared/core/actions/actionParsing";

type Data = z.infer<typeof dataSchema>;
type State = Awaited<ReturnType<typeof fetchState>>;
type Outcome = ReturnType<typeof deriveOutcome>;

export const dataSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  username: z.string().min(6).max(32),
});
const parseData = createActionDataParser(dataSchema);

const fetchState = async (data: Data) => {
  const { email, username } = data;

  const existingAccountWithEmail = await accountRepository.getByEmail(email);
  const existingAccountWithUsername = await accountRepository.getByUsername(
    username
  );

  return { existingAccountWithEmail, existingAccountWithUsername };
};

const deriveOutcome = (data: Data, state: State) => {
  const { email, username, password } = data;
  const { existingAccountWithEmail, existingAccountWithUsername } = state;

  if (existingAccountWithEmail) {
    return {
      type: "ACCOUNT_REGISTRATION_FAILED/EMAIL_ALREADY_IN_USE",
      payload: {
        email,
      },
    } as const;
  }

  if (existingAccountWithUsername) {
    return {
      type: "ACCOUNT_REGISTRATION_FAILED/USERNAME_ALREADY_IN_USE",
      payload: {
        email,
      },
    } as const;
  }

  return {
    type: "ACCOUNT_CREATED",
    payload: {
      id: uuidv4(),
      email,
      username,
      password,
    },
  } as const;
};

const updateState = async (_state: State, outcome: Outcome) => {
  switch (outcome.type) {
    case "ACCOUNT_REGISTRATION_FAILED/EMAIL_ALREADY_IN_USE":
    case "ACCOUNT_REGISTRATION_FAILED/USERNAME_ALREADY_IN_USE":
      break; // Do nothing
    case "ACCOUNT_CREATED":
      await accountRepository.create(outcome.payload);
      break;
    default:
      errorOnDefaultCase(outcome);
  }
};

export const registerAccount = createActionHandler({
  parseData,
  fetchState,
  deriveOutcome,
  updateState,
});
