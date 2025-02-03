import { Router } from "express";
import userController from "../controllers/userController.js";
const indexRouter = Router();

indexRouter.get("/login", userController.userLoginGet);
indexRouter.get("/signup", userController.userSignUpGet);
indexRouter.get("/logout", userController.userLogoutGet);

indexRouter.post("/login", userController.userLoginPost);
indexRouter.post("/signup", userController.userSignUpPost);

export default indexRouter;