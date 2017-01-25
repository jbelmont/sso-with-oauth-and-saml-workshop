'use strict';

function base64(str) {
  return new Buffer(JSON.stringify(str))
    .toString('base64')
    .replace(/=/g,'')
    .replace(/\+/g,'-')
    .replace(/\//g,'_');
}

function b64(str) {
  return new Buffer(JSON.stringify(str))
    .toString('base64');
}

exports.base64 = base64;
exports.b64 = b64;
