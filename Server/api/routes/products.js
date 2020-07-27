const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const PriceCategory = require('../models/priceCategory');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype == 'image/png') {
    cb(null, true);
  } else {
    cb(
      new Error('file fomat not valid,please upload a valid image format'),
      false
    );
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});
router.get('/', (req, res, next) => {
  let name = req.query.title;
  let query = Product.find();
  var queryParam = new RegExp('' + name, 'i');
  if (name) {
    query = query.where({ name: { $regex: queryParam } });
  }
  query
    .populate('productCategory priceCategory')
    .exec()
    .then((products) => {
      res.status(200).json({ products });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});
router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;

  Book.findById({ _id: id })
    .populate('poductCategory priceCategory')
    .exec()
    .then((doc) => {
      res.status(200).json({ doc });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});
router.post('/',
upload.single('file'),
checkAuth, 
 (req, res, next) => {
  const file = req.file;
  // console.log(req.file);
  // console.log(req.body);

  PriceCategory.findById({ _id: req.body.priceCategory })
    .exec()
    .then((priceCategory) => {
      if (priceCategory == null) {
        return res.status(404).json({ message: 'invalid priceCategory' });
      }
      let podCategory
    if(req.body.productCategory[0].length>1){
      podCategory=req.body.productCategory[0];
    }else{
      podCategory=req.body.productCategory
    }

      const product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: parseInt(req.body.price,10),
        priceCategory: req.body.priceCategory,
         productCategory:podCategory.split(','),
        quantity_in_inventory: req.body.quantity_in_inventory,
        Image:req.file.path
      });
      // console.log(product);
      return product.save();
    })
    .then((createdProduct) => {
      // console.log(createdAuthor);
      res.status(201).json({ message: 'product Addded', product: createdProduct });
    })
    .catch((err) => {
      console.log('shit');
      res.status(500).json({ error: err });
    });
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
  Product.deleteOne({ _id: id })
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
