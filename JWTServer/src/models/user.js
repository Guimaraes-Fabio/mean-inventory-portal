const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username is not available'],
    },
    password: {
        type: String,
        require: [true, 'Password is required']
    }
});

userSchema.plugin(uniqueValidator, { message: '{PATH} is not available' });

userSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;