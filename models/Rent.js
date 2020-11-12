const mongoose = require('mongoose');

const RentSchema = new mongoose.Schema({
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'car',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'car',
    required: true,
  },
  dateFrom: {
    type: Date,
    default: Date.now,
  },
  dateTo: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'status',
    required: true,
  },
  infoBefore: {
    type: String,
  },
  infoAfter: {
    type: String,
  },
  payment: {
    type: Number,
  },
});

module.exports = Rent = mongoose.model('rent', RentSchema);
