const express = require("express");
const router = express.Router();

const { getProductById, createProduct, getProduct, photo, updateProduct, deleteProduct, getAllProducts, getAllUniqueCategories } = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//all of params
//create route
router.param("userId", getUserById);
router.param("productId", getProductById);

//all of actual routes
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct,
);


//read route
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo); //will be more cleared in front end

//delete route
router.delete("/product/:productId:userId", 
isSignedIn,
isAuthenticated,
isAdmin,
deleteProduct
);


// update route
router.put(
  "/product/:productId:userId", 
isSignedIn,
isAuthenticated,
isAdmin,
updateProduct
);


//listing route (for listing different products)
router.get("/products", getAllProducts);

router.get("/products/categories",getAllUniqueCategories);

module.exports = router;
