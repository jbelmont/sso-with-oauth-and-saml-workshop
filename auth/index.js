'use strict';

const {responseCodes} = require('../constants/constants');

const PATH = '/api/v1/';

const decodeBase64EncodedString = (str) => {
  const usernameAndPassword = str.split(' ')[1];
  const parseString = new Buffer(usernameAndPassword, 'base64').toString();
  const [
    username,
    password
  ] = parseString.split(':');
  return {
    username,
    password
  };
};

const basicAuthExample = (req, res) => {
  const {
    authorization
  } = req.headers;
  if (authorization) {
    const decodeString = decodeBase64EncodedString(authorization);
    res.send(responseCodes['ok'], {
      credentials: decodeString
    });
  } else if (!authorization) {
    res.setHeader('WWW-Authenticate', 'Basic realm="need login credentials"');
    res.send(responseCodes['unauthorized'], {
      errorMessage: 'Please provide base 64 encoded username and password'
    });
  }
};


module.exports = (app) => {
  app.get(`${PATH}/basicAuth`, basicAuthExample);
};
