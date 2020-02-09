const express = require('express');
const userModel = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const loginValidator = require('../Validation/loginValidator');

const router = express.Router();

router.post('/', loginValidator, (req, res) => {

    console.log(req.body);

    userModel.findOne({ Username: req.body.username }, (err, docs) => {

        if(!docs) return res.json({ msg: 'User does not exist'});

        /* Password must be encrypted here. Mostly with the use of bcrypt.js package. But, 
           as we are not registering any user, please bear with me for not using any password safety mechanism. */
        if(req.body.password === docs.Password) {

            jwt.sign({ id: docs._id }, process.env.jwtSecret, { expiresIn: 3600 }, (err, token) => {

                if(err) return res.json({ msg: err.message });
                res.json({ token, user: docs.Username });
            });
        }                                        
        else 
            res.json({ msg: 'Invalid Password'});                                        
    });

});

module.exports = router;