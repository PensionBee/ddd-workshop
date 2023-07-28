import { Suspense } from "react";
import { Route } from "react-router-dom";

export type RouteType = {
  path: string;
  component: React.LazyExoticComponent<React.FC>;
};

export const createRoutes = (routes: RouteType[]) => {
  return routes.map(({ path, component }) => {
    const Page = component;
    return (
      <Route
        key={path}
        path={path}
        element={
          <Suspense fallback={null}>
            <Page />
          </Suspense>
        }
      />
    );
  });
};
