const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_KEY;
const { publicKEY } = require('../auth/keyreader');

module.exports = (req, res, next) => {
    try {
        //Attaching “Bearer” before the token ensures clarity, consistency, and compatibility across different 
        //implementations and systems. When the server receives an HTTP request with the “Authorization” header, 
        //it checks for the presence of the “Bearer” keyword to determine the authentication scheme being used.
        const token = req.headers.authorization.split(' ')[1];

        // Verification will throw exception if token is invalid
        jwt.verify(token, 'WMAD');

        //jwt.verify(token, publicKEY);

        next();
    } catch (error) {
        return res.status(403).json({ error: { message: 'Authentication failed' } });
    }
}