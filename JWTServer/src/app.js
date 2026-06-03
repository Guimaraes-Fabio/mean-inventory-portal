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

// Dynamic CORS Configuration: Automatically accepts any origin
const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'], 
  credentials: true,                       
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('The MEAN Stack API is live and routing perfectly!');
});

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