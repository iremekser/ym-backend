const mongoose = require('mongoose');

const reportController = require('./app/controllers/reportController');

// import all of our models
require('./app/models/Report');
require('./app/models/ReportingType');
require('./app/models/MediaOrgan');
require('./app/models/MediaOrganType');
require('./app/models/Customer');
require('./app/models/Media');
require('./app/models/Survey');
require('./app/models/SurveyAnswer');
require('./app/models/Pollster');

// Start our app!
const app = require('./app');

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

mongoose.connection.on('error', err => {
  console.error(`Error → ${err.message}`);
});
reportController.create()

app.set('port', process.env.PORT || 8080);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → localhost:${server.address().port}`);
});
