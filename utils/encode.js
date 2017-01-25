'use strict';

const base64 = require('./base64').base64;
const b64 = require('./base64').b64;

function encodeUnsignedJWT({header, payload}) {
  const headerEncode = base64(JSON.stringify(header));
  const payloadEncode = base64(JSON.stringify(payload));
  return `${headerEncode}.${payloadEncode}`;
}

function encodeBasicAuth({username, password}) {
  const encode = b64(`${username}:${password}`);
  return `basic ${encode}`;
}

exports.encodeUnsignedJWT = encodeUnsignedJWT;
exports.encodeBasicAuth = encodeBasicAuth;
