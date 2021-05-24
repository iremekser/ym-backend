const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// models
const Pollster = require('../models/Pollster');
const Survey = require('../models/Survey');

// enums
const pollsterEnums = require('../enums/pollsterEnums');
const date = require('joi/lib/types/date');

exports.find = async (req, res) => {
    try {
        const pollster = await Pollster.findOne({ _id: req.params.id });
        if (!pollster) return res.status(404).json({ message: pollsterEnums.NOT_FOUND });
        return res.status(200).json({ pollster });
    } catch (error) {
        return res.status(500).json({ ...error });
    }
};

exports.login = async (req, res) => {
    try {
        let pollster = await Pollster.findOne({ email: req.body.email });

        pollster = pollster || Object({ password: '' });
        const result = await bcrypt.compare(req.body.password, pollster.password);
        console.log(pollster);

        if (!result) {
            return res.status(401).json({
                message: 'Başarısız'
            });
        }

        const expires = '1y';
        const token = jwt.sign(
            {
                email: pollster.email,
                pollsterId: pollster._id,
                type: 'pollster'
            },
            process.env.JWT_KEY,
            {
                expiresIn: expires
            }
        );

        return res.status(200).json({
            message: 'Başarılı',
            token,
            expiresIn: expires,
            pollsterId: pollster._id,
            pollster
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            ...err
        });
    }
};

exports.create = async (req, res) => {
    try {
        const passHash = await bcrypt.hash(req.body.password, 10);

        const pollster = new Pollster({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            password: passHash
        });

        const savedPollster = await pollster.save();
        return res.status(200).json({
            savedPollster
        });
    } catch (err) {
        return res.status(500).json({
            ...err
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const pollster = await Pollster.findOne({ _id: req.params.id });
        if (!pollster) return res.status(404).json({ message: pollsterEnums.NOT_FOUND });
        await Pollster.findOneAndDelete({ _id: req.params.id });
        return res.status(200).json({ message: pollsterEnums.DELETED });
    } catch (error) {
        return res.status(500).json({ ...error });
    }
};

exports.update = async (req, res) => {
    try {
        const pollster = await Pollster.findOne({ _id: req.params.id });

        if (!pollster) {
            return res.status(404).json({
                message: pollsterEnums.NOT_FOUND
            });
        }
        await Pollster.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    ...pollster._doc,
                    ...req.body
                }
            }
        );

        return res.status(200).json({
            message: pollsterEnums.UPDATED
            //   pollster: { ...pollster._doc, name: req.body.name }
        });
    } catch (err) {
        return res.status(500).json({
            error: err
        });
    }
};

exports.list = async (req, res) => {
    try {
        let listedPollster = await Pollster.find({});
        let surveys = await Survey.find({ endDate: { $gt: Date.now() } });
        let surveyPolIds = surveys.map(x => x.pollsterId.toString());

        listedPollster = listedPollster.map(x => {
            return {
                ...x._doc,
                busy: surveyPolIds.indexOf(x._id.toString()) >= 0
            };
        });

        return res.status(200).json({
            listedPollster
        });
    } catch (error) {
        return res.status(500).json({ ...error });
    }
};


exports.surveys = async (req, res) => {
    try {
        const surveys = await Survey.find({ pollsterId: req.params.id }).populate('pollsterId')
        return res.status(200).json({
            surveys
        });
    } catch (error) {
        return res.status(500).json({ ...error });
    }
}