const mongoose = require('mongoose');

const dessertSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: 'Uncategorized',
  },
  price: {
    type: Number,
    required: true,
  },
  mainImage: {
    type: String,
    required: true,
  },
  addImage1: {
    type: String,
    default: null,
  },
  addImage2: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model('Dessert', dessertSchema);