import { Router } from "express";
import userController from "../controllers/userController.js";
const indexRouter = Router();

indexRouter.get("/", (req, res) => res.render("index", { user: req.user }));
indexRouter.get("/login", userController.userLoginGet);
indexRouter.get("/sign-up", userController.userSignUpGet);
indexRouter.get("/logout", userController.userLogoutGet);

indexRouter.post("/login", userController.userLoginPost);
indexRouter.post("/sign-up", userController.userSignUpPost);

export default indexRouter;
