const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  bulding: {
    type: String,
  },
  apartment: {
    type: String,
  },
  zipCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

module.exports = Address = mongoose.model('address', AddressSchema);
