const knex = require("../library/db");

async function getUserByEmail(email) {
  return knex("users")
    .select("*")
    .where({ email })
    .then((rows) => Array.isArray(rows) && rows[0]);
}
async function addPassword(user) {
  return await knex("auth_email")
    .insert({ email: user.email, password: user.password })
    .catch((err) => err);
}

async function createUser(user) {
  const { userid } = user;
  return await knex("users")
    .insert({ userid, email: user.email, username: user.username })
    .catch((err) => err);
}


module.exports = {
  getUserByEmail,
  addPassword,
  createUser,
};
