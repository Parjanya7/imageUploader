const mongoose = require('mongoose'); 

//MongoDB Schema for user collection
//Just basic schema with only username and password fields.

const schema = new mongoose.Schema({

    Username: { type: String, required: true},
    Password: { type: String, required: true },
});

module.exports = mongoose.model('metamorphUserCollection', schema); // User model 