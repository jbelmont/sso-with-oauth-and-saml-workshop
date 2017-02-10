'use strict';

const {responseCodes} = require('../constants');
const parseHeader = require('../utils/parseHeader').parseHeader;
const md5 = require('../utils/md5').md5;

// Load Environment Variables
const path = require('path');

require(path.join(__dirname, '../config/config'))['dotEnvConfig'];

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

function serverResponse({ ha2, nonce, cnonce, qop }) {
  return md5({
    str: `${ha2}:${nonce}:${cnonce}:${qop}`
  });
}

const digestSchemeExample = (req, res) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    res.setHeader('WWW-Authenticate', `Digest realm="https://localhost:3000/api/v1/digestScheme", qop="auth, auth-int", algorithm=MD5, nonce="${process.env.NONCE}", opaque="${process.env.OPAQUE}"`);
    res.send(responseCodes['unauthorized']);
  }

  const authorizationFields = parseHeader(authorization);
  const ha2 = md5({ str: `${req.method}:${authorizationFields.uri}`});
  const cnonce = authorizationFields['nonce'];
  const nonce = process.env['NONCE'];
  const creds = Object.assign(
    {},
    authorizationFields,
    {
      cnonce,
      nonce,
      ha2
    }
  );
  const serverChallenge = serverResponse(creds);
  const clientChallenge = authorizationFields.response;
  if (clientChallenge !== serverChallenge) {
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
