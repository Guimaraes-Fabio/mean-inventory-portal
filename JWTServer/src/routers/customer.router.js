const express = require('express');
const router = new express.Router();
const CustomerController = require('../controllers/customer.controller');
const pause = require('../effects/pause');

/**
 * Get all customers
 */
router.get('/', pause, CustomerController.getAllCustomers);

/**
 * Get a customer
 */
router.get('/:id', pause, CustomerController.getCustomerById);

/**
 * Cerate a customer
 */
router.post('/', pause, CustomerController.createCustomer);

/**
 * Save customer changes
 */
router.patch('/:id', pause, CustomerController.saveCustomer);

/**
 * Delete customer
 */
router.delete('/:id', pause, CustomerController.deleteCustomer);

module.exports = router;