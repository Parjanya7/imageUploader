module.exports = {

    PORT: process.env.PORT || 4000,

    middleWare: (app, express, bodyParser) => {

        app.use(express.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
    },

    ROUTES: (app) => {

        const routes = require('./routes');

        routes(app);
    },

    mongoConnect: (mongoose) => {

        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.set('useUnifiedTopology', true);
        
        mongoose.connect(process.env.mongoURI, { useNewUrlParser: true }, err => {

            if(err)
                console.log(err);
            else
                console.log('Database Connected.');
        });
    },

    production: (express, app, path) => {

        if(process.env.NODE_ENV === 'production') {

            app.use(express.static(path.resolve(__dirname, '../', 'frontend', 'build')));
            
            app.get('*', (req, res) => {
                
                res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')); 
            });
        }
    }
};