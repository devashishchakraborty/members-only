import asyncHandler from "express-async-handler";
import queries from "../db/queries.js";

const getMessages = async (req, res) => {
  const messages = await queries.getAllMessages();
  const authors = await queries.getAllUsers();
  const authorNames = {};
  authors.forEach(
    (author) =>
      (authorNames[author.id] = author.firstname + " " + author.lastname)
  );
  res.render("messages", {
    user: req.user,
    messages: messages,
    authorNames: authorNames,
  });
};

const messageAddGet = (req, res) => {
  if (req.user.is_member) res.render("createMessage", { user: req.user });
  else res.redirect("/join-club");
};

const messageAddPost = asyncHandler(async (req, res) => {
  await queries.insertMessage(req.body, req.user.id);
  res.redirect("/messages");
});

const messageDelete = asyncHandler(async (req, res) => {
  if (req.user.is_admin) {
    await queries.deleteMessage(req.params.id);
  }
  res.redirect("/messages");
});

export default {
  getMessages,
  messageAddGet,
  messageAddPost,
  messageDelete,
};
