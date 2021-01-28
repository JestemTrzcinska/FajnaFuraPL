const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Address = require('../../models/Address');
const User = require('../../models/User');

// @route   GET api/address
// @desc    Get all addresss
// @access  Public
router.get('/', async (req, res) => {
  try {
    const address = await Address.find();

    if (!address) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Nie ma żadnego adresu w bazie danych' }] });
    }
    res.json(address);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/address
// @desc    Post address
// @access  Public
router.post(
  '/',
  [auth],
  [
    check('city', 'Proszę o podanie miasta').not().isEmpty(),
    check('street', 'Proszę o podanie ulicy').not().isEmpty(),
    check('zipCode', 'Proszę o podanie kodu pocztowego').not().isEmpty(),
    check('country', 'Proszę o podanie kraju').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { city, street, building, apartment, zipCode, country } = req.body;

    try {
      // See if the address exists
      /*let address = await Address.findOne({
        city,
        street,
        building,
        apartment,
      });
      if (address) {
        return res.status(400).json({
          errors: [{ msg: 'Podany adres już istnieje.' }],
        });
      }*/

      // Check zipCode is zip code XX-XXX
      // City and country can be from some list

      address = new Address({
        city,
        street,
        building,
        apartment,
        zipCode,
        country,
      });
      await address.save();

      await User.findOneAndUpdate(
        { _id: req.user.id },
        { $set: { address: address.id } }, // wypozyczony
        { new: true, useFindAndModify: false }
      );

      res.json(address);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error.');
    }
  }
);

module.exports = router;
