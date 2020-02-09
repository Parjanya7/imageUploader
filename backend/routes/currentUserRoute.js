const express = require('express');
const tokenValidator = require('../Validation/tokenValidator');
const userModel = require('../Models/userModel');

const router = express.Router();

router.get('/', tokenValidator, (req, res) => {

    userModel.findOne({ _id: req.user.id }, (err, docs) => {

        if(!err)
            res.json({ token: req.header('auth-token'), user: docs.Username });
        else
            throw err;
    });
});

module.exports = router;