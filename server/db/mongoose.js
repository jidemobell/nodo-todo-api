const mongoose = require('mongoose');
mongoose.PromiseProvider = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todoApp');


module.exports = {mongoose}