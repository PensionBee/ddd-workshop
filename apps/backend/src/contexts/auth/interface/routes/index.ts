import express from "express";

import {
  ActionRouteDefinitions,
  QueryRouteDefinitions,
  setUpAPIRoutes,
} from "#shared/interface/routes/utils";
import { handleLogOut } from "./handlers/handleLogOut";
import { handleLogIn } from "./handlers/handleLogIn";
import { handleRegisterRequest } from "./handlers/handleRegisterRequest";

export const authRouter = express.Router();

// Query routes
// ------------
const queryRouteDefinitions: QueryRouteDefinitions = {};

// Action routes
// -------------
const actionRouteDefinitions: ActionRouteDefinitions = {
  "/register": {
    handler: handleRegisterRequest,
  },
  "/log-in": {
    handler: handleLogIn,
  },
  "/log-out": {
    handler: handleLogOut,
  },
};

setUpAPIRoutes(authRouter, queryRouteDefinitions, actionRouteDefinitions);
