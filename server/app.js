const createError = require('http-errors');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const CONNECTION_URL = "mongodb+srv://admin:1tA8UqY8PNuWiao8@bankapp-mkqzv.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "bank-app-db";

const indexRouter = require('./routes/index');
const clientsRouterInitializer = require('./routes/clients');
const usersRouterInitializer = require('./routes/users');

const app = express();
let database;

MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
  if(error) {
    throw error;
  }
  database = client.db(DATABASE_NAME);
  console.log("Connected to `" + DATABASE_NAME + "`!");

// view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  app.use('/', indexRouter);
  app.use('/api/clients', clientsRouterInitializer(database));
  app.use('/api/users', usersRouterInitializer(database));

// catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

// error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
});

module.exports = app;
