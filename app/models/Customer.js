const mongoose = require('mongoose');
const validator = require('validator');

const customerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
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
    },
    reportingTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'ReportingType'
    },
    customerType: {
        type: Number,
        required: true
    },
    reportPeriod: {
        type: Number,
        required: false
    },
    mediaOrgans: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false,
        ref: 'MediaOrgan'
    }
});

module.exports = mongoose.model('Customer', customerSchema);
