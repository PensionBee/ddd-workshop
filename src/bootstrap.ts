import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";

import { accountsRouter } from "~/contexts/accounts/interface/routes";
import { authenticateRequest } from "~/shared/interface/middleware/authentication";

const createExpressApp = async () => {
  const app = express();

  // Config
  app.use(cookieParser());
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );

  // Custom middleware
  app.use(authenticateRequest);

  // Routes
  app.use("/api/accounts", accountsRouter);
  app.use("/*", (req, res) =>
    res.status(404).json({
      error: `${req.path} not found`,
    })
  );

  app.listen(3000, () => {
    console.log(`App listening on port ${3000}`);
  });
};

try {
  createExpressApp();
} catch (err) {
  console.error(err);
}
