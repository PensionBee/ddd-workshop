import { RouteType } from "@shared/utils/createRoutes";
import { lazy } from "react";

const HomePage = lazy(() => import("./Home"));

export const routes: RouteType[] = [{ path: "/", component: HomePage }];
