const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Car = require('../../models/Car');
const Rent = require('../../models/Rent');
const Status = require('../../models/Status');

// @route   GET api/rents
// @desc    GET all rents
// @access  Public
router.get('/', async (req, res) => {
  try {
    const rents = await Rent.find()
      .populate('status')
      .populate('car')
      .populate('user', ['firstName', 'lastName', 'email', 'phone']);

    res.json(rents);

    if (!rents) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Nie ma wypożyczeń w bazie danych' }] });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/rents
// @desc    Test route
// @access  Public
router.post(
  '/',
  [auth],
  [
    check('carLicenseNumber', 'Proszę wybrać samochód.').exists(),
    check('status', 'Należy podać status.').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      carLicenseNumber,
      dateFrom,
      dateTo,
      status,
      infoBefore,
      infoAfter,
    } = req.body;

    try {
      // See if the car exists
      let carFromDB = await Car.findOne({ licenseNumber: carLicenseNumber });
      if (!carFromDB) {
        return res.status(400).json({
          errors: [
            { msg: 'Samochód o podanym numerze rejestracyjnym nie istnieje.' },
          ],
        });
      }

      await Car.findOneAndUpdate(
        { _id: carFromDB.id },
        { $set: { status: '5fb4fb37afc856316849d9ee' } }, // wypozyczony
        { new: true, useFindAndModify: false }
        // (err, obj) => {
        //   if (err) {
        //     res.json(err);
        //   } else {
        //     res.json(obj);
        //   }
        // }
      );

      // See if the status exists
      let statusFromDB = await Status.findOne({ name: status });
      if (!statusFromDB) {
        return res.status(400).json({
          errors: [{ msg: 'Status o podanym id nie istnieje.' }],
        });
      }

      rent = new Rent({
        car: carFromDB.id,
        user: req.user.id,
        dateFrom,
        dateTo,
        status: statusFromDB.id,
        infoBefore,
        infoAfter,
      });

      await rent.save();
      res.json(rent);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error.');
    }
  }
);

module.exports = router;
