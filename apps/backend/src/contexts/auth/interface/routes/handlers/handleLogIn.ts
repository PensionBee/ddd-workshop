import type { Request, Response } from "express";

import { logInAction } from "#contexts/auth/core/actions/logInAction";
import { throwOnDefaultCase } from "#shared/common/typeUtils";
import {
  successResponse,
  unauthorizedResponse,
} from "#shared/interface/routes/apiResponses";

export const handleLogIn = async (req: Request, res: Response) => {
  const { body } = req as any;

  const outcome = await logInAction({
    email: body.email,
    password: body.password,
  });

  switch (outcome.type) {
    case "USER_LOGIN_FAILED/INCORRECT_EMAIL":
    case "USER_LOGIN_FAILED/INCORRECT_PASSWORD":
      return unauthorizedResponse(res, "Incorrect username or password");
    case "USER_LOGGED_IN":
      res.cookie("accessToken", outcome.payload.accessToken, {
        maxAge: 100000,
      });
      return successResponse(res);
    default:
      return throwOnDefaultCase(outcome);
  }
};
