const mongoose = require('mongoose');

module.exports.bootstrap = () => {
    var connectionString = process.env.MONGO_URI;
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
        console.log("Mongo Connected...")
    })
}