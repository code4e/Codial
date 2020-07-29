const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codial_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error while connecting to the database'));

db.once('open', function(){
    console.log('successfully connected to the database:: mongodb');
});

module.exports = db;