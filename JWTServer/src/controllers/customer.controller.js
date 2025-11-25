const mongoose = require('mongoose');
const errHandler = require('../common/error');
const Customer = require('../models/customer');


/**
 * Get all customers
 * @param {*} req 
 * @param {*} res 
 */
const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().exec();
        return res.status(200).json(customers);
    } catch (err) {
        errHandler(res, err);
    }
}

/**
 * Create customer
 * @param {*} req 
 * @param {*} res 
 */
const getCustomerById = async (req, res) => {
    const id = req.params.id;

    try {
        const customer = await Customer.findById(id).exec();

        if (!customer) {
            errHandler(res, `Customer ${id} not found`, 404);
        } else {
            res.status(200).json(customer);
        }
    } catch (err) {
        errHandler(res, err);
    }
}

/**
 * Create customer
 * @param {*} req 
 * @param {*} res 
 */
const createCustomer = async (req, res) => {
    try {
        const newCustomer = new Customer({
            _id: new mongoose.Types.ObjectId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            ssn: req.body.ssn
        });

        const result = await newCustomer.save();

        if (!result) throw new Error('Customer creation failed');

        res.status(200).json(newCustomer);
    } catch (err) {
        errHandler(res, err);
    }
}

/**
 * Save customer
 * @param {*} res 
 * @param {*} req 
 */
const saveCustomer = async (req, res) => {
    const updates = Object.keys(req.body);  
    
    try {
        let customerUpdate = await Customer.findById(req.params.id);
        
        updates.forEach(update => customerUpdate[update] = req.body[update]);

        let savedCustomer = await customerUpdate.save();

        if (!savedCustomer) throw new Error('Customer was not saved');

        res.status(200).json(savedCustomer);
    } catch (err) {
        errHandler(res, err);
    }
}

/**
 * Delete customer
 * @param {*} req 
 * @param {*} res 
 */
const deleteCustomer = async (req, res) => {
    const id = req.params.id;

    try {
        if (!id) throw new Error('Customer Id was not provided');

        let customerDelete = await Customer.findByIdAndDelete({ _id: id });

        if (!customerDelete) throw new Error('Customer does not exist');

        res.status(200).json({
            message: `Customer ${id} has been deleted`
        });

    } catch (err) {
        errHandler(res, err);
    }
}

module.exports = {
    getCustomerById,
    getAllCustomers,
    createCustomer,
    saveCustomer,
    deleteCustomer
}
