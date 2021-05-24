// models
const mongoose = require('mongoose');
const ReportingType = require('../models/ReportingType');

// enums
const reportingTypeEnums = require('../enums/reportingTypeEnums');

exports.find = async (req, res) => {
    try {
        const reportingType = await ReportingType.findOne({ _id: req.params.id });
        if (!reportingType)
            return res.status(404).json({ message: reportingTypeEnums.NOT_FOUND });
        return res.status(200).json({ reportingType });
    } catch (error) {
        return res.status(500).json({ ...error });
    }
};
exports.create = async (req, res) => {
    const existReportingType = await ReportingType.findOne({ name: req.body.name });
    if (existReportingType) {
        return res.status(200).json({
            message: reportingTypeEnums.ALREADY_EXIST,
            reportingType: existReportingType
        });
    }
    const reportingType = new ReportingType({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        fee: req.body.fee
    });
    try {
        const savedReportingType = await reportingType.save();
        return res.status(200).json({
            savedReportingType
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
        const reportingType = await ReportingType.find({});
        return res.status(200).json({ reportingType });
    } catch (error) {
        return res.status(500).json({ ...error });
    }
};
exports.update = async (req, res) => {
    try {
        const existReportingType = await ReportingType.findOne({ _id: req.params.id });
        if (!existReportingType) {
            return res.status(404).json({
                message: ReportingTypeEnums.NOT_FOUND
            })
        }
        await ReportingType.findOneAndUpdate({ _id: req.params.id },
            {
                $set: {
                    ...existReportingType._doc,
                    ...req.body
                }
            }
        )
        return res.status(200).json({
            message: ReportingTypeEnums.UPDATED
        })
    } catch (error) {
        return res.status(500).json({ ...error })
    }
}
exports.delete = async (req, res) => {
    try {
        const reportingType = await ReportingType.findOne({ _id: req.params.id });
        if (!reportingType)
            return res.status(404).json({
                message: ReportingTypeEnums.NOT_FOUND
            });
        await ReportingType.findOneAndDelete({ _id: req.params.id })
        return res.status(200).json({
            message: ReportingTypeEnums.DELETED
        });
    } catch (error) {
        return res.status(500).json({ ...error });
    }
}