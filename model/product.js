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
    .then((rows) => Array.isArray(rows) && (rows.length > 0 ? rows[0] : "Product does not exist"))
    
};

const categoriesList = () => {
  return  knex("products")
    .distinct("category")
    .then((rows) => Array.isArray(rows) && rows)
};

module.exports = {
  getProducts,
  getProductByID,
  categoriesList
};
