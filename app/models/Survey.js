const mongoose = require('mongoose');

const surveySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },
    pollsterId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Pollster'
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    questions: {
        type: [
            {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true
                },
                text: {
                    type: String,
                    required: true
                }
            }
        ],
        required: false
    }
});

module.exports = mongoose.model('Survey', surveySchema);
