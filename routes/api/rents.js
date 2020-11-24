const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Car = require('../../models/Car');
const Rent = require('../../models/Rent');

// @route   GET api/rents
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Rents route'));

// @route   POST api/rents
// @desc    Test route
// @access  Public
router.post(
  '/',
  auth,
  [
    check('car', 'Proszę wybrać samochód.').exists(),
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
      let carFromDB = await Car.findOne({ carLicenseNumber });
      if (carFromDB) {
        return res.status(400).json({
          errors: [
            { msg: 'Samochód o podanym numerze rejestracyjnym istnieje.' },
          ],
        });
      }

      Car.findOneAndUpdate(
        { _id: carFromDB },
        { $set: { status: '5fb4fb37afc856316849d9ee' } }, // wypozyczony
        { new: true, useFindAndModify: false },
        (err, obj) => {
          if (err) {
            res.send(err);
          } else {
            res.send(obj);
          }
        }
      );

      rent = new Rent({
        car: carFromDB.id,
        user: req.user.id,
        dateFrom,
        dateTo,
        status,
        infoBefore,
        infoAfter,
      });

      await rent.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error.');
    }
  }
);

module.exports = router;
