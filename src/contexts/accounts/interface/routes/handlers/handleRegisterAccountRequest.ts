import type { Request, Response } from "express";

import { registerAccount } from "#/contexts/accounts/core/actions/registerAccount";
import { errorOnDefaultCase } from "#/shared/common/typeUtils";

export const handleRegisterAccountRequest = async (
  req: Request,
  res: Response
) => {
  const { body } = req as any;

  const outcome = await registerAccount({
    email: body.email,
    username: body.username,
    password: body.password,
  });

  switch (outcome.type) {
    case "ACCOUNT_REGISTRATION_FAILED/EMAIL_ALREADY_IN_USE":
    case "ACCOUNT_REGISTRATION_FAILED/USERNAME_ALREADY_IN_USE":
      return res.status(400).json({
        error: "An account already exists with this email or username",
      });
    case "ACCOUNT_CREATED":
      return res.status(200);
    default:
      return errorOnDefaultCase(outcome);
  }
};
