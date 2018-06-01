/**
 * Environment Variables:
 *  NODE_ENV: 'production' | 'development'
 *  MONGO_URI: URI to access the database
 *  YELP_KEY: Yelp API key
 *  SECRET: JWT Secret
 */
require('dotenv').config();

const path = require('path');
const express = require('express');
const morgan = require('morgan');
// const mongoose = require('mongoose');


/**
 * Connect to MongoDB
*/
// mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGO_URI);
// mongoose.connection.on('error', () => {
//   console.log('Unable to connect to MongoDB');
//   process.exit();
// });


/**
 * Express Configuration
 */
const app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.json());
app.use('/', express.static(path.resolve(__dirname, '..', 'client', 'build')));

app.use('/api', require('./api'));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
});

app.listen(app.get('port'), () => {
  console.log(`Node Environment: ${process.env.NODE_ENV}`);
  console.log(`Port: ${app.get('port')}`);
  console.log('App is running...\n');
});
