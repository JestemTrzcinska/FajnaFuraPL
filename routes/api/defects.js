const express = require('express')
const router = express.Router()

// @route   GET api/defects
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Defects route'))

module.exports = router;