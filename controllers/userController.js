import asyncHandler from "express-async-handler";
import queries from "../db/queries.js";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";
import "dotenv/config";

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

const homepageGet = async (req, res) => {
  const messages = (req.user ? await queries.getMessagesByCreatorId(req.user.id) : null);
  res.render("index", { user: req.user, messages: messages });
};
const userLoginGet = (req, res) => {
  if (req.user) redirect("/");
  else res.render("login", { user: req.user });
};
const userSignUpGet = (req, res) => res.render("sign-up");
const userLogoutGet = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};
const userJoinClubGet = (req, res) => {
  if (req.user) res.render("join-club", { user: req.user });
  else res.redirect("/");
};

const userJoinClubPost = async (req, res) => {
  const { passcode } = req.body;
  if (passcode == process.env.JOIN_CLUB_PASSCODE) {
    await queries.activateMembershipStatus(req.user.id);
  }
  res.redirect("/messages");
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
  homepageGet,
  userLoginGet,
  userSignUpGet,
  userLogoutGet,
  userSignUpPost,
  userJoinClubGet,
  userJoinClubPost,
};
