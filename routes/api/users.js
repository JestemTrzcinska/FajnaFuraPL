const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');
const Rent = require('../../models/Rent');

// @route     GET api/users
// @desc      Get user by id
// @access    Public
router.get('/', [auth], async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate('address');

    if (!user) {
      return res.status(400).json({
        errors: [{ msg: 'Użytkownik o podanym ID nie istnieje.' }],
      });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/users/
// @desc    GET rents history
// @access  Public

router.get('/history/', [auth], async (req, res) => {
  try {
    const rents = await Rent.find({ user: req.user.id })
      .populate('status')
      .populate('car');

    if (!rents) {
      return res.status(400).json({
        errors: [{ msg: 'Zalogowany użytkownik nie ma wypożyczeń.' }],
      });
    }
    res.json(rents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    check('firstName', 'Wymagane imię').not().isEmpty(),
    check('lastName', 'Wymagane nazwisko').not().isEmpty(),
    check('email', 'Wymagany prawidłowy email').isEmail(),
    check('password', 'Wymagane min 6 znaków w haśle').isLength({ min: 6 }),
    check('password2', 'Wymagane min 6 znaków w haśle').isLength({ min: 6 }),
    check('drivingLicense', 'Wymagany numer prawa jazdy').not().isEmpty(),
    check('rodo', 'Zgoda wymagana').equals('true'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      firstName,
      lastName,
      drivingLicense,
      email,
      password,
      password2,
    } = req.body;

    try {
      // See if the user exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          errors: [
            {
              param: 'email',
              msg: 'Podany email jest zajęty',
            },
          ],
        });
      }

      if (password !== password2) {
        return res.status(400).json({
          errors: [
            {
              param: 'password2',
              msg: 'Podane hasła są różne',
            },
          ],
        });
      }

      let user2 = await User.findOne({ drivingLicense });
      if (user2) {
        return res.status(400).json({
          errors: [
            {
              param: 'drivingLicense',
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

// @route   POST api/users/credit
// @desc    Update users credit
// @access  Public
router.post('/credit', [auth], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { credit } = req.body;

  try {
    const userFromDB = await User.findById(req.user.id);

    let newCredit = parseInt(userFromDB.credit) + parseInt(credit);

    const user = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: { credit: newCredit } },
      { new: true, useFindAndModify: false }
    );

    return res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  }
});

// @route   POST api/users/changePassword
// @desc    Update users password
// @access  Private
router.post(
  '/changePassword',
  [auth],
  [
    check('password', 'Wymagane min 6 znaków w haśle').isLength({ min: 6 }),
    check('password2', 'Wymagane min 6 znaków w haśle').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { oldPassword, password, password2 } = req.body;

    try {
      if (password !== password2) {
        return res.status(400).json({
          errors: [
            {
              param: 'password2',
              msg: 'Podane hasła są różne',
            },
          ],
        });
      }

      const userFromDB = await User.findById(req.user.id);
      const passwordFromDB = userFromDB.password;

      // Validate user by asking to input old password
      const compareWithOldPassword = await bcrypt.compare(
        oldPassword,
        passwordFromDB
      );

      if (compareWithOldPassword === false) {
        return res.status(400).json({
          errors: [
            {
              param: 'oldPassword',
              msg: 'Stare hasło jest nieprawidłowe',
            },
          ],
        });
      }

      // Check if user is trying to use the same password as a new one
      const compareWithPasswordFromDB = await bcrypt.compare(
        password,
        passwordFromDB
      );

      if (compareWithPasswordFromDB === true) {
        return res.status(400).json({
          errors: [
            {
              param: 'password',
              msg: 'Podane nowe hasło jest takie samo jak poprzednie',
            },
          ],
        });
      }

      let user = await User.findOneAndUpdate(
        { _id: req.user.id },
        { $set: { password: password } },
        { new: true, useFindAndModify: false }
      );

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save(); // in the db

      // // Return jsonwebtoken
      // const payload = {
      //   user: {
      //     id: user.id,
      //   },
      // };
      // jwt.sign(
      //   payload,
      //   config.get('jwtSecret'),
      //   { expiresIn: 360000 },
      //   (err, token) => {
      //     if (err) throw err;
      //     res.json({ token });
      //   }
      // );

      return res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error.');
    }
  }
);

module.exports = router;
