const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Status = require('../../models/Status');


// @route   GET api/status
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Status route'));

// @route   POST api/status
// @desc    Add cars
// @access  Public
router.post(
    '/',
    [
        check('name','Proszę o podanie statusu').not().isEmpty(),
    ],
    async (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        const { name } = req.body;

        try {
            // See if the status exists
            let status = await Status.findOne({ name });
            if (status) {
                return res.status(400).json({
                errors: [{ msg: 'Podany status już istnieje.' }],
                });
            }
            
            status = new Status({
                name,
            });

            await status.save();

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error.');
        }
    }
);

module.exports = router;