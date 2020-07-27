const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const DB = require('./db');
const db = new DB();
const app = express();
// const __dirname=environment;
require('dotenv').config({ path: __dirname + '/.env' });

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

const productRoutes = require('./api/routes/products');
const userRoutes = require('./api/routes/users');
const orderRoutes = require('./api/routes/Orders');
const orderItemsRoutes = require('./api/routes/orderItems');
const priceCategoryRoutes=require('./api/routes/priceCategory');
const productCategoryRoutes=require('./api/routes/productCategory');


app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/orderItems', orderItemsRoutes);
app.use('/products', productRoutes);
app.use('/priceCategory',priceCategoryRoutes);
app.use('/productCategory',productCategoryRoutes);



app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
module.exports = app;
