import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoutes } from "@shared/utils/createRoutes";
import { routes } from "./pages/routes";

const FallbackPage = lazy(() => import("./shared/pages/FallbackPage"));

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {createRoutes([...routes])}
        <Route
          path="*"
          element={
            <Suspense>
              <FallbackPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
