import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";

import { authRouter } from "#contexts/auth/interface/routes";

const createExpressApp = async () => {
  const app = express();

  // Cookie parsing
  app.use(cookieParser());

  // JSON body parsing
  app.use(express.json());

  // CORS config
  app.use(
    cors({
      origin: "*",
    })
  );

  // Logging
  app.use(morgan("dev"));

  // Routes
  app.use("/api/auth", authRouter);
  app.use("/*", (req, res) =>
    res.status(404).json({
      error: `${req.path} not found`,
    })
  );

  // Server startup
  app.listen(3000, () => {
    console.log(`App listening on port ${3000}`);
  });
};

try {
  createExpressApp();
} catch (err) {
  console.error(err);
}
