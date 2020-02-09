module.exports = (app) => {

    const loginRouter = require('./routes/loginRoute');
    const currentUserRouter = require('./routes/currentUserRoute');
    const imageUploaderRouter = require('./routes/imageUploaderRoute');
    const imageGetterRouter = require('./routes/imageGetterRoute');

    const fileUpload = require('express-fileupload');
    app.use(fileUpload());

    //============== Public Routes =========================================
    app.use('/login', loginRouter);                     // Login and basic validations

    //============== Protected Routes =========================================

    app.use('/current', currentUserRouter);             // Current user validation 
    app.use('/imageUpload', imageUploaderRouter);       // Uploading images to S3
    app.use('/getImages', imageGetterRouter);           // Request for Getting images from S3
};