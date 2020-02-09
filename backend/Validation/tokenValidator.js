const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const token = req.header('auth-token');

    if(!token) return res.json({ msg: 'Unauthorised'});

    jwt.verify(token, process.env.jwtSecret, (err, decoded) => {

        if(err)
            req.user = undefined;
        else
            req.user = decoded;
    });
    
    if(req.user === undefined)
        return res.json({ msg: 'Unauthorised'});

    next();
};  