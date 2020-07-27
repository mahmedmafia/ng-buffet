const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
router.post('/signup', (req, res, next) => {
      console.log(req.body);

  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        console.log(user);
        return res.status(409).json({ message: 'email exists' });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              message: 'err hashing',
              error: err
            });
          } else {
            const user = new User({
              _id: mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });
            console.log(user);
            user
              .save()
              .then(createdUser => {
                console.log(createdUser);
                res.status(201).json({
                  message: 'user added',
                  user: {
                    email: createdUser.email,
                    _id: createdUser._id
                  }
                });
              })
              .catch(err => {
                return res.status(500).json({ error: err });
              });
          }
        });
      }
    });
});
router.post('/login', (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({ message: 'Auth failed' });
      } else {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({ message: 'Auth failed' });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
                id: user[0]._id
              },
              process.env.JWT_KEY,
              {
                expiresIn: '1h'
              }
            );
            return res.status(200).json({
              message: 'Auth Success',
              token,
              expiresIn: '3600',
              user: {
                email: user[0].email,
                _id: user[0]._id
              }
            });
          }
          return res.status(401).json({ message: 'Auth failed' });
        });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});
router.delete('/:userid', (req, res) => {
  const id = req.params.userid;
  User.deleteOne({ _id: id })
    .exec()
    .then(user => {
      // console.log(user);
      res.status(200).json({ message: 'user Deleted Successfully' });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});
module.exports = router;
