const knex = require("../library/db");

const getProducts = async () => {
  return await knex("products")
    .select("*")
    .catch((err) => err);
};

const getProductByID = async (id) => {
  return await knex("products")
    .select("*")
    .where("id", "=", id)
    .catch((err) => err);
};

const categoriesList = async () => {
  return await knex("products")
    .distinct("category")
    .catch((err) => err);
};

module.exports = {
  getProducts,
  getProductByID,
  categoriesList
};
