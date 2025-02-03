import path from "path";
import { fileURLToPath } from "url";
import express, { urlencoded } from "express";
import expressSession from "express-session";
import connectPgSimple from "connect-pg-simple";
import passport from "passport";
import indexRouter from "./routes/indexRouter.js";
import "./auth/authConfig.js";

// Get __dirname in ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const pgSession = connectPgSimple(expressSession);
const sessionStore = new pgSession({ pool: pool, tableName: "session" });
app.use(passport.session());
app.use(urlencoded({ extended: false }));
app.use(
  expressSession({
    secret: "cats",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use("/", indexRouter);

app.listen(3000, () => console.log("app listening on port 3000!"));
