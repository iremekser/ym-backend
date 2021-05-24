// models
const mongoose = require('mongoose');
const SurveyAnswer = require('../models/SurveyAnswer');

// enums
const surveyAnswerEnums = require('../enums/surveyAnswerEnums');

exports.find = async (req, res) => {
    try {
        const surveyAnswer = await SurveyAnswer.findOne({ _id: req.params.id });
        if (!surveyAnswer)
            return res.status(404).json({ message: surveyAnswerEnums.NOT_FOUND });
        return res.status(200).json({ surveyAnswer });

    } catch (error) {
        return res.status(500).json({ ...error });
    }
};

exports.create = async (req, res) => {
    try {
        const surveyAnswer = new SurveyAnswer({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            email: req.body.email,
            answers: req.body.answers,
            surveyId: req.body.surveyId
        });
        const savedSurveyAnswer = await surveyAnswer.save();
        return res.status(200).json({
            surveyAnswer: savedSurveyAnswer
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            ...err
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const surveyAnswer = await SurveyAnswer.findOne({ _id: req.params.id });
        if (!surveyAnswer)
            return res.status(404).json({ message: surveyAnswerEnums.NOT_FOUND });
        await SurveyAnswer.findOneAndDelete({ _id: req.params.id })

        return res.status(200).json({ message: surveyAnswerEnums.DELETED, surveyId: surveyAnswer.surveyId });
    } catch (error) {
        return res.status(500).json({ ...error });
    }
};

exports.update = async (req, res) => {
    try {
        const changes = {
            questions: req.body.questions
        };

        const surveyAnswer = await SurveyAnswer.findOneAndUpdate({ _id: req.params.id }, changes, { new: true });

        if (!surveyAnswer) {
            return res.status(404).json({
                message: surveyAnswerEnums.NOT_FOUND
            });
        }

        return res.status(200).json({
            message: surveyAnswerEnums.UPDATED,
            changes
        });
    } catch (err) {
        return res.status(500).json({
            error: err
        });
    }
};

exports.list = async (req, res) => {
    try {
        const listedSurveyAnswer = await SurveyAnswer.find({});
        return res.status(200).json({
            listedSurveyAnswer
        });
    } catch (error) {
        return res.status(500).json({ ...error })
    }
}
