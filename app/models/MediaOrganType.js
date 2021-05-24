const mongoose = require('mongoose');

const mediaOrganTypeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('MediaOrganType', mediaOrganTypeSchema);
