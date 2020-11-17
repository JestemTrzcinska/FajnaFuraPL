const mongoose = require('mongoose');

const StatusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = Status = mongoose.model('status', StatusSchema);
