const {
  getProducts,
  getProductByID,
  getCategories,
} = require("../model/product");
const { isuuidValid } = require("../helper/validation");

const productsList = async (req, res) => {
  const data = await getProducts();
  res.status(201).json({ data: data });
};

const getProduct = async (req, res) => {
  const id = req.params.id;
  if (!isuuidValid(id)) {
    res.status(401).json({ message: "Product ID not valid" });
    return;
  }
  const data = await getProductByID(id);
  if (data.error) {
    res.status(404).json({ data: data });
    return;
  }
  res.status(201).json({ data: data });
};

const categoriesList = async (req, res) => {
  const data = await getCategories();
  res.status(201).json({ data: data });
};

module.exports = {
  productsList,
  getProduct,
  categoriesList,
};
