const mongoose = require('mongoose');

const reportingTypeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    fee: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('ReportingType', reportingTypeSchema);
