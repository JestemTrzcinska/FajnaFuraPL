const mongoose = require('mongoose');

const DefectSchema = new mongoose.Schema({
  rent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'rent',
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'status',
    required: true,
  },
});

module.exports = Defect = mongoose.model('defect', DefectSchema);
