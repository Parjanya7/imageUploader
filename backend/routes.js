module.exports = (app) => {

    const loginRouter = require('./routes/loginRoute');
    const currentUserRouter = require('./routes/currentUserRoute');
    const imageUploaderRouter = require('./routes/imageUploaderRoute');
    const imageGetterRouter = require('./routes/imageGetterRoute');

    const fileUpload = require('express-fileupload');
    app.use(fileUpload());

    app.use('/login', loginRouter);
    app.use('/current', currentUserRouter);
    app.use('/imageUpload', imageUploaderRouter);
    app.use('/getImages', imageGetterRouter);
};