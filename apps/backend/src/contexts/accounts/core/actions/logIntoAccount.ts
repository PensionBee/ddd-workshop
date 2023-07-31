import { z } from "zod";
import jwt from "jsonwebtoken";

import { throwOnDefaultCase } from "#shared/common/typeUtils";
import { createActionHandler } from "#shared/core/actions/actionHandling";
import { createActionDataParser } from "#shared/core/actions/actionParsing";
import { accountRepository } from "#contexts/accounts/infra/repositories/accountRepository";

type Data = z.infer<typeof dataSchema>;
type State = Awaited<ReturnType<typeof fetchState>>;
type Outcome = ReturnType<typeof deriveOutcome>;

export const dataSchema = z
  .object({
    email: z.string().email(),
    username: z.string().min(6).max(32),
    password: z.string(),
  })
  .partial({
    email: true,
    username: true,
  })
  .refine((data) => data.email || data.username, "Email or username required.");
const parseData = createActionDataParser(dataSchema);

const fetchState = async (data: Data) => {
  const { email, username } = data;

  const accountByEmail = email && (await accountRepository.getByEmail(email));
  const accountByUsername =
    username && (await accountRepository.getByUsername(username));

  return { existingAccount: accountByEmail || accountByUsername };
};

const deriveOutcome = (data: Data, state: State) => {
  const { email, password } = data;
  const { existingAccount } = state;

  if (!existingAccount) {
    return {
      type: "ACCOUNT_LOGIN_FAILED/INCORRECT_EMAIL_OR_USERNAME",
      payload: {
        email,
      },
    } as const;
  }

  if (existingAccount.password !== password) {
    return {
      type: "ACCOUNT_LOGIN_FAILED/INCORRECT_PASSWORD",
      payload: {
        email,
      },
    } as const;
  }

  return {
    type: "ACCOUNT_LOGIN_SUCCEEDED",
    payload: {
      accessToken: jwt.sign({ accountId: existingAccount.id }, "secretKey", {
        algorithm: "HS512",
      }),
    },
  } as const;
};

const updateState = async (_state: State, outcome: Outcome) => {
  switch (outcome.type) {
    case "ACCOUNT_LOGIN_FAILED/INCORRECT_EMAIL_OR_USERNAME":
    case "ACCOUNT_LOGIN_FAILED/INCORRECT_PASSWORD":
      break; // Do nothing
    case "ACCOUNT_LOGIN_SUCCEEDED":
      break; // Do nothing
    default:
      throwOnDefaultCase(outcome);
  }
};

export const logIntoAccount = createActionHandler({
  parseData,
  fetchState,
  deriveOutcome,
  updateState,
});
