const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config');
require('dotenv').config();

const app = express();

config.middleWare(app, express, bodyParser);      // Middleware configuration 
config.mongoConnect(mongoose);                    // MongoDB Connection
config.ROUTES(app);                               // Routes configuration
config.production(express, app, path);            // Production build configuration

app.listen(config.PORT, () => console.log(`Server Running on ${config.PORT}`));