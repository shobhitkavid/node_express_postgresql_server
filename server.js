const express = require('express');
const routes = require('./routes');
// const bodyParser = require('body-parser');
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 1
});

require('dotenv').config();

const app = express();

app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());

// logging.
const logger = require('morgan');
app.use(logger('dev'))

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;

  console.log('err:====23 ', err);
  // render the error page
  res.status(err.status || 500);
  return res.send('error');
  // res.render('error');
});

app.use('/api/users', routes.userRoutes);
app.use('/api/weather', apiLimiter, routes.weatherRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
