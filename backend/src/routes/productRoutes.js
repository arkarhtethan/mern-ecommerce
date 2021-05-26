const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middlewares/authMiddleware');
const { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview, getTopProduct } = require("../controllers/productController");

router.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct)
router.route('/:id/reviews').post(protect, createProductReview)
router.get('/top', getTopProduct)
router.route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct)



module.exports = router;