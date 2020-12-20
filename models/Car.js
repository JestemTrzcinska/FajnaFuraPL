const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'status',
  },
  licenseNumber: {
    type: String,
    required: true,
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
  typeDrive: {
    type: String,
    required: true,
  },
  airConditioning: {
    type: String,
    required: true,
  },
  typeFuel: {
    type: String,
    required: true,
  },
  engine: {
    type: String,
    required: true,
  },
  averageRange: {
    type: Number,
    required: true,
  },
  averageConsumption: {
    type: Number,
    required: true,
  },
  about: {
    type: String,
  },
  multiplierPrice: {
    type: Number,
  },
});

module.exports = Car = mongoose.model('car', CarSchema);
