import { RouteType } from "@shared/utils/createRoutes";

import HomePage from './Home';
import LoginPage from './Login';
import ErrorPage from './404';

export const routes: RouteType[] = [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginPage },
  { path: "/profile", component: ErrorPage },
  { path: "/settings", component: ErrorPage },
];
