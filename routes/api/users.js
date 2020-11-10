const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', [
  check('firstName', 'Proszę o podanie swojego imienia').not().isEmpty(),
  check('lastName', 'Proszę o podanie swojego nazwiska.').not().isEmpty(),
  check('email', 'Proszę o podanie prawidłowego maila.').isEmail(),
  check(
    'password',
    'Słabe hasło! Wprowadź kombinację przynajmniej sześciu liter i cyfr.'
  ).isLength({ min: 6 }),
],(req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  
  res.send('User route');
});

module.exports = router;