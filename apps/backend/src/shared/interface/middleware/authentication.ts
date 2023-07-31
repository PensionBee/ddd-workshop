import { NextFunction, Request, Response } from "express";

import { getAccountById } from "#contexts/accounts/core/queries/getAccountById";

export const authenticateRequest = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const accountId = req.cookies["accessToken"];
  if (accountId) {
    const { account } = await getAccountById({ accountId });
    req.accountId = account?.id ?? null;
  } else {
    req.accountId = null;
  }
  next();
};

export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.accountId) {
    return next();
  }
  return res.status(401);
};
