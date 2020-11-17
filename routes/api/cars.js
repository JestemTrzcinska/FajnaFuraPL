const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Car = require('../../models/Car');

// @route   GET api/cars
// @desc    GET cars
// @access  Public

router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/cars
// @desc    Add cars
// @access  Public
router.post(
  '/',
  [
    check('brand', 'Proszę o podanie marki samochodu').not().isEmpty(),
    check('model', 'Proszę o podanie modelu samochodu').not().isEmpty(),
    check('year', 'Proszę o podanie roku produkcji samochodu').not().isEmpty(),
    check('sits', 'Proszę o podanie liczby siedzen w samochodzie').not().isEmpty(),
    check('licenseNumber', 'Proszę o podanie numeru rejestracyjnego samochodu').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { brand, model, year, sits, licenseNumber, about, mileage, conditionOil, conditionTires, tirePressure, multiplerPrice } = req.body;

    try {
      // See if the car exists
      let car = await car.findOne({ licenseNumber });
      if (car) {
        return res.status(400).json({
          errors: [{ msg: 'Samochód o podanym numerze rejestracyjnym istnieje.' }],
        });
      }

      car = new Car({
        brand,
        model,
        year,
        sits,
        licenseNumber,
        about,
        mileage,
        conditionOil,
        conditionTires,
        tirePressure,
        multiplerPrice,
      });

      await car.save();

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error.');
    }
  }
);

module.exports = router;
