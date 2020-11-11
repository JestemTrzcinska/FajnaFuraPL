const express = require('express');
const router = express.Router();

// @route   GET api/staff
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Staff route'));

module.exports = router;
