const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        minlength: [3, 'Product name minimum length is 3'],
        maxlength: [50, 'Product name maximum length is 50']
    },
    shortDescription: {
        type: String,
        required: [true, 'Product short description is required'],
        trim: true,
        minlength: [5, 'Product short description minimum length is 5'],
        maxlength: [255, 'Product short description maximum length is 255']
    },
    longDescription: {
        type: String,
        required: [true, 'Product long description is required'],
        trim: true,
        minlength: [5, 'Product long description minimum length is 5'],
        maxlength: [512, 'Product long description maximum length is 512']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0.01, 'Product price must be greater than zero']
    },
    salePrice: {
        type: Number,
        validate(value) {
            if (this.salePrice > this.price) {
                throw new Error('Sale price cannot be greater than regular price')
            }
        }
    },
    onSale: {
        type: Boolean,
        default: false
    },
    qty: {
        type: Number,
        required: false,
        default: 0
    }
});

productSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

