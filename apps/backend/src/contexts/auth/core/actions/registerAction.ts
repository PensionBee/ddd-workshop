import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

import { throwOnDefaultCase } from "#shared/common/typeUtils";
import { createActionHandler } from "#shared/core/actions/actionHandling";
import { createActionDataParser } from "#shared/core/actions/actionParsing";
import { userRepository } from "#contexts/auth/infra/repositories/userRepository";

type Data = z.infer<typeof dataSchema>;
type State = Awaited<ReturnType<typeof fetchState>>;
type Outcome = ReturnType<typeof deriveOutcome>;

export const dataSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string().nullable(),
});
const parseData = createActionDataParser(dataSchema);

const fetchState = async (data: Data) => {
  const { email } = data;

  const existingUser = await userRepository.getByEmail(email);

  return { existingUser };
};

const deriveOutcome = (data: Data, state: State) => {
  const { email, password, firstName, lastName } = data;
  const { existingUser } = state;

  if (existingUser) {
    return {
      type: "USER_REGISTRATION_FAILED/EMAIL_ALREADY_IN_USE",
      payload: {
        email,
      },
    } as const;
  }

  return {
    type: "USER_REGISTERED",
    payload: {
      id: uuidv4(),
      email,
      password,
      firstName,
      lastName,
    },
  } as const;
};

const updateState = async (_state: State, outcome: Outcome) => {
  switch (outcome.type) {
    case "USER_REGISTRATION_FAILED/EMAIL_ALREADY_IN_USE":
      break; // Do nothing for now
    case "USER_REGISTERED":
      await userRepository.create(outcome.payload);
      break;
    default:
      throwOnDefaultCase(outcome);
  }
};

export const registerAction = createActionHandler({
  parseData,
  fetchState,
  deriveOutcome,
  updateState,
});
