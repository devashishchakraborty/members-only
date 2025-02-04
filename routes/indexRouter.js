import { Router } from "express";
import userController from "../controllers/userController.js";
const indexRouter = Router();
import passport from "passport";


indexRouter.get("/", (req, res) => res.render("index", { user: req.user }));
indexRouter.get("/login", userController.userLoginGet);
indexRouter.get("/sign-up", userController.userSignUpGet);
indexRouter.get("/logout", userController.userLogoutGet);

indexRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);
indexRouter.post("/sign-up", userController.userSignUpPost);

export default indexRouter;
