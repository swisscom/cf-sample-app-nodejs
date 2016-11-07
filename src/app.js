'use strict';

// require dependencies
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes/index');

// bootstrap our app
const app = express();

let mongoUrl = '';

// check if the app is running in the cloud and set the MongoDB settings accordingly
if (process.env.VCAP_SERVICES) {
  const vcapServices = JSON.parse(process.env.VCAP_SERVICES);
  mongoUrl = vcapServices.mongodb[0].credentials.uri;
} else {
  mongoUrl = 'mongodb://localhost/db';
}

// connect to our MongoDB
mongoose.connect(mongoUrl);

// create a Mongoose schema for kittens
const kittenSchema = mongoose.Schema({
  name: 'string'
});

// create a Mongoose model out of our kitten schema
const Kitten = mongoose.model('Kitten', kittenSchema);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// our basic route to serve the index page
app.use('/', routes);

// the route where you can retrieve all the kittens in our MongoDB
app.post('/create-kitten', (req, res, next) => {
  const kitten = new Kitten({
    name: req.query.name
  });

  kitten.save((err, newKitten) => {
    if (err) return next(err);

    res.send('Kitten ' + newKitten.name + ' saved');
  })
})

// the route where you can retrieve all the kittens in our MongoDB
app.get('/db', (req, res, next) => {
  Kitten.find((err, kittens) => {
    if (err) return next(err);

    res.json(kittens);
  })
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
