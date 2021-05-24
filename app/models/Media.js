const mongoose = require('mongoose');

const mediaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    mediaOrganId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "MediaOrgan"
    },
    text: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    mediaTitle: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Media', mediaSchema);
