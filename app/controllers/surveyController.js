const mongoose = require('mongoose');
// models
const Survey = require('../models/Survey');
const SurveyAnswer = require('../models/SurveyAnswer');
const Pollster = require('../models/Pollster');

// enums
const surveyEnums = require('../enums/surveyEnums');


exports.find = async (req, res) => {
    try {
        const survey = await Survey.findOne({ _id: req.params.id })
            .populate('customerId')
            .populate('pollsterId');
        if (!survey) return res.status(404).json({ message: surveyEnums.NOT_FOUND });
        return res.status(200).json({ survey });
    } catch (error) {
        return res.status(500).json({ ...error });
    }
};

exports.create = async (req, res) => {
    let listedPollster = await Pollster.find({});
    let surveys = await Survey.find({ endDate: { $gt: Date.now() } });
    let surveyPolIds = surveys.map(x => x.pollsterId.toString());

    listedPollster = listedPollster.map(x => {
        return {
            ...x._doc,
            busy: surveyPolIds.indexOf(x._id.toString()) >= 0
        };
    });

    if (listedPollster.filter(x => !x.busy).length === 0) {
        return res.status(400).json({
            message: 'musait pollster yok'
        });
    }
    const survey = new Survey({
        _id: new mongoose.Types.ObjectId(),
        customerId: req.body.customerId,
        pollsterId: listedPollster.filter(x => !x.busy)[
            Math.floor(Math.random() * listedPollster.filter(x => !x.busy).length)
        ]._id,
        questions: req.body.questions.map(x => {
            return {
                _id: new mongoose.Types.ObjectId(),
                text: x
            };
        }),
        startDate: req.body.startDate,
        endDate: req.body.endDate
    });
    try {
        const savedSurvey = await survey.save();
        return res.status(200).json({
            savedSurvey
        });
    } catch (err) {
        return res.status(500).json({
            ...err
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const survey = await Survey.findOne({ _id: req.params.id });
        if (!survey) return res.status(404).json({ message: surveyEnums.NOT_FOUND });
        await Survey.findOneAndDelete({ _id: req.params.id });
        return res.status(200).json({ message: surveyEnums.DELETED });
    } catch (error) {
        return res.status(500).json({ ...error });
    }
};

exports.update = async (req, res) => {
    try {
        const changes = {
            questions: req.body.questions
        };

        const survey = await Survey.findOneAndUpdate({ _id: req.params.id }, changes, { new: true });

        if (!survey) {
            return res.status(404).json({
                message: surveyEnums.NOT_FOUND
            });
        }

        return res.status(200).json({
            message: surveyEnums.UPDATED,
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
        const surveys = await Survey.find({})
            .populate('customerId')
            .populate('pollsterId');
        return res.status(200).json({
            surveys
        });
    } catch (error) {
        return res.status(500).json({ ...error });
    }
};
exports.answers = async (req, res) => {
    try {
        const answers = await SurveyAnswer.find({ surveyId: req.params.id })
            .populate('surveyId')
        return res.status(200).json({
            answers
        });
    } catch (error) {
        return res.status(500).json({ ...error });
    }
};

exports.results = async (req, res) => {
    try {
        const survey = await Survey.findOne({ _id: req.params.id });
        let surveyAnswer = await SurveyAnswer.find({ surveyId: req.params.id })
        console.log(surveyAnswer);
        results = [];
        surveyAnswer.forEach((x, index) => {
            const qa = []
            for (let i = 0; i < survey.questions.length; i++) {
                qa.push({
                    question: survey.questions[i].text,
                    answer: x.answers[i].answer
                });
            }
            results.push({
                username: x.username,
                email: x.email,
                answers: qa
            });

        });
        res.set({ 'Content-Disposition': 'attachment; filename="mrb.txt"' });
        return res.send(
            results
                .map(
                    x =>
                        'Kişi : ' +
                        x.username +
                        ' (' +
                        x.email +
                        ')\n' +
                        x.answers.map(qa => 'Soru : ' + qa.question + '\n' + 'Cevap : ' + qa.answer + '\n').join('\n') + '\n--------\n\n'

                )
                .join('')
        );


    } catch (error) {
        return res.status(500).json({ ...error });

    }
}



