const knex = require("../library/db");

async function getPasswordByEmail(email) {
  return knex("auth_email")
    .select("password")
    .where({ email })
    .then((data) => {
      return Array.isArray(data) && data[0]?.password;
    });
}

module.exports = {
  getPasswordByEmail,
};
