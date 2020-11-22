const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator');

const Car = require('../../models/Car');
const Rent = require('../../models/Rent');

// @route   GET api/rents
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Rents route'))


// @route   POST api/rents
// @desc    Test route
// @access  Public
router.post(
    '/',
    [
        check('car', 'Proszę wybrać samochód.').exists(),
        check('user', 'Należy podać użytkownika.').exists(),
        check('status', 'Należy podać status.').exists(),         
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const  { car, user ,dateFrom, dateTo, status, infoBefore, infoAfter } = req.body;

        try {
            Car.findOneAndUpdate(
                {_id: car},
                { $set: {status: '5fb4fb37afc856316849d9ee' }}, // wypozyczony
                {useFindAndModify: false},
                (err, obj) => {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.send(obj);
                
                    }
                }
            );

            rent = new Rent({
                car,
                user,
                dateFrom,
                dateTo,
                status,
                infoBefore,
                infoAfter
            });

            await rent.save();

        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error.');  
        }
    }
);

module.exports = router;