const express = require('express')
const router = express.Router()

// @route   GET api/status
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Status route'))

module.exports = router;