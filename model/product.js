const knex = require("../library/db");

const getProducts = () => {
  return knex("products")
    .select("*")
    .then((rows) => Array.isArray(rows) && rows);
};

const getProductByID = (id) => {
  return knex("products")
    .select("*")
    .where({ id })
    .then((rows) => Array.isArray(rows) && (rows.length > 0 ? rows[0] : { error: "Product does not exist"}))
    
};

const getCategories = () => {
  return  knex("products")
    .distinct("category")
    .then((rows) => Array.isArray(rows) && rows)
};

module.exports = {
  getProducts,
  getProductByID,
  getCategories
};
