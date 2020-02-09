const express = require('express');
const tokenValidator = require('../Validation/tokenValidator');
const userModel = require('../Models/userModel');

const router = express.Router();

//= =========================================================================
// @route    GET: /current
// @desc     Getting current user and validate token
// @access   Protected (due to tokenValidator)

router.get('/', tokenValidator, (req, res) => {

    userModel.findOne({ _id: req.user.id }, (err, docs) => {

        // Responding with current user and token which was validated by tokenValidator.
        if(!err)
            res.json({ token: req.header('auth-token'), user: docs.Username }); 
        else
            throw err;
    });
});

module.exports = router;