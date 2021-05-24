// models
const mongoose = require('mongoose');
const Media = require('../models/Media');

// enums
const mediaEnums = require('../enums/mediaEnums');

exports.find = async (req, res) => {
    try {
        const media = await (await Media.findOne({ _id: req.params.id })).populate("mediaOrganId");
        if (!media)
            return res.status(404).json({ message: mediaEnums.NOT_FOUND });
        return res.status(200).json({ media });
    } catch (error) {
        return res.status(500).json({ ...error });
    }
};
exports.create = async (req, res) => {
    const media = new Media({
        _id: new mongoose.Types.ObjectId(),
        mediaOrganId: req.body.mediaOrganId,
        text: req.body.text,
        photo: req.body.photo,
        mediaTitle: req.body.mediaTitle,
        date: Date.now()

    });
    try {
        const savedMedia = await media.save();
        return res.status(200).json({
            savedMedia
        });
    }
    catch (err) {
        return res.status(500).json({
            ...err
        });
    }
};
exports.list = async (req, res) => {
    try {
        const media = await Media.find({}).populate("mediaOrganId");
        return res.status(200).json({ media });
    } catch (error) {
        return res.status(500).json({ ...error });
    }
};
exports.update = async (req, res) => {
    try {
        const changes = {
            text: req.body.text,
            photo: req.body.photo,
            mediaTitle: req.body.mediaTitle
        };

        const customer = await Customer.findOneAndUpdate({ _id: req.params.id }, changes, { new: true });

        if (!customer) {
            return res.status(404).json({
                message: customerEnums.NOT_FOUND
            });
        }

        return res.status(200).json({
            message: customerEnums.UPDATED,
            changes
        });
    } catch (err) {
        return res.status(500).json({
            error: err
        });
    }
};
exports.delete = async (req, res) => {
    try {
        const media = await Media.findOne({ _id: req.params.id });
        if (!media)
            return res.status(404).json({
                message: MediaEnums.NOT_FOUND
            });
        await Media.findOneAndDelete({ _id: req.params.id })
        return res.status(200).json({
            message: MediaEnums.DELETED
        });
    } catch (error) {
        return res.status(500).json({ ...error });
    }
}