const express = require('express')
const router = express.Router()

// @route   GET api/cars
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Cars route'))

module.exports = router;