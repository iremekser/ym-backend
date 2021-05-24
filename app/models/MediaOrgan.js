const mongoose = require('mongoose');

const mediaOrganSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    mediaOrganTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "MediaOrganType"
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('MediaOrgan', mediaOrganSchema);
