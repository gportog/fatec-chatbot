const feedbackRoute = require('express').Router();

const feedback = require('./feedback');

feedbackRoute.post('/', feedback);

feedbackRoute.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(err.status || 500).send(err.message);
});

module.exports = feedbackRoute;
