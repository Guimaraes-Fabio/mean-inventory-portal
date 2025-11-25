const express = require('express');
const router = new express.Router();
const VendorController = require('../controllers/vendor.controller');
const pause = require('../effects/pause');

/**
 * Get all vendors
 */
router.get('/', pause, VendorController.getAllVendors);

/**
 * Get a vendor by Id
 */
router.get('/:id', pause, VendorController.getVendor);

/**
 * Search vendors. Searches name
 */
router.get('/search/:search', pause, VendorController.searchVendors);

/**
 * Create a new vendor
 */
router.post('/', pause, VendorController.createVendor);

/**
 * Save changes to a vendor
 */
router.patch('/:id', pause, VendorController.saveVendor);

/**
 * Delete a vendor
 */
router.delete('/:id', pause, VendorController.deleteVendor);

module.exports = router;