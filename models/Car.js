const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  brand: {
    type: String,
    reqired: true,
  },
  model: {
    type: String,
    reqired: true,
  },
  year: {
    type: Number,
    reqired: true,
  },
  sits: {
    type: Number,
    reqired: true,
  },
  licenseNumber: {
    type: String,
    reqired: true,
  },
  about: {
    type: String,
  },
  mileage: {
    type: String,
  },
  conditionOil: {
    type: String,
  },
  conditionTires: {
    type: String,
  },
  tirePressure: {
    type: String,
  },
  multiplierPrice: {
    type: String,
  },
});

module.exports = Car = mongoose.model('car', CarSchema);
