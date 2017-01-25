'use strict';

const base64 = require('./base64').base64;

function encode({header, payload}) {
  const headerEncode = base64(JSON.stringify(header));
  const payloadEncode = base64(JSON.stringify(payload));
  return`${headerEncode}.${payloadEncode}`;
}

exports.encode = encode;
