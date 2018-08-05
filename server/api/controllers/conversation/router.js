const conversationRoute = require('express').Router();

const conversation = require('./conversation');

conversationRoute.post('/message', conversation);

conversationRoute.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(err.status || 500).send(err.message);
});

module.exports = conversationRoute;
