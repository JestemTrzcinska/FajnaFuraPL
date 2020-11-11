const mongoose = require('mongoose');

const DefectSchema = new mongoose.Schema({
  rent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'rent',
  },
  about: {
    type: String,
    required: true,
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'status',
  },
});

module.exports = Defect = mongoose.model('defect', DefectSchema);
