import type { Router, RequestHandler } from "express";

import { withErrorHandling } from "../decorators/errorDecorators";

export type QueryRouteDefinitions = {
  [key: `/${string}`]: {
    handler: RequestHandler;
    method?: "get" | "post";
    middleware?: RequestHandler[];
  };
};

export type ActionRouteDefinitions = {
  [key: `/${string}`]: {
    handler: RequestHandler;
    middleware?: RequestHandler[];
  };
};

/**
 * Setup API Routes
 *
 * @param router - Express Router
 * @param queryRouteDefinitions - Route Definitions
 * @param actionsRouteDefinitions - Action Route Definitions
 * @returns void
 *
 * @description
 *
 * This function sets up API routes in a standardised way.
 *
 * @example
 *
 * const exampleRouter = express.Router();
 *
 * const queryRouteDefinitions = {
 *  "/get-foo": {
 *     handler: getFoo
 *  },
 *  "/get-bar": {
 *    method: 'post', // only set to post if really necessary
 *    middleware: [someMiddleware, someOtherMiddleware],
 *    handler: handleGetBar,
 *  }
 * };
 *
 * const actionRouteDefinitions = {
 *  "/change-foo": {
 *    handler: changeFoo
 *  },
 *  "/change-bar": {
 *    middleware: [someMiddleware, someOtherMiddleware],
 *    handler: handleChangeBar,
 *  }
 * };
 *
 * setUpAPIRoutes(
 *   exampleRouter,
 *   queryRouteDefinitions,
 *   actionRouteDefinitions
 * );
 */
export const setUpAPIRoutes = (
  router: Router,
  queryRouteDefinitions: QueryRouteDefinitions,
  actionRouteDefinitions: ActionRouteDefinitions
) => {
  Object.entries(queryRouteDefinitions).map(([path, definition]) => {
    const { method, middleware, handler } = definition;
    method === "post"
      ? router.post(path, ...(middleware || []), withErrorHandling(handler))
      : router.get(path, ...(middleware || []), withErrorHandling(handler));
  });

  Object.entries(actionRouteDefinitions).map(([path, definition]) => {
    const { middleware, handler } = definition;
    router.post(path, ...(middleware || []), withErrorHandling(handler));
  });
};
