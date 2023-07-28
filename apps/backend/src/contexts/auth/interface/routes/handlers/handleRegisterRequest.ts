import type { Request, Response } from "express";

import { registerAction } from "#contexts/auth/core/actions/registerAction";
import { throwOnDefaultCase } from "#shared/common/typeUtils";
import {
  forbiddenResponse,
  successResponse,
} from "#shared/interface/routes/apiResponses";

export const handleRegisterRequest = async (req: Request, res: Response) => {
  const { body } = req as any;

  const outcome = await registerAction({
    email: body.email,
    password: body.password,
    firstName: body.firstName,
    lastName: body.lastName,
  });

  switch (outcome.type) {
    case "USER_REGISTRATION_FAILED/EMAIL_ALREADY_IN_USE":
      return forbiddenResponse(res, "An account already exists for this email");
    case "USER_REGISTERED":
      return successResponse(res);
    default:
      return throwOnDefaultCase(outcome);
  }
};
