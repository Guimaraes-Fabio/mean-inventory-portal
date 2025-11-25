const express = require('express');
const router = new express.Router();
const ProductController = require('../controllers/product.controller');
const pause = require('../effects/pause');
const auth = require('../middleware/auth.middleware');

/**
 * Get all products
 */
router.get('/', pause, ProductController.getAllProducts);

/**
 * Get a product by Id
 */
router.get('/:id', pause, ProductController.getProduct);

/**
 * Create a new product
 */
//router.post('/', auth, pause, ProductController.createProduct);

/**
 * Save changes to a product
 */
//router.patch('/:id', auth, pause, ProductController.saveProduct);

/**
 * Delete a product
 */
//router.delete('/:id', auth, pause, ProductController.deleteProduct);

/**
 * Create a new product
 */
router.post('/', pause, ProductController.createProduct);

/**
 * Save changes to a product
 */
router.patch('/:id', pause, ProductController.saveProduct);

/**
 * Delete a product
 */
router.delete('/:id', pause, ProductController.deleteProduct);

module.exports = router;