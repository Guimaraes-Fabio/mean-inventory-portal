const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const customerSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        minlength: [3, 'First name must be 3 characters or greater']
    }, lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        minlength: [5, 'Last name must be 5 charaters or greater']
    }, ssn: {
        type: String,
        required: [true, 'Social Insurance number is required'],
        trim: true,
        unique: [true, 'Social Insurance number must be unique'],
        validate(value) {
            const ssnReg = /^\d{3}-\d{3}-\d{3}$/;

            if (!ssnReg.test(value)) {
                throw new Error('Social insurance number is invalid');
            }
        }
    }
});

customerSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

customerSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;