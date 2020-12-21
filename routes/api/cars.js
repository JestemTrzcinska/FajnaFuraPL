const express = require('express');
const moment = require('moment');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Car = require('../../models/Car');
const Rent = require('../../models/Rent');
const { boolean } = require('joi');

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
    check('category', 'Proszę o podanie kategorii samochodu').not().isEmpty(),
    check('multiplierPrice', 'Proszę o podanie mnoznika').not().isEmpty(),
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
      category,
      multiplierPrice,
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
        status,
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
        category,
        multiplierPrice,
      });

      await car.save();
      res.json(car);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error.');
    }
  }
);

// @route   POST api/cars/isavailable
// @desc    Check dates
// @access  Public
router.post(
  '/isavailable',
  [
    check('_id', 'Proszę o podanie id samochodu').not().isEmpty(),
    check('dateStart', 'Proszę o podanie daty poczatku wypozyczenia').isDate().toDate(),
    check('dateEnd', 'Proszę o podanie daty konca wypozyczenia').isDate().toDate(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      _id,
      dateStart,
      dateEnd
    } = req.body;

    try {
      // See if the car exists
      let car = await Car.findOne({ _id });
      if (!car) {
        return res.status(400).json({
          errors: [
            { msg: 'Samochód o podanym ID nie istnieje.' },
          ],
        });
      }

      let rent = await Rent.find({ car: _id })
      if (!rent)  {
        return res.json({ isAvailable: 1 });
      }
      
      let is = 1;
      rent.forEach((data) => {
        if (moment(data.dateFrom).isBetween(dateStart,dateEnd) || moment(data.dateTo).isBetween(dateStart,dateEnd) || moment(dateStart).isBetween(data.dateFrom,data.dateTo)){
          is = 0;
          return;
        }
      });

      return res.json({ isAvailable: is });

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error.');
    }
  }
);

module.exports = router;
