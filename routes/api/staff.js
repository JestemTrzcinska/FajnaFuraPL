const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Staff = require('../../models/Staff');

// @route   GET api/staff
// @desc    Get staff
// @access  Public
router.get('/', async (req, res) => {
    try {
      const staffs = await Staff.find();
  
      res.json(staffs);
  
      if (!staffs) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Nie ma wypożyczeń w bazie danych' }] });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/staff
// @desc    Post staff
// @access  Public
router.post(
    '/',
    [
        check('name','Proszę o podanie uprawnienia').not().isEmpty(),
    ],
    async (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        const { name } = req.body;

        try {
            // See if the staff exists
            let staffs = await Staff.findOne({ name });
            if (staffs) {
                return res.status(400).json({
                errors: [{ msg: 'Podane uprawnienie już istnieje.' }],
                });
            }
            
            staffs = new Staff({
                name,
            });

            await staffs.save();
            res.json(staffs);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error.');
        }
    }
);

module.exports = router;
