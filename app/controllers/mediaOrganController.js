// models
const mongoose = require('mongoose');
const MediaOrgan = require('../models/MediaOrgan');

// enums
const mediaOrganEnums = require('../enums/mediaOrganEnums');

exports.find = async (req, res) => {
  try {
    const mediaOrgan = await MediaOrgan.findOne({ _id: req.params.id }).populate(
      'mediaOrganTypeId'
    );
    if (!mediaOrgan) return res.status(404).json({ message: mediaOrganEnums.NOT_FOUND });
    return res.status(200).json({ mediaOrgan });
  } catch (error) {
    return res.status(500).json({ ...error });
  }
};
exports.create = async (req, res) => {
  const mediaOrgan = new MediaOrgan({
    _id: new mongoose.Types.ObjectId(),
    mediaOrganTypeId: req.body.mediaOrganTypeId,
    name: req.body.name
  });
  try {
    let savedMediaOrgan = await mediaOrgan.save();
    savedMediaOrgan = await MediaOrgan.find({ _id: mediaOrgan._id }).populate('mediaOrganTypeId');
    return res.status(200).json({
      savedMediaOrgans: savedMediaOrgan
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      ...err
    });
  }
};
exports.list = async (req, res) => {
  try {
    const mediaOrgan = await MediaOrgan.find({}).populate('mediaOrganTypeId');
    return res.status(200).json({ mediaOrgan });
  } catch (error) {
    return res.status(500).json({ ...error });
  }
};
exports.update = async (req, res) => {
  try {
    const existMediaOrgan = await MediaOrgan.findOne({ _id: req.params.id });
    if (!existMediaOrgan) {
      return res.status(404).json({
        message: mediaOrganEnums.NOT_FOUND
      });
    }
    await MediaOrgan.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...existMediaOrgan._doc,
          ...req.body
        }
      }
    );
    const mediaOrgan = await MediaOrgan.findOne({ _id: req.params.id }).populate(
      'mediaOrganTypeId'
    );
    return res.status(200).json({
      message: mediaOrganEnums.UPDATED,
      mediaOrgan
    });
  } catch (error) {
    return res.status(500).json({ ...error });
  }
};
exports.delete = async (req, res) => {
  try {
    const mediaOrgan = await MediaOrgan.findOne({ _id: req.params.id });

    if (!mediaOrgan)
      return res.status(404).json({
        message: mediaOrganEnums.NOT_FOUND
      });
    await MediaOrgan.findOneAndDelete({ _id: req.params.id });
    return res.status(200).json({
      message: mediaOrganEnums.DELETED
    });
  } catch (error) {
    return res.status(500).json({ ...error });
  }
};
