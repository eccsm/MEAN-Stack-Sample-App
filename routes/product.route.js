const express = require('express');
const productRoute = express.Router();

let product = require('../models/product');


productRoute.route('/create').post((req, res, next) => {
  product.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});


productRoute.route('/').get((req, res,next) => {

  product.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


productRoute.route('/get/:id').get((req, res,next) => {
  product.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})



productRoute.route('/update/:id').put((req, res, next) => {
  product.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})


productRoute.route('/delete/:id').delete((req, res, next) => {
  product.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = productRoute;