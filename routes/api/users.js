const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    check('firstName', 'Proszę o podanie swojego imienia').not().isEmpty(),
    check('lastName', 'Proszę o podanie swojego nazwiska.').not().isEmpty(),
    check('email', 'Proszę o podanie prawidłowego maila.').isEmail(),
    check(
      'password',
      'Słabe hasło! Wprowadź kombinację przynajmniej sześciu liter i cyfr.'
    ).isLength({ min: 6 }),
    check('drivingLicense', 'Proszę o podanie prawidłowego maila.').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, drivingLicense, email, password } = req.body;

    try {
      // See if the user exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          errors: [{ msg: 'Użytkownik o podanym emailu już istnieje.' }],
        });
      }

      let user2 = await User.findOne({ drivingLicense });
      if (user2) {
        return res.status(400).json({
          errors: [{ msg: 'Użytkownik o podanym numerze prawa jazdy już istnieje.' }],
        });
      }

      user = new User({
        firstName,
        lastName,
        drivingLicense,
        email,
        password,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save(); // in the db

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      // res.send('User registered');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error.');
    }
  }
);

module.exports = router;
