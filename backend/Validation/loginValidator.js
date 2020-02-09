module.exports = (req, res, next) => {

    let errors = {};

    if(req.body.username === '')
        errors.username = 'Username cannot be empty';

    if(req.body.password === '')
        errors.password = 'Password cannot be empty'        

    //Other validations can also be added. Majorly when registering a new user.

    if(Object.keys(errors).length !== 0)
        return res.json(errors);
    
    next();
};