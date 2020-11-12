const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  authority: [
    {
      staff: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'staff',
      },
    },
  ],
  firstName: {
    type: String,
    reqired: true,
  },
  lastName: {
    type: String,
    reqired: true,
  },
  email: {
    type: String,
    reqired: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
    reqired: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'address',
  },
  credit: {
    type: Number,
    default: 0,
  },
});

module.exports = User = mongoose.model('user', UserSchema);
