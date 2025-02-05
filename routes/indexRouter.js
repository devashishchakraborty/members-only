import { Router } from "express";
import userController from "../controllers/userController.js";
const indexRouter = Router();
import passport from "passport";


indexRouter.get("/", userController.homepageGet);
indexRouter.get("/login", userController.userLoginGet);
indexRouter.get("/sign-up", userController.userSignUpGet);
indexRouter.get("/logout", userController.userLogoutGet);
indexRouter.get("/join-club", userController.userJoinClubGet);

indexRouter.post("/join-club", userController.userJoinClubPost);
indexRouter.post("/sign-up", userController.userSignUpPost);
indexRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

export default indexRouter;
