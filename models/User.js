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
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
    required: true,
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
