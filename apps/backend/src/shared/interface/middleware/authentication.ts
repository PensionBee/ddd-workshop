import { NextFunction, Request, Response } from "express";

export const ensureAuthenticated = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => next();
