const mongoose = require('mongoose');
const errHandler = require('../common/error');
const Vendor = require('../models/vendor');

/**
 * Get all vendors
 * @param {*} req 
 * @param {*} res 
 */
const getAllVendors = async (req, res) => {
    try {
        const products = await Vendor.find().exec();

        res.status(200).json(products);
    } catch (err) {
        errHandler(res, err);
    }
}

/**
 * Get a vendor
 * @param {*} req 
 * @param {*} res 
 */
const getVendor = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Vendor.findById(id).exec();

        if (!product) {
            errHandler(res, `Vendor ${id} not found`, 404);
        } else {
            res.status(200).json(product);
        }
    } catch (err) {
        errHandler(res, err);
    }
}

/**
 * Search vendors
 * @param {*} req 
 * @param {*} res 
 */
const searchVendors = async (req, res) => {
    const search = req.params.search;

    try {
        let regex = new RegExp(search, 'i');

        const query = { name: regex };

        const products = await Vendor.find(query).exec();

        res.status(200).json(products);
    } catch (err) {
        errHandler(res, err);
    }
}

/**
 * Create vendor
 * @param {*} req 
 * @param {*} res 
 */
const createVendor = async (req, res) => {
    try {
        const newVendor = new Vendor({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            address: req.body.address,
            city: req.body.city,
            district: req.body.district,
            country: req.body.country,
            active: req.body.active,
            minOrderValue: req.body.minOrderValue
        });

        const result = await newVendor.save();

        if (!result) throw new Error('Vendor creation failed');

        res.status(200).json(newVendor);
    } catch (err) {
        errHandler(res, err);
    }
}

/**
 * Save vendor
 * @param {*} req 
 * @param {*} res 
 */
const saveVendor = async (req, res) => {
    const updates = Object.keys(req.body);

    try {      
        let vendorUpdate = await Vendor.findById(req.params.id);

        if (!vendorUpdate) throw new Error('Vendor does not exist');

        updates.forEach(update => {
            if (update !== 'id')
                vendorUpdate[update] = req.body[update]
        });

        let savedVendor = await vendorUpdate.save();

        if (!savedVendor) throw new Error('Vendor was not saved');

        res.status(200).json(savedVendor);

    } catch (err) {
        errHandler(res, err);
    }
}

/**
 * Delete a vendor
 * @param {*} req 
 * @param {*} res 
 */
const deleteVendor = async (req, res) => {
    const id = req.params.id;

    try {
        if (!id) throw new Error('Vendor Id was not provided');

        let vendorDelete = await Vendor.findByIdAndDelete({ _id: id });

        if (!vendorDelete) throw new Error('Vendor does not exist');

        res.status(200).json({
            message: `Vendor ${id} has been deleted`
        });

    } catch (err) {
        errHandler(res, err);
    }
}

module.exports = {
    getAllVendors,
    getVendor,
    searchVendors,
    createVendor,
    saveVendor,
    deleteVendor
}