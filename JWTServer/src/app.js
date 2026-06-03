const express = require('express');
const app = express();
const cors = require('cors');

const customerRoute = require('./routers/customer.router');
const productRoute = require('./routers/product.router');
const vendorRoute = require('./routers/vendor.router');
const userRouter = require('./routers/user.router');


//Connect to MongoDB
require('./db/mongoose');

app.use(express.json());

//CORS Enabled
// Strict CORS Configuration (The VIP List)
const corsOptions = {
  origin: [
    'http://localhost:4200', 
    'https://mean-inventory-portal.vercel.app'
  ],
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

//routes
app.use('/api/customers', customerRoute);
app.use('/api/products', productRoute);
app.use('/api/vendors', vendorRoute);
app.use('/api/auth', userRouter);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;