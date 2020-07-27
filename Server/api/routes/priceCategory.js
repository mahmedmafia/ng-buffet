const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const PriceCategory = require('../models/priceCategory');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
router.get('/', (req, res, next) => {
  let name = req.query.name;
  let query = PriceCategory.find();
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
  console.log(req.body);

      const priceCategory = new PriceCategory({
        _id: mongoose.Types.ObjectId(),
        name:req.body.name
      });
      priceCategory
        .save()
        .then((createdPriceCategory) => {
          console.log(createdPriceCategory);
          res
            .status(201)
            .json({
              message: 'Category Added',
              PriceCategory: createdPriceCategory,
            });
        })
        .catch((err) => {
          console.log('shit');
          res.status(400).json({ error: err });
        });

});
router.patch('/:priceCategoryId', (req, res) => {
  const id = req.params.priceCategoryId;

  Product.updateOne({ _id: id }, req.body)
    .then((updatedBook) => {
      res.status(200).json({
        message: 'priceCategory Updated',
        request: {
          type: 'GET',
          url: 'http://localhost:3000/priceCategory/' + id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});
router.delete('/:priceCategoryId', checkAuth, (req, res) => {
  const id = req.params.priceCategoryId;
  Book.deleteOne({ _id: id })
    .exec()
    .then((book) => {
      // console.log(book);
      res.status(200).json({ message: 'priceCategory Deleted Successfully' });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});
module.exports = router;
