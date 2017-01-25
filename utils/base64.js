'use strict';

function base64(str) {
  return new Buffer(JSON.stringify(str))
    .toString('base64')
    .replace(/=/g,'')
    .replace(/\+/g,'-')
    .replace(/\//g,'_');
}

exports.base64 = base64;
