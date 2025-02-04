import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import queries from "../db/queries.js";
import pool from "../db/pool.js";
import expressSession from "express-session";
import connectPgSimple from "connect-pg-simple";
import "dotenv/config";

const setAuthSession = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await queries.getUserByEmail(email);

          if (!user) {
            return done(null, false, { message: "Incorrect email" });
          }
          const match = await bcrypt.compare(password, user.password);
          if (!match) {
            // passwords do not match!
            return done(null, false, { message: "Incorrect password" });
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await queries.getUser(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  const pgSession = connectPgSimple(expressSession);
  const sessionStore = new pgSession({ pool: pool, tableName: "session" });
  return expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  });
};

export default setAuthSession;
