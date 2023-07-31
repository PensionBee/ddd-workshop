import type { Request, Response } from "express";

import { logIntoAccount } from "#contexts/accounts/core/actions/logIntoAccount";
import { throwOnDefaultCase } from "#shared/common/typeUtils";
import {
  successResponse,
  unauthorizedResponse,
} from "#shared/interface/routes/apiResponses";

export const handleLogIntoAccountRequest = async (
  req: Request,
  res: Response
) => {
  const { body } = req as any;

  const outcome = await logIntoAccount({
    email: body.email,
    password: body.password,
    username: body.username,
  });

  switch (outcome.type) {
    case "ACCOUNT_LOGIN_FAILED/INCORRECT_EMAIL_OR_USERNAME":
    case "ACCOUNT_LOGIN_FAILED/INCORRECT_PASSWORD":
      return unauthorizedResponse(res, "Incorrect email, username or password");
    case "ACCOUNT_LOGIN_SUCCEEDED":
      res.cookie("accessToken", outcome.payload.accessToken, {
        maxAge: 100000,
      });
      return successResponse(res);
    default:
      return throwOnDefaultCase(outcome);
  }
};
