const mongoose = require('mongoose');
const errHandler = require('../common/error');
const Product = require('../models/product');

/**
 * Get all products
 * @param {*} req 
 * @param {*} res 
 */
const getAllProducts = async (req, res) => {
    try {
        console.log('get all');
        
        const products = await Product.find().exec();

        res.status(200).json(products);
    } catch (err) {
        errHandler(res, err);
    }
}

/**
 * Get a product
 * @param {*} req 
 * @param {*} res 
 */
const getProduct = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Product.findById(id).exec();

        if (!product) {
            errHandler(res, `Product ${id} not found`, 404);
        } else {
            res.status(200).json(product);
        }
    } catch (err) {
        errHandler(res, err);
    }
}

/**
 * Search products
 * @param {*} req 
 * @param {*} res 
 */
const searchProducts = async (req, res) => {
    const search = req.params.search;

    try {
        let regex = new RegExp(search, 'i');

        let price = parseFloat(search)

        const query = {
            $or: [{ name: regex }, { shortDescription: regex }, { longDescription: regex }]
        };

        if (!isNaN(price)) {
            query.$or.push({ price }, { salePrice: price })
        }

        console.log(query);

        const products = await Product.find(query).exec();

        res.status(200).json(products);
    } catch (err) {
        errHandler(res, err);
    }
}

/**
 * Create product
 * @param {*} req 
 * @param {*} res 
 */
const createProduct = async (req, res) => {
    try {
        console.log('xxxxxxx');
        
        const newProduct = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            shortDescription: req.body.shortDescription,
            longDescription: req.body.longDescription,
            price: req.body.price,
            salePrice: req.body.salePrice,
            onSale: req.body.onSale,
            qty: req.body.qty
        });

        const result = await newProduct.save();

        if (!result) throw new Error('Product creation failed');

        res.status(200).json(newProduct);
    } catch (err) {
        errHandler(res, err);
    }
}

/**
 * Save product
 * @param {*} req 
 * @param {*} res 
 */
const saveProduct = async (req, res) => {
    const updates = Object.keys(req.body);

    try {
        let productUpdate = await Product.findById(req.params.id);

        if (!productUpdate) throw new Error('Product does not exist');

        updates.forEach(update => {
            if (update !== 'id')
                productUpdate[update] = req.body[update]
        });

        let savedProduct = await productUpdate.save();

        if (!savedProduct) throw new Error('Product was not saved');

        res.status(200).json(savedProduct);

    } catch (err) {
        errHandler(res, err);
    }
}

/**
 * Delete a product
 * @param {*} req 
 * @param {*} res 
 */
const deleteProduct = async (req, res) => {
    const id = req.params.id;

    try {
        if (!id) throw new Error('Product Id was not provided');

        let productDelete = await Product.findByIdAndDelete({ _id: id });

        if (!productDelete) throw new Error('Product does not exist');

        res.status(200).json({
            message: `Product ${id} has been deleted`
        });

    } catch (err) {
        errHandler(res, err);
    }
}

module.exports = {
    getAllProducts,
    getProduct,
    searchProducts,
    createProduct,
    saveProduct,
    deleteProduct
}
