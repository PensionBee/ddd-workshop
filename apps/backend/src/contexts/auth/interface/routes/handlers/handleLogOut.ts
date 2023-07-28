import type { Request, Response } from "express";

import { successResponse } from "#shared/interface/routes/apiResponses";

export const handleLogOut = async (_req: Request, res: Response) => {
  // Keep it simple
  res.clearCookie("accessToken");
  return successResponse(res);
};
