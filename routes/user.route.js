const express = require('express');
const userRoute = express.Router();
let user = require('../models/user');

userRoute.route('/create').post((req, res, next) => {
  user.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});


userRoute.route('/login').post(async (req, res, next) => {

  const { email, password } = req.body;


  if (email && password) {
    const u = await user.findOne({ email }).select("+password");

    const authStr = u.generateJWT();
    res.status(200).cookie("access_token", authStr).json({
      success: true,
      token: authStr,
      data: u
    });




    next();

  }
  else {
    return next(Error)
  }
})


userRoute.route('/').get((req, res, next) => {

  user.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


userRoute.route('/get/:id').get((req, res, next) => {
  user.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})



userRoute.route('/update/:id').put((req, res, next) => {
  user.findByIdAndUpdate(req.params.id, {
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


userRoute.route('/delete/:id').delete((req, res, next) => {
  user.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})


module.exports = userRoute;