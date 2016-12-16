'use strict';

const {join} = require('path');
const {readFileSync} = require('fs');

const winston = require('winston');
const jwt = require('jsonwebtoken');

const errorHandler = require('../errorHandler');
const {responseCodes} = require('../constants/constants');

const PATH = '/api/v1/';

const createToken = (req, res, next) => {
    // sign with RSA SHA256
    const cert = readFileSync(join(__dirname, '../ca/ca.key'));

    const {name} = req.body;

    // sign asynchronously
    jwt.sign({ name }, cert, { algorithm: 'RS256' }, (err, token) => {
        if (err) {
            winston.log('error', 'Error Creating json web token', {err});
            res.send(err);
        }
        res.send(responseCodes["created"], {
            adminToken: token
        });
        return next();
    });
};


module.exports = (app) => {
    app.post(`${PATH}/createToken`, createToken);
};