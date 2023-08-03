import { RouteType } from "@shared/utils/createRoutes";
import { lazy } from "react";

const HomePage = lazy(() => import("./Home"));
const LoginPage = lazy(() => import("./Login"));

export const routes: RouteType[] = [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginPage },
];
