import asyncHandler from "express-async-handler";
import queries from "../db/queries.js";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";

const validateSignUp = [
  body("email")
    .toLowerCase()
    .trim()
    .custom(async (value) => {
      const users = await queries.getAllUsers();
      const emailIds = users.map((user) => user.email.toLowerCase());
      if (emailIds.includes(value)) {
        throw new Error("Email already exists! Try a different one.");
      }
    }),
    body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("The passwords do not match"),

];

const userLoginGet = (req, res) => res.render("login", { user: req.user });
const userSignUpGet = (req, res) => res.render("sign-up");
const userLogoutGet = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};

const userSignUpPost = [
  validateSignUp,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("sign-up", {
        errors: errors.array(),
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = { ...req.body, password: hashedPassword };
    await queries.insertUser(newUser);
    res.redirect("/login");
  }),
];

export default {
  userLoginGet,
  userSignUpGet,
  userLogoutGet,
  userSignUpPost,
};
