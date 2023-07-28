import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import passport from "passport";
import { Strategy } from "passport-local"; // basic auth to look up username and password
import session from "express-session";
import prisma from "#shared/infra/prisma";

const createExpressApp = async () => {
  const app = express();

  // Cookie parsing
  app.use(cookieParser());

  // JSON body parsing
  app.use(express.json());

  // Session
  app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
    })
  );

  // CORS config
  app.use(
    cors({
      origin: "*",
    })
  );

  // Logging
  app.use(morgan("dev"));

  // Authentication
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(
    new Strategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        const user = await prisma.users.findUnique({
          where: {
            email,
          },
        });
        if (!user) {
          return done(null, false);
        }

        const passwordIsValid = password === user.password;
        return passwordIsValid === true ? done(null, user) : done(null, false);
      }
    )
  );

  // API routes
  app.use("/api/", (_req, res) => res.status(200));
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
