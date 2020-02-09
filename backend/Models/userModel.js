const mongoose = require('mongoose');

//Just basic schema with only username and password fields.
const schema = new mongoose.Schema({

    Username: { type: String, required: true},
    Password: { type: String, required: true },
});

module.exports = mongoose.model('metamorphUserCollection', schema);