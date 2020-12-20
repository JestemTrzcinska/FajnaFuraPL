const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Car = require('../../models/Car');

// @route   GET api/cars
// @desc    GET cars
// @access  Public

router.get('/', async (req, res) => {
  try {
    const cars = await Car.find().populate('status');
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
    check('licenseNumber', 'Proszę o podanie numeru rejestracyjnego samochodu').not().isEmpty(),
    check('brand', 'Proszę o podanie marki samochodu').not().isEmpty(),
    check('model', 'Proszę o podanie modelu samochodu').not().isEmpty(),
    check('year', 'Proszę o podanie roku produkcji samochodu').not().isEmpty(),
    check('sits', 'Proszę o podanie liczby siedzen w samochodzie').not().isEmpty(),
    check('typeDrive', 'Proszę o podanie rodzaju skrzyni biegów').not().isEmpty(),
    check('airConditioning', 'Proszę o podanie rodzaju klimatyzacji').not().isEmpty(),
    check('typeFuel', 'Proszę o podanie rodzaju paliwa').not().isEmpty(),
    check('engine', 'Proszę o podanie rodzaju silnika').not().isEmpty(),
    check('averageRange', 'Proszę o podanie sredniego zasiegu').not().isEmpty(),
    check('averageConsumption', 'Proszę o podanie sredniego spalania').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      licenseNumber,
      brand,
      model,
      year,
      sits,
      typeDrive,
      airConditioning,
      typeFuel,
      engine,
      averageRange,
      averageConsumption,
      about,
      multiplerPrice,
    } = req.body;

    try {
      // See if the car exists
      let car = await Car.findOne({ licenseNumber });
      if (car) {
        return res.status(400).json({
          errors: [
            { msg: 'Samochód o podanym numerze rejestracyjnym istnieje.' },
          ],
        });
      }

      const status = '5fba6804cb6fc93abce4c728'; // niewypozyczony

      car = new Car({
        licenseNumber,
        brand,
        model,
        year,
        sits,
        typeDrive,
        airConditioning,
        typeFuel,
        engine,
        averageRange,
        averageConsumption,
        about,
        multiplerPrice,
      });

      await car.save();
      res.json(car);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error.');
    }
  }
);

module.exports = router;
