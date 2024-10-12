const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yourDB').then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Failed to connect to MongoDB', err);
});
module.exports = mongoose;
