const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const token = req.header('auth-token'); // Reading recieved token

    if(!token) return res.json({ msg: 'Unauthorised'}); // If token is not received

    //Token varification received in the request
    jwt.verify(token, process.env.jwtSecret, (err, decoded) => {

        if(err)
            req.user = undefined;
        else
            req.user = decoded;
    });
    
    if(req.user === undefined)
        return res.json({ msg: 'Unauthorised'}); // Invalid or missing token

    next();
};  