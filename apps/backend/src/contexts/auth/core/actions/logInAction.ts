import { z } from "zod";
import jwt from "jsonwebtoken";

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
});
const parseData = createActionDataParser(dataSchema);

const fetchState = async (data: Data) => {
  const { email } = data;

  const user = await userRepository.getByEmail(email);

  return { user };
};

const deriveOutcome = (data: Data, state: State) => {
  const { email, password } = data;
  const { user } = state;

  if (!user) {
    return {
      type: "USER_LOGIN_FAILED/INCORRECT_EMAIL",
      payload: {
        email,
      },
    } as const;
  }

  if (user.password !== password) {
    return {
      type: "USER_LOGIN_FAILED/INCORRECT_PASSWORD",
      payload: {
        email,
      },
    } as const;
  }

  return {
    type: "USER_LOGGED_IN",
    payload: {
      accessToken: jwt.sign({ userId: user.id }, "secretKey", {
        algorithm: "HS512",
      }),
    },
  } as const;
};

const updateState = async (_state: State, outcome: Outcome) => {
  switch (outcome.type) {
    case "USER_LOGIN_FAILED/INCORRECT_EMAIL":
    case "USER_LOGIN_FAILED/INCORRECT_PASSWORD":
    case "USER_LOGGED_IN":
      break; // Do nothing for now
    default:
      throwOnDefaultCase(outcome);
  }
};

export const logInAction = createActionHandler({
  parseData,
  fetchState,
  deriveOutcome,
  updateState,
});
