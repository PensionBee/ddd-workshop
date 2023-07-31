import type { Request, Response } from "express";

import { successResponse } from "#shared/interface/routes/apiResponses";

export const handleLogOutOfAccountRequest = async (
  _req: Request,
  res: Response
) => {
  res.clearCookie("accessToken");
  return successResponse(res);
};
