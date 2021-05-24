// models
const Customer = require('../models/Customer');
const Media = require('../models/Media');
const Report = require('../models/Report');
const Survey = require('../models/Survey');

// enums
const customerEnums = require('../enums/customerEnums');

exports.find = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });
    if (!customer) return res.status(404).json({ message: customerEnums.NOT_FOUND });
    return res.status(200).json({ customer });
  } catch (error) {
    return res.status(500).json({ ...error });
  }
};

exports.create = async (req, res) => {
  const existCustomer = await Customer.findOne({ email: req.body.email });
  if (existCustomer)
    return res.status(200).json({
      message: customerEnums.ALREADY_EXIST,
      customer: existCustomer
    });
  const customer = new Customer({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    reportingTypeId: req.body.reportingTypeId,
    customerType: req.body.customerType
  });
  try {
    const savedCustomer = await customer.save();
    return res.status(200).json({
      savedCustomer
    });
  } catch (err) {
    return res.status(500).json({
      ...err
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });
    if (!customer) return res.status(404).json({ message: CustomerEnums.NOT_FOUND });
    await Customer.findOneAndDelete({ _id: req.params.id });
    return res.status(200).json({ message: CustomerEnums.DELETED });
  } catch (error) {
    return res.status(500).json({ ...error });
  }
};

exports.update = async (req, res) => {
  try {
    const changes = {
      username: req.body.username
    };

    const customer = await Customer.findOneAndUpdate({ _id: req.params.id }, changes, {
      new: true
    });

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

exports.list = async (req, res) => {
  try {
    const listedCustomer = await Customer.find({})
      .populate('reportingTypeId')
      .populate('mediaOrgans');
    return res.status(200).json({
      listedCustomer
    });
  } catch (error) {
    return res.status(500).json({ ...error });
  }
};

exports.listMedias = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });
    const $regex = escapeStringRegexp(customer.username);
    const medias = await Media.find({ text: { $regex } }).populate('mediaOrganId');
    if (!medias) {
      return res.status(404).json({
        message: customerEnums.MEDIA_NOT_FOUND
      });
    }
    return res.status(200).json({
      medias
    });
  } catch (error) {
    return res.status(500).json({ ...error });
  }
};

exports.getMeFeed = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.userData.customerId });
    const feedIds = customer.mediaOrgans;

    const feed = await Media.find({ mediaOrganId: { $in: feedIds }, date: { $lte: Date.now() } })
      .sort({ date: -1 })
      .populate('mediaOrganId')
      .skip(parseInt(req.query.page) * parseInt(req.query.perPage))
      .limit(parseInt(req.query.perPage));
    console.log(feed);
    return res.status(200).json({
      feed: feed,
      count: await Media.find({ mediaOrganId: { $in: feedIds } }).count()
    });
  } catch (error) {
    return res.status(500).json({ ...error });
  }
};

exports.getMeSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find({ customerId: req.userData.customerId })
      .populate('customerId')
      .populate('pollsterId');

    console.log(surveys);
    return res.status(200).json({
      surveys: surveys
    });
  } catch (error) {
    return res.status(500).json({ ...error });
  }
};

exports.changePeriod = async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      { _id: req.params.id },
      { reportPeriod: parseInt(req.query.reportPeriod) }
    );
    return res.status(200).json({
      customer
    });
  } catch (error) {
    return res.status(500).json({ ...error });
  }
};

exports.listReports = async (req, res) => {
  try {
    const reports = await Report.find({ customerId: req.params.customerId }).sort({ date: -1 });
    if (!reports) {
      return res.status(404).json({
        message: customerEnums.REPORT_NOT_FOUND
      });
    }
    return res.status(200).json({
      reports
    });
  } catch (error) {
    return res.status(500).json({ ...error });
  }
};
exports.followMediaOrgan = async (req, res) => {
  try {
    console.log(req.body, req.userData);
    const costumer = await Customer.findOneAndUpdate(
      { _id: req.userData.customerId },
      { $addToSet: { mediaOrgans: req.body.mediaOrganId } }
    );
    if (!costumer) {
      return res.status(404).json({
        message: customerEnums.NOT_FOUND
      });
    }
    return res.status(200).json({
      mediaOrganId: req.body.mediaOrganId,
      costumer
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ...error });
  }
};
exports.unfollowMediaOrgan = async (req, res) => {
  try {
    console.log(req.body, req.userData);
    const costumer = await Customer.findOneAndUpdate(
      { _id: req.userData.customerId },
      { $pull: { mediaOrgans: req.body.mediaOrganId } }
    );
    if (!costumer) {
      return res.status(404).json({
        message: customerEnums.NOT_FOUND
      });
    }
    return res.status(200).json({
      mediaOrganId: req.body.mediaOrganId,
      costumer
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ...error });
  }
};
exports.getMe = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.userData.customerId }).populate(
      'reportingTypeId'
    );
    if (!customer) return res.status(404).json({ message: customerEnums.NOT_FOUND });
    return res.status(200).json({ customer });
  } catch (error) {
    return res.status(500).json({ ...error });
  }
};
