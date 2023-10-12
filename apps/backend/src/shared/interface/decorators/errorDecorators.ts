import { RequestHandler } from "express";

import { BaseError } from "#/shared/common/errors";
import {
  ActionDataInvalidError,
  InvalidStateError,
} from "#/shared/core/actions/actionErrors";
import { EntityInvalidError } from "#/shared/core/entities/entityErrors";
import { QueryDataInvalidError } from "#/shared/core/queries/queryErrors";
import {
  badRequestResponse,
  internalServerErrorResponse,
} from "../routes/apiResponses";

const logAndReportError = (error: unknown) => {
  console.error(error);
};

export const withErrorHandling =
  (asyncRouteHandler: RequestHandler): RequestHandler =>
  async (req, res, next) => {
    try {
      return await asyncRouteHandler(req, res, next);
    } catch (error) {
      logAndReportError(error);
      if (error instanceof BaseError) {
        switch ((error as BaseError).constructor) {
          case ActionDataInvalidError:
          case QueryDataInvalidError:
            return badRequestResponse(res, error.properties.clientMessage);
          case EntityInvalidError:
          case InvalidStateError:
            return internalServerErrorResponse(res);
        }
      }
      return internalServerErrorResponse(res);
    }
  };
