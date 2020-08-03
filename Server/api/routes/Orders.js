const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const OrderItem = require('../models/orderItem');
const User = require('../models/user');
const SellingLogs = require('../models/sellingLog');
const Product =require('../models/product');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const moment = require('moment');

router.get('/', (req, res, next) => {
  let name = req.query.name;
  let query = Order.find();
  var queryParam = new RegExp('' + name, 'i');
  if (name) {
    query = query.where({
      name: {
        $regex: queryParam
      }
    });
  }
  query
    .populate({
      path: 'orderItems',
      populate: {
        path: 'product'
      }
    })
    .exec()
    .then((docs) => {
      docs = docs.map(doc => {
        return {
          orderItems: doc.orderItems,
          TotalPrice: doc.TotalPrice,
          user: doc.user,
          OrderDate: moment(doc.OrderDate).format('YYYY-MM-DD h:mm:ss')
        }
      })
      res.status(200).json({
        docs
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      });
    });
});
router.get('/:orderId', (req, res, next) => {
  const id = req.params.orderId;

  Book.findById({
      _id: id
    })
    .populate('OrderItem user')
    .exec()
    .then((doc) => {
      res.status(200).json({
        doc
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      });
    });
});
router.post('/', (req, res, next) => {

  // User.findById({ _id: req.body.user })
  //   .exec()
  //   .then((user) => {
  //     if (user == null) {
  //       return res.status(404).json({ message: 'invalid user' });
  //     }

  User.findOne({
      _id: req.body.user.id
    })
    .exec()
    .then((onlyuser) => {
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        user: onlyuser._id,
        // orderItems: req.body.orderItems.map((orderItem)=>{
        //     return {orderItems:orderItem._id? orderItem._id:orderItem}
        // }),
        OrderDate: moment().format('YYYY-MM-DD h:mm:ss'),
        TotalPrice: req.body.TotalPrice != null ? req.body.TotalPrice : 0,
      });
      return order.save();
    })
    .then((createdOrder) => {
      (async () => {
        for (let i = 0; i < req.body.orderItems.length; i++) {
          const orderitem = req.body.orderItems[i];
          const neworderItem = new OrderItem({
            _id: mongoose.Types.ObjectId(),
            product: orderitem['product']['id'],
            quantitySold: orderitem.quantitySold,
            productPrice: orderitem.productPrice != null ?
              orderitem.productPrice :
              orderitem.product.price,
            TotalPrice: orderitem.productPrice * orderitem.quantitySold,
            order: createdOrder,
          });
          await neworderItem
            .save()
            .then((createdOrderItem) => {
              console.log(createdOrderItem);
              (async()=>{
                await Product.findOneAndUpdate({
                  _id: createdOrderItem.product._id
                }, {
                  $inc: {
                    quantity_in_inventory:-createdOrderItem.quantitySold
                  }
                }).then(newProduct => {
                  console.log(newProduct);
                }).catch(err => {
                  res.status(500).json({
                    error: err
                  });
  
                })
                const sellingLog = new SellingLogs({
                  _id: mongoose.Types.ObjectId(),
                  product: createdOrderItem.product,
                  quantitySoldToUser: createdOrderItem.quantitySold,
                  user: createdOrder.user,
                  order: createdOrderItem.order,
                  dateSold: createdOrder.OrderDate,
                  TotalPrice: createdOrderItem.TotalPrice,
                })
                sellingLog.save().then((createdLog) => {
                
                  Order.findOneAndUpdate({
                    _id: createdOrder._id
                  }, {
                    $push: {
                      orderItems: createdOrderItem
                    },
                    // $inc: {
                    //   TotalPrice:
                    //     createdOrder.TotalPrice + createdOrderItem.TotalPrice,
                    // },
                  }, {
                    useFindAndModify: false,
                  }).then((newOrder) => {
  
                  
                  }).catch((err) => {
                    res.status(500).json({
                      error: err
                    });
  
                  });
                }).catch(err => {
                  res.status(500).json({
                    error: err
                  });
                })
              })() 
              

            })
            .catch((err) => {
              res.status(500).json({
                error: err
              });
            });
        }

        Order.findById(createdOrder._id)
          .populate('orderItems')
          .exec()
          .then((foundOrder) => {

            res.status(201).json({
              message: 'Order Added',
              Order: foundOrder
            });
          })
          .catch((err) => {
            console.log('Foundshit');
            res.status(500).json({
              error: err
            });
          });
      })();
    })
    .catch((err) => {
      console.log('shit');
      res.status(500).json({
        error: err
      });
    });

});
router.patch('/:orderId', (req, res) => {
  const id = req.params.orderId;

  Product.updateOne({
      _id: id
    }, req.body)
    .then((updatedBook) => {
      res.status(200).json({
        message: 'Product Updated',
        request: {
          type: 'GET',
          url: 'http://localhost:3000/Orders/' + id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      });
    });
});
router.delete('/:productId', checkAuth, (req, res) => {
  const id = req.params.productId;
  Book.deleteOne({
      _id: id
    })
    .exec()
    .then((book) => {
      // console.log(book);
      res.status(200).json({
        message: 'Proudct Deleted Successfully'
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      });
    });
});
module.exports = router;