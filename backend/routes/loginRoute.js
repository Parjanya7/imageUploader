const express = require('express');
const userModel = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const loginValidator = require('../Validation/loginValidator');

const router = express.Router();

//= =========================================================================
// @route    GET: /login
// @desc     Login user and basic validations
// @access   Public

router.post('/', loginValidator, (req, res) => {

    console.log(req.body);

    userModel.findOne({ Username: req.body.username }, (err, docs) => {

        if(!docs) return res.json({ msg: 'User does not exist'}); // If username does not exist

        /* Password must be encrypted here. Mostly with the use of bcrypt.js package. But, 
           as we are not registering any user, please bear with me for not using any password safety mechanism. */
        if(req.body.password === docs.Password) {
        
            // Assigning JWT token to the user
            jwt.sign({ id: docs._id }, process.env.jwtSecret, { expiresIn: 3600 }, (err, token) => {

                if(err) return res.json({ msg: err.message });
                res.json({ token, user: docs.Username }); // Responding with user and his token
            });
        }                                        
        else 
            res.json({ msg: 'Invalid Password'});   // Invalid password              
    });

});

module.exports = router;