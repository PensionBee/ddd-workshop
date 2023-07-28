import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import passport from "passport";
import { Strategy } from "passport-local"; // basic auth to look up username and password
import session from "express-session";

const createExpressApp = async () => {
  const app = express();

  app.use(cookieParser());

  app.use(express.json());

  app.use(session({ secret: "secret" }));

  app.use(
    cors({
      origin: "*",
    })
  );

  app.use(morgan("dev"));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new Strategy(
      { usernameField: "email", passwordField: "password" },
      async function (email, password, done) {
        // const user = await db.User.findOne({ where: { email: email } })
        // FIXME: replace with user actually retrieved from DB
        const user = { email: "foo", password: "bar" };
        if (!user) {
          return done(null, false);
        }

        const passwordIsValid = password === user.password;

        return passwordIsValid === true ? done(null, user) : done(null, false);
      }
    )
  );

  app.use("/", (_req, res) => res.status(200).json({ test: "test" }));

  app.listen(3000, () => {
    console.log(`App listening on port ${3000}`);
  });
};
