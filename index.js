import path from "path";
import { fileURLToPath } from "url";
import express, { urlencoded } from "express";
import passport from "passport";
import indexRouter from "./routes/indexRouter.js";
import setAuthSession from "./auth/authConfig.js";

// Get __dirname in ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(setAuthSession());
app.use(passport.session());
app.use(urlencoded({ extended: false }));
app.use("/", indexRouter);

app.listen(3000, () => console.log("app listening on port 3000!"));
