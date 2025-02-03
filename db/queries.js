import pool from "./pool.js";

const getAllUsers = async () => {
  const { rows } = await pool.query("SELECT * FROM users");
  return rows;
};

const getUser = async (id) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
};

const getUserByEmail = async (email) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return rows[0];
};

const insertUser = async (user) => {
  await pool.query(
    "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)",
    [user.firstname, user.lastname, user.email, user.password]
  );
};

const updateUser = async (userId, user) => {
  await pool.query(
    "UPDATE users SET firstname=$1, lastname=$2, email=$3, password=$4 WHERE id=$6",
    [user.firstname, user.lastname, user.email, user.password, userId]
  );
};

const deleteUser = async (id) => {
  await pool.query("DELETE FROM users WHERE id = $1", [id]);
};

const getMessagesByCreatorId = async (creatorId) => {
  const { rows } = await pool.query(
    "SELECT * FROM messages WHERE creator_id = $1",
    [creatorId]
  );
  return rows;
};

const getAllMessages = async () => {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
};

const insertMessage = async (message, creatorId) => {
  await pool.query(
    "INSERT INTO messages (title, description, creator_id) VALUES ($1, $2, $3)",
    [message.title, message.description, creatorId]
  );
};

const deleteMessage = async (id) => {
  await pool.query("DELETE FROM messages WHERE id=$1", [id]);
};

export default {
  getUser,
  getUserByEmail,
  getAllUsers,
  insertUser,
  updateUser,
  deleteUser,
  getAllMessages,
  insertMessage,
  getMessagesByCreatorId,
  deleteMessage,
};
