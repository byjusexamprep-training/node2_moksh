const router = require("express").Router();
const productController = require("../controllers/product");

router.get("/products", productController.productsList);
router.get("/products/:id", productController.getProduct)
router.get("/categories",productController.getCategories);

module.exports = router;
