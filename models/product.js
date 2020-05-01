const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Product = new Schema({
   name: {
      type: String
   },
   price:{
      type: Number
   },
   description: {
      type: String
   },
   imageUrl: {
      type: String
   },
   category : {

      type : mongoose.Schema.ObjectId,
      required: true,
      ref: "category"
  }
}, {
   collection: 'product'
})

module.exports = mongoose.model('Product', Product)