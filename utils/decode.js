'use strict';

function decodeUnsignedJWT(jwt) {
  const [
    headerB64,
    payloadB64
   ] = jwt.split('.');
  const headerStr = new Buffer(headerB64, 'base64').toString();
  const payloadStr = new Buffer(payloadB64, 'base64').toString();
  return {
    header: JSON.parse(headerStr),
    payload: JSON.parse(payloadStr)
  };
}

function decodeBasicAuth(str) {
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
}

exports.decodeUnsignedJWT = decodeUnsignedJWT;
exports.decodeBasicAuth = decodeBasicAuth;
