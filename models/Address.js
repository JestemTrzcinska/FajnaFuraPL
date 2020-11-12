const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  city: {
    type: String,
    reqired: true,
  },
  street: {
    type: String,
    reqired: true,
  },
  bulding: {
    type: String,
  },
  apartment: {
    type: String,
  },
  zipCode: {
    type: String,
    reqired: true,
  },
  country: {
    type: String,
    reqired: true,
  },
});

module.exports = Address = mongoose.model('address', AddressSchema);
