const mongoose = require('mongoose');

const surveyAnswerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    surveyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Survey'
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    answers: {
        type: [
            {
                _id: false,
                questionId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true
                },
                answer: {
                    type: String,
                    required: true
                }
            }
        ],
        required: false
    },
});

module.exports = mongoose.model('SurveyAnswer', surveyAnswerSchema);
