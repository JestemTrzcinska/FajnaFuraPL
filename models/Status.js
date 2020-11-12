const mongoose = require('mongoose');

const StatusSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
  },
});

module.exports = Status = mongoose.model('status', StatusSchema);
