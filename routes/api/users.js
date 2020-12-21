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
    check('firstName', 'Wymagane imię').not().isEmpty(),
    check('lastName', 'Wymagane nazwisko').not().isEmpty(),
    check('email', 'Wymagany prawidłowy email').isEmail(),
    check('password','Wymagane silniejsze hasło').isLength({ min: 6 }),
    check('drivingLicense', 'Wymagany numer prawa jazdy').not().isEmpty(),
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
          errors: [
            {
              input: 'email',
              msg: 'Podany email jest zajęty',
            },
          ],
        });
      }

      let user2 = await User.findOne({ drivingLicense });
      if (user2) {
        return res.status(400).json({
          errors: [
            {
              input: 'drivingLicense',
              msg: 'Podany numer prawa jazdy jest zajęty',
            },
          ],
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
