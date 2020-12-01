const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Defect = require('../../models/Defect');
const Rent = require('../../models/Rent');
const Status = require('../../models/Status');

// @route   GET api/defects
// @desc    GET all defects
// @access  Public
router.get('/', async (req, res) => {
  try {
    const defects = await Defect.find().populate('rent').populate('status');

    if (!defects) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Nie ma defektów w bazie danych' }] });
    }
    res.json(defects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/defects
// @desc    Add defect
// @access  Public
router.post(
  '/',
  [
    check('rent', 'Proszę o podanie statusu').not().isEmpty(),
    check('about', 'Proszę o podanie statusu').not().isEmpty(),
    check('status', 'Proszę o podanie statusu').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { rent, about, status } = req.body;

    try {
      // See if the rent exists
      let rentFromDB = await Rent.findOne({ _id: rent });
      if (!rentFromDB) {
        return res.status(400).json({
          errors: [{ msg: 'Takie wypożyczenie nie istnieje.' }],
        });
      }
      // See if the status exists
      let statusFromDB = await Status.findOne({ name: status });
      if (!statusFromDB) {
        return res.status(400).json({
          errors: [{ msg: 'Taki status nie istnieje.' }],
        });
      }

      // See if the defect already exists
      let defect = await Defect.findOne({
        rent: rentFromDB._id,
        about,
        status: statusFromDB._id,
      });
      if (defect) {
        return res.status(400).json({
          errors: [{ msg: 'Taki defekt jest już zgłoszony.' }],
        });
      }

      defect = new Defect({
        rent: rentFromDB.id,
        about,
        status: statusFromDB.id,
      });

      await defect.save();
      res.json(defect);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error.');
    }
  }
);

module.exports = router;
