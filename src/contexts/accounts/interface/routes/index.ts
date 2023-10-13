import express from "express";

import {
  ActionRouteDefinitions,
  QueryRouteDefinitions,
  setUpAPIRoutes,
} from "~/shared/interface/routes/utils";
import { handleLogIntoAccountRequest } from "./handlers/handleLogIntoAccountRequest";
import { handleLogOutOfAccountRequest } from "./handlers/handleLogOutOfAccountRequest";
import { handleRegisterAccountRequest } from "./handlers/handleRegisterAccountRequest";

export const accountsRouter = express.Router();

// Query routes
// ------------
const queryRouteDefinitions: QueryRouteDefinitions = {};

// Action routes
// -------------
const actionRouteDefinitions: ActionRouteDefinitions = {
  "/register-account": {
    handler: handleRegisterAccountRequest,
  },
  "/log-into-account": {
    handler: handleLogIntoAccountRequest,
  },
  "/log-out-of-account": {
    handler: handleLogOutOfAccountRequest,
  },
};

setUpAPIRoutes(accountsRouter, queryRouteDefinitions, actionRouteDefinitions);
