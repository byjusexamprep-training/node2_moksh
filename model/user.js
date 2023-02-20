const knex = require("../library/db");
const redis = require("../library/redis");

async function getUserByID(userid) {
  const cacheKey = userid;
  const expiryTime = 20;
  const cachedUser = await redis.get(cacheKey);
  if (cachedUser) {
    return JSON.parse(cachedUser);
  }
  

  return knex("users")
    .select("*")
    .where({ userid })
    .then((rows) => {
      const data =
        Array.isArray(rows) && rows.length > 0
          ? rows[0]
          : { error: "User does not exist" };
      if (data.error) {
        return data;
      }
      return redis.setEx(cacheKey, expiryTime, JSON.stringify(data)).then((cache) => {
        return data;
      });
    });
}

async function getUserByEmail(email) {
  return knex("users")
    .select("*")
    .where({ email })
    .then(
      (rows) =>
        Array.isArray(rows) &&
        (rows.length > 0 ? rows[0] : { error: "User does not exist" })
    );
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
  getUserByID,
};
