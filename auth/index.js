'use strict';

const {responseCodes} = require('../constants');

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
  } else {
    res.setHeader('WWW-Authenticate', 'Basic realm="need login credentials"');
    res.send(responseCodes['unauthorized'], {
      errorMessage: 'Please provide base 64 encoded username and password'
    });
  }
};

const digestSchemeExample = (req, res) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    res.setHeader('WWW-Authenticate', `Digest realm="https://localhost:3000/api/v1/digestScheme", qop="auth, auth-int", algorithm=MD5, nonce="${process.env.NONCE}", opaque="${process.env.OPAQUE}"`);
    res.send(responseCodes['unauthorized']);
  }

  const authorizationFields = authorization.split(' ');
  if (authorizationFields.length < 7) {
    res.setHeader('WWW-Authenticate', `Digest realm="https://localhost:3000/api/v1/digestScheme", qop="auth, auth-int", algorithm=MD5, nonce="${process.env.NONCE}", opaque="${process.env.OPAQUE}"`);
    res.send(responseCodes['unauthorized']);
  } else {
    res.send(responseCodes['ok'], {
      authenticated: true
    });
  }
};

module.exports = (app) => {
  app.get(`${PATH}/basicAuth`, basicAuthExample);
  app.get(`${PATH}/digestScheme`, digestSchemeExample);
};
