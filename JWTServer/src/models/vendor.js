const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: [true, 'Vendor name is required'],
        trim: true,
        minlength: [3, 'Vendor name minimum length is 3'],
        maxlength: [50, 'Vendor name maximum length is 50']
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true,
        minlength: [1, 'Address minimum length is 1'],
        maxlength: [255, 'Address maximum length is 255']
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true
    },
    district: {
        type: String,
        required: [true, 'District is required'],
        trim: true
    },
    country: {
        type: String,
        required: [true, 'Country is required'],
        trim: true
    },
    active: {
        type: Boolean,
        default: false
    },
    minOrderValue: {
        type: Number,
        required: false,
        default: 0
    }
});

vendorSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;
