const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const ProductCategory = require('../models/productCategory');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
router.get('/', (req, res, next) => {
  let name = req.query.name;
  let query = ProductCategory.find();
  var queryParam = new RegExp('' + name, 'i');
  if (name) {
    query = query.where({ name: { $regex: queryParam } });
  }
  query
    .populate('')
    .exec()
    .then((docs) => {
      res.status(200).json({ docs });
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
router.post('/', (req, res, next) => {
  const file = req.file;
      const productCategory = new ProductCategory({
        _id: mongoose.Types.ObjectId(),
        name:req.body.name
      });
      productCategory
        .save()
        .then((createdproductCategory) => {
          console.log(createdproductCategory);
          res
            .status(201)
            .json({
              message: 'Category Added',
              productCategory: createdproductCategory,
            });
        })
        .catch((err) => {
          console.log('shit');
          res.status(400).json({ error: err });
        });

});
router.patch('/:productCategoryId', (req, res) => {
  const id = req.params.productCategoryId;

  Product.updateOne({ _id: id }, req.body)
    .then((updatedBook) => {
      res.status(200).json({
        message: 'productCategory Updated',
        request: {
          type: 'GET',
          url: 'http://localhost:3000/productCategory/' + id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});
router.delete('/:productCategoryId', checkAuth, (req, res) => {
  const id = req.params.productCategoryId;
  Book.deleteOne({ _id: id })
    .exec()
    .then((book) => {
      // console.log(book);
      res.status(200).json({ message: 'productCategory Deleted Successfully' });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});
module.exports = router;
