const express = require('express')
const router = express.Router()

// @route   GET api/rents
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Rents route'))

module.exports = router;