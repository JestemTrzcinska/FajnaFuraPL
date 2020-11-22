const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'status',
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  sits: {
    type: Number,
    required: true,
  },
  licenseNumber: {
    type: String,
    required: true,
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
