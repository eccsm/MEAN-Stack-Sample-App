const express = require('express');
const categoryRoute = express.Router();

let category = require('../models/category');


categoryRoute.route('/create').post((req, res, next) => {
  category.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});


categoryRoute.route('/').get((req, res,next) => {

  category.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


categoryRoute.route('/get/:id').get((req, res,next) => {
  category.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})



categoryRoute.route('/update/:id').put((req, res, next) => {
  category.findByIdAndUpdate(req.params.id, {
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


categoryRoute.route('/delete/:id').delete((req, res, next) => {
  category.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = categoryRoute;