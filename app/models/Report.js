// const { text } = require('body-parser');
const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Customer'
  },
  date: {
    type: Date,
    required: true
  },
  period: {
    type: String,
    required: true
  },
  result: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Media' }]
});

module.exports = mongoose.model('Report', reportSchema);
