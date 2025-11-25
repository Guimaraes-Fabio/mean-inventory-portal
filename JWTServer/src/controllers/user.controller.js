const mongoose = require('mongoose');
const errHandler = require('../common/error');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;
const { privateKEY } = require('../auth/keyreader');

const createUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            username,
            password: hashedPassword
        });

        await newUser.save();
        res.status(200).json({ message: 'User created' });
    } catch (err) {
        console.log(err);
        errHandler(res, err);
    }
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user)
            return res.status(403).json({ error: 'Failed login' });

        const isAuthenticated = await bcrypt.compare(password, user.password);

        if (!isAuthenticated)
            return res.status(401).json({ error: { message: 'Failed login' } });

        const token = jwt.sign({ username, id: user.id }, 'WMAD', {
            expiresIn: '1h'
        });

        // const token = jwt.sign({ username, id: user.id }, privateKEY, {
        //     expiresIn: '1h', algorithm: 'RS256'
        // });

        res.status(200).json({ token, expiresIn: 3600, username });

    } catch (err) {
        errHandler(res, err);
    }
}

module.exports = {
    createUser,
    loginUser
}