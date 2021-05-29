// models
const mongoose = require('mongoose');
const MediaOrganType = require('../models/MediaOrganType');
const MediaOrgan = require('../models/MediaOrgan');

// enums
const mediaOrganTypeEnums = require('../enums/mediaOrganTypeEnums');
const { type } = require('joi/lib/types/object');

exports.find = async (req, res) => {
  try {
    const mediaOrganType = await MediaOrganType.findOne({ _id: req.params.id });
    if (!mediaOrganType) return res.status(404).json({ message: mediaOrganTypeEnums.NOT_FOUND });

    return res.status(200).json({ mediaOrganType });
  } catch (error) {
    return res.status(500).json({ ...error });
  }
};
exports.create = async (req, res) => {
  const existMediaOrganType = await MediaOrganType.findOne({ name: req.body.title });
  if (existMediaOrganType) {
    return res.status(200).json({
      message: mediaOrganTypeEnums.ALREADY_EXIST,
      mediaOrganType: existMediaOrganType
    });
  }
  const mediaOrganType = new MediaOrganType({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title
  });
  try {
    const savedMediaOrganType = await mediaOrganType.save();
    return res.status(200).json({
      savedMediaOrganType
    });
  } catch (err) {
    return res.status(500).json({
      ...err
    });
  }
};
exports.list = async (req, res) => {
  try {
    const mediaOrganType = await MediaOrganType.find({});
    res.status(200).json({ mediaOrganType });
  } catch (error) {
    return res.status(500).json({ ...error });
  }
};
exports.update = async (req, res) => {
  try {
    const mediaOrganType = await MediaOrganType.findOneAndUpdate(
      { _id: req.params.id },
      { title: req.body.title }
    );

    if (!mediaOrganType) {
      return res.status(404).json({
        message: mediaOrganTypeEnums.NOT_FOUND
      });
    }

    return res.status(200).json({
      message: mediaOrganTypeEnums.UPDATED,
      mediaOrganType
    });
  } catch (err) {
    return res.status(500).json({
      error: err
    });
  }
};
exports.delete = async (req, res) => {
  try {
    const mediaOrganType = await MediaOrganType.findOne({ _id: req.params.id });
    if (!mediaOrganType)
      return res.status(404).json({
        message: mediaOrganTypeEnums.NOT_FOUND
      });
    let mediaOrgans = await MediaOrgan.find({ mediaOrganTypeId: req.params.id });
    let mediaOrganIds = mediaOrgans.map(x => x._id);

    await MediaOrgan.deleteMany({ _id: { $in: mediaOrganIds } });

    await MediaOrganType.findOneAndDelete({ _id: req.params.id });
    return res.status(200).json({
      message: mediaOrganTypeEnums.DELETED
    });
  } catch (error) {
    return res.status(500).json({ ...error });
  }
};
