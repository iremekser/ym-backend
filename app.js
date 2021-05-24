const logger = require('morgan');
const cors = require('cors');
const express = require('express');
const authRoute = require('./app/routes/auth.js');
const customerRoute = require('./app/routes/customer.js');
const mediaOrganRoute = require('./app/routes/mediaOrgan.js');
const mediaOrganTypeRoute = require('./app/routes/mediaOrganType.js');
const reportRoute = require('./app/routes/report.js');
const reportingTypeRoute = require('./app/routes/reportingType.js');
const surveyRoute = require('./app/routes/survey.js');
const surveyAnswerRoute = require('./app/routes/surveyAnswer.js');
const mediaRoute = require('./app/routes/media.js');
const pollsterRoute = require('./app/routes/pollster.js');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use('/uploads', express.static('uploads'));
app.use('/v1.0/auth/', authRoute);
app.use('/v1.0/customers/', customerRoute);
app.use('/v1.0/media-organs/', mediaOrganRoute);
app.use('/v1.0/media-organ-types/', mediaOrganTypeRoute);
app.use('/v1.0/reports/', reportRoute);
app.use('/v1.0/reporting-types/', reportingTypeRoute);
app.use('/v1.0/surveys/', surveyRoute);
app.use('/v1.0/survey-answers/', surveyAnswerRoute);
app.use('/v1.0/medias/', mediaRoute);
app.use('/v1.0/pollsters/', pollsterRoute);

module.exports = app;
