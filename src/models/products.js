const mongoose = require('mongoose');
const { Schema } = mongoose

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  stock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  company: {
    type: Schema.Types.ObjectId, 
    ref: 'Company', 
    required: true,
  },
  
}, {
  timestamps: true});

  module.exports = mongoose.model('Product', productSchema);

