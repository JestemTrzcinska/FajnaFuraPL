const express = require('express')
const router = express.Router()

// @route   GET api/address
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Address route'))

module.exports = router;