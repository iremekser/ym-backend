// models
const mongoose = require('mongoose');
const Report = require('../models/Report');
const Customer = require('../models/Customer');
const Media = require('../models/Media');
const schedule = require('node-schedule');

const rule = new schedule.RecurrenceRule();

// enums
const reportEnums = require('../enums/reportEnums');
const reportingTypeEnums = require('../enums/reportingTypeEnums');

exports.find = async (req, res) => {
  try {
    const report = await Report.findOne({ _id: req.params.id }).populate({
      path: 'result',
      select: 'mediaOrganId text photo mediaTitle date',
      populate: {
        path: 'mediaOrganId',
        select: 'mediaOrganTypeId name',
        populate: {
          path: 'mediaOrganTypeId'
        }
      }
    });

    res.set({ 'Content-Disposition': 'attachment; filename="slm.txt"' });
    if (typeof report.result !== 'undefined' && report.result.length === 0) {
      return res.send(
        'Rapor Boş:( \n\nDetaylı raporlar için medya organlarını takip etmeyi unutmayın!'
      );
    }

    return res.send(
      report.result
        .map(
          x => x.mediaTitle + '  (' + x.mediaOrganId.name + ')' + '\n\n' + x.text + '\n\n-----\n\n'
        )
        .join('')
    );

    // if (!report) return res.status(404).json({ message: reportEnums.NOT_FOUND });
    // return res.status(200).json({ report });
  } catch (error) {
    return res.status(500).json({ ...error });
  }
};

exports.create = async () => {
  const createReport = async (customerId, medias, period) => {
    const report = new Report({
      _id: new mongoose.Types.ObjectId(),
      customerId: customerId,
      date: Date.now(),
      result: medias,
      period: period
    });

    await report.save();
  };
  const customers = await Customer.find({});

  customers.forEach(customer => {
    if (customer.customerType === 1 && customer.reportPeriod) {
      schedule.scheduleJob(`0 */${customer.reportPeriod} * * *`, async () => {
        let privMedias = await Media.find({
          text: { $regex: customer.username },
          date: { $gte: Date.now() - 1000 * 3600 * customer.reportPeriod, $lte: Date.now() }
        });
        createReport(customer._id, privMedias, 'P');
      });

      //   schedule.scheduleJob(rule, function() {
      //     console.log(c++);
      //     console.log('Today is recognized by Rebecca Black!---------------------------');
      //   });
    }
    const daily = schedule.scheduleJob({ hour: 15, minute: 29 }, async () => {
      console.log('daily');
      let dailyMedias = await Media.find({
        text: { $regex: customer.username },
        date: { $gte: Date.now() - 1000 * 3600 * 24 }
      });
      createReport(customer._id, dailyMedias, 'D');
    });
    const weekly = schedule.scheduleJob({ hour: 15, minute: 29, dayOfWeek: 2 }, async () => {
      console.log('weekly');
      let weeklyMedias = await Media.find({
        text: { $regex: customer.username },
        date: { $gte: Date.now() - 1000 * 3600 * 24 * 7, $lte: Date.now() }
      });
      createReport(customer._id, weeklyMedias, 'W');
    });
    const monthly = schedule.scheduleJob({ hour: 15, minute: 29, dayOfMonth: 16 }, async () => {
      console.log('monthly');
      let monthlyMedias = await Media.find({
        text: { $regex: customer.username },
        date: { $gte: Date.now() - 1000 * 3600 * 24 * 7 * 4, $lte: Date.now() }
      });
      createReport(customer._id, monthlyMedias, 'M');
    });
  });
};

exports.list = async (req, res) => {
  try {
    const report = await Report.find({})
      .populate('customerId')
      .populate('result');
    return res.status(200).json({ report });
  } catch (error) {
    return res.status(500).json({ ...error });
  }
};

exports.update = async (req, res) => {
  try {
    const existReport = await Report.findOne({ _id: req.params.id });
    if (!existReport) {
      return res.status(404).json({
        message: ReportEnums.NOT_FOUND
      });
    }
    await Report.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...existReport._doc,
          ...req.body
        }
      }
    );
    return res.status(200).json({
      message: ReportEnums.UPDATED
    });
  } catch (error) {
    return res.status(500).json({ ...error });
  }
};
exports.delete = async (req, res) => {
  try {
    const report = await Report.findOne({ _id: req.params.id });
    if (!report)
      return res.status(404).json({
        message: ReportEnums.NOT_FOUND
      });
    await Report.findOneAndDelete({ _id: req.params.id });
    return res.status(200).json({
      message: ReportEnums.DELETED
    });
  } catch (error) {
    return res.status(500).json({ ...error });
  }
};
