const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config');
require('dotenv').config();

const app = express();

config.middleWare(app, express, bodyParser);
config.mongoConnect(mongoose);
config.ROUTES(app);
config.production(express, app, path);

app.listen(config.PORT, () => console.log(`Server Running on ${config.PORT}`));