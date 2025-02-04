import asyncHandler from "express-async-handler";
import queries from "../db/queries.js";
import bcrypt from "bcryptjs";

const userLoginGet = (req, res) => res.render("login", { user: req.user });
const userSignUpGet = (req, res) => res.render("sign-up");
const userLogoutGet = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};

const userLoginPost = (req, res) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  });
}

const userSignUpPost = asyncHandler(async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = { ...req.body, password: hashedPassword };
  await queries.insertUser(newUser);
  res.redirect("/");
});

export default {
  userLoginGet,
  userSignUpGet,
  userLogoutGet,
  userLoginPost,
  userSignUpPost,
};
