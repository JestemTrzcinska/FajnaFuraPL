const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Car = require('../../models/Car');
const Rent = require('../../models/Rent');
const Status = require('../../models/Status');

var mongoose = require('mongoose');

// @route   GET api/rents
// @desc    GET all rents
// @access  Public
router.get('/', async (req, res) => {
  try {
    const rents = await Rent.find()
      .populate('status')
      .populate('car')
      .populate('user', ['firstName', 'lastName', 'email', 'phone']);

    if (!rents) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Nie ma wypożyczeń w bazie danych' }] });
    }

    res.json(rents);
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
    check('carID', 'Proszę wybrać samochód.').exists(),
    check('status', 'Należy podać status.').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { carID, dateFrom, dateTo, status, infoBefore, infoAfter } = req.body;

    try {
      // See if the car exists

      let carFromDB = await Car.findById(carID);
      if (!carFromDB) {
        return res.status(400).json({
          errors: [{ msg: 'Samochód o tym ID nie istnieje.' }],
        });
      }

      await Car.findOneAndUpdate(
        { _id: carFromDB.id },
        { $set: { status: '5fb4fb37afc856316849d9ee' } }, // wypozyczony
        { new: true, useFindAndModify: false }
      );

      // See if the status exists
      let statusFromDB = await Status.findOne({ name: status });
      if (!statusFromDB) {
        return res.status(400).json({
          errors: [{ msg: 'Status o podanym id nie istnieje.' }],
        });
      }

      // See if the rent already exists
      let rent = await Rent.findOne({ car: carFromDB._id, dateFrom, dateTo });
      if (rent) {
        return res.status(400).json({
          errors: [
            {
              // use moment.js or other npm to show date
              msg: `Dane auto jest wypożyczone w terminie od ${dateFrom} do ${dateTo}.`,
            },
          ],
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
