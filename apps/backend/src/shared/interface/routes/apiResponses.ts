import { Response } from "express";

/**
 * Sends a 200 OK response with optional data
 *
 * @param res - Express response object
 * @param data - Optional data to return
 */
export const successResponse = (
  res: Response,
  data: Record<string, unknown> = {}
) => {
  return res.status(200).json(data);
};

/**
 * Sends a 400 Bad Request response
 *
 * @param res - Express response object
 * @param error - A client-safe string describing the issue
 */
export const badRequestResponse = (res: Response, error: string) =>
  res.status(400).json({
    error: `Bad Request: ${error}`,
  });

/**
 * Sends a 401 Unauthorized response
 *
 * @param res - Express response object
 * @param error - A client-safe string describing the issue
 */
export const unauthorizedResponse = (res: Response, error: string) =>
  res.status(401).json({
    error: `Unauthorized: ${error}`,
  });

/**
 * Sends a 403 Forbidden response
 *
 * @param res - Express response object
 * @param error - A client-safe string describing the issue
 */
export const forbiddenResponse = (res: Response, error: string) =>
  res.status(403).json({
    error: `Forbidden: ${error}`,
  });

/**
 * Sends a 404 Not Found response
 *
 * @param res - Express response object
 * @param error - A client-safe string describing the issue
 */
export const notFoundResponse = (res: Response, error: string) =>
  res.status(404).json({
    error: `Not Found: ${error}`,
  });

/**
 * Sends a 500 Internal Server Error response
 *
 * @param res - Express response object
 */
export const internalServerErrorResponse = (res: Response) =>
  res.status(500).json({
    error: "Internal Server Error: something went wrong",
  });
