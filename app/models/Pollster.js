const mongoose = require('mongoose');
const validator = require('validator');

const pollsterSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: [validator.isEmail, 'Invalid Email Address']
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Pollster', pollsterSchema);
