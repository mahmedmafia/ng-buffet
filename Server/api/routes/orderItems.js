const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const OrderItem = require('../models/orderItem');
const User = require('../models/user');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
router.get('/', (req, res, next) => {
  let name = req.query.name;
  let query = OrderItem.find();
  var queryParam = new RegExp('' + name, 'i');
  if (name) {
    query = query.where({ name: { $regex: queryParam } });
  }
  query
    .populate('product')
    .exec()
    .then((OrderItems) => {
      res.status(200).json({ OrderItems });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});
router.get('/:orderId', (req, res, next) => {
  const id = req.params.orderId;

  Book.findById({ _id: id })
    .populate('OrderItem user')
    .exec()
    .then((doc) => {
      res.status(200).json({ doc });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});
router.post('/add', (req, res, next) => {
  console.log(req.body);
  Product.findById({_id:req.body.product})
    .exec()
    .then((product) => {
      console.log(product);
      const orderItem = new OrderItem({
        _id: mongoose.Types.ObjectId(),
        product: req.body.product,
        quantitySold: req.body.quantitySold,
        productPrice:product.price,
        TotalPrice:(req.body.totalPrice==null ? product.price * req.body.quantitySold:req.body.totalPrice),
      });
      return orderItem.save();
    })
    .then((createdOrderItem) => {
      console.log(createdOrderItem);
      res.status(201).json({ message: 'Order Added', OrderItem: createdOrderItem });
    })
    .catch((err) => {
      console.log('shit');
      res.status(500).json({ error: err });
    });

  //     OrderItem.findById({ _id: req.body.priceCategory })
  //       .exec()
  //       .then((priceCategory) => {
  //         if (priceCategory == null) {
  //           return res.status(404).json({ message: 'invalid priceCategory' });
  //         }
  //         const Order = new Order({
  //           _id: mongoose.Types.ObjectId(),
  //           name: req.body.name,
  //           orderItems: JSON.parse(req.body.orderItems),
  //         });
  //         return Order.save();
  //       })
  //       .then((createdProduct) => {
  //         // console.log(createdAuthor);
  //         res
  //           .status(201)
  //           .json({ message: 'product Addded', product: createdProduct });
  //       })
  //       .catch((err) => {
  //         console.log('shit');
  //         res.status(500).json({ error: err });
  //       });
});
router.patch('/:productId', (req, res) => {
  const id = req.params.productId;

  Product.updateOne({ _id: id }, req.body)
    .then((updatedBook) => {
      res.status(200).json({
        message: 'Product Updated',
        request: {
          type: 'GET',
          url: 'http://localhost:3000/products/' + id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});
router.delete('/:productId', checkAuth, (req, res) => {
  const id = req.params.productId;
  Book.deleteOne({ _id: id })
    .exec()
    .then((book) => {
      // console.log(book);
      res.status(200).json({ message: 'Proudct Deleted Successfully' });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});
module.exports = router;
